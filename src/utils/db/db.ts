import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { userSchema } from './schema/user';
addRxPlugin(RxDBLeaderElectionPlugin);

const syncURL = 'http://' + window.location.hostname + ':10102/';

let dbPromise: any = null;

const _create = async () => {
    console.log('DatabaseService: Creating user database');
    const db = await createRxDatabase({
        name: 'usersdb',
        storage: getRxStorageDexie()
    });
    console.log('DatabaseService: Created user database');

    // show leadership in title
    db.waitForLeadership().then(() => {
        console.log('isLeader now');
    });

    // create collections
    console.log('DatabaseService: Creating collections');
    await db.addCollections({
        users: {
            schema: userSchema,
            methods: {}
        }
    });

    // hooks
    console.log('DatabaseService: Adding hooks');
    db.collections.users.preInsert(async docObj => {
        const { id, username, studentId } = docObj;
        const has = await db.collections.users.findOne({
            selector: { id, username, studentId }
        }).exec();
        if (has) {
            console.log('DatabaseService: User already exists: ' + username);
        }
        return db;
    }, false);

    // sync
    console.log('DatabaseService: Syncing');
    await Promise.all(
        Object.values(db.collections).map(async (col) => {
            try {
                // create the CouchDB database
                await fetch(
                    syncURL + col.name + '/',
                    {
                        method: 'PUT'
                    }
                );
            } catch (err) { /* empty */ }
        })
    );
    console.log('DatabaseService: Syncing - start live');
    Object.values(db.collections).map(col => col.name).map(colName => {
        const url = syncURL + colName + '/';
        console.log('url: ' + url);
        const replicationState = replicateCouchDB({
            collection: db[colName],
            url,
            live: true,
            pull: {},
            push: {},
            autoStart: true
        });
        replicationState.error$.subscribe(err => {
            console.log('DatabaseService: Got replication error:');
            console.dir(err);
        });
    });

    return db;
};

export const get = () => {
    if (!dbPromise)
        dbPromise = _create();
    return dbPromise;
};
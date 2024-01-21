import PouchDB from 'pouchdb';

const userDatabase = new PouchDB('users');
const gradeDatabase = new PouchDB('grades');
const absenceDatabase = new PouchDB('absences');
const noteDatabase = new PouchDB('notes');
const homeworkDatabase = new PouchDB('homeworks');
const adminUserDatabase = new PouchDB('adminUsers');

export class Database {
    static store = (type: DatabaseType, doc: any) => {
        switch (type) {
            case DatabaseType.user:
                userDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.grade:
                gradeDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.absence:
                absenceDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.note:
                noteDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.homework:
                homeworkDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.adminUser:
                adminUserDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
    }

    static read = async (type: DatabaseType, key: string): Promise<any> => {
        let result;
        switch (type) {
            case DatabaseType.user:
                result = await userDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.grade:
                result = await gradeDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.absence:
                result = await absenceDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.note:
                result = await noteDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.homework:
                result = await homeworkDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.adminUser:
                result = await adminUserDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
        return result;
    }

    static readAll = async (type: DatabaseType): Promise<any> => {
        let result;
        switch (type) {
            case DatabaseType.user:
                result = await userDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.grade:
                result = await gradeDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.absence:
                result = await absenceDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.note:
                result = await noteDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.homework:
                result = await homeworkDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.adminUser:
                result = await adminUserDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
        return result?.rows;
    }

    static remove = (type: DatabaseType, key: string) => {
        switch (type) {
            case DatabaseType.user:
                userDatabase.get(key).then(function (doc) {
                    userDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.grade:
                gradeDatabase.get(key).then(function (doc) {
                    gradeDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.absence:
                absenceDatabase.get(key).then(function (doc) {
                    absenceDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.note:
                noteDatabase.get(key).then(function (doc) {
                    noteDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.homework:
                homeworkDatabase.get(key).then(function (doc) {
                    homeworkDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case DatabaseType.adminUser:
                adminUserDatabase.get(key).then(function (doc) {
                    adminUserDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
    }
}

export enum DatabaseType {
    // default
    user,
    grade,
    absence,
    note,
    homework,
    // admin
    adminUser,
}
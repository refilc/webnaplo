import PouchDB from 'pouchdb';

const userDatabase = new PouchDB('users');
const gradeDatabase = new PouchDB('grades');
const absenceDatabase = new PouchDB('absences');

export class Database {
    static store = (type: string, doc: any) => {
        switch (type) {
            case 'user':
                userDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'grade':
                gradeDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'absence':
                absenceDatabase.put(doc).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
    }

    static read = async (type: string, key: string): Promise<any> => {
        let result;
        switch (type) {
            case 'user':
                result = await userDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'grade':
                result = await gradeDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'absence':
                result = await absenceDatabase.get(key).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
        return result;
    }

    static readAll = async (type: string): Promise<any> => {
        let result;
        switch (type) {
            case 'user':
                result = await userDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'grade':
                result = await gradeDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'absence':
                result = await absenceDatabase.allDocs({
                    include_docs: true,
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
        console.log(result?.rows);
        return result?.rows;
    }

    static remove = (type: string, key: string) => {
        switch (type) {
            case 'user':
                userDatabase.get(key).then(function (doc) {
                    userDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'grade':
                gradeDatabase.get(key).then(function (doc) {
                    gradeDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            case 'absence':
                absenceDatabase.get(key).then(function (doc) {
                    absenceDatabase.remove(doc);
                }).catch(function (err) {
                    console.log(`[reFilc-DB]: ${err}`);
                });
                break;
            default:
                console.log(`[reFilc-DB]: Unknown type "${type}"`);
        }
    }
}
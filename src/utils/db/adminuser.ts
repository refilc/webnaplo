import { AdminUser } from '../../models/adminuser';
import { Database, DatabaseType } from './db';

export class AdminUserDB {
    static addUser = (user: AdminUser) => {
        const { id, username, password, accessToken } = user;
        const addData = {
            '_id': id,
            'username': username,
            'password': password,
            'accessToken': accessToken,
        };

        Database.store(DatabaseType.adminUser, addData);
    }

    static deleteUser = (id: string) => {
        Database.remove(DatabaseType.adminUser, id);
    }

    static getUser = async (id: string): Promise<AdminUser | null> => {
        const res = await Database.read(DatabaseType.adminUser, id);
        if (!res) return null;

        return AdminUser.fromJSON(res);
    }

    static listUsers = async (): Promise<any> => {
        const res = await Database.readAll(DatabaseType.user);
        return res;
    }
}
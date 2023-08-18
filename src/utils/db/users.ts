import { LoginUser } from '../../models/user';
import { Database } from './db';

export class UserDB {
    static addUser = (user: LoginUser) => {
        const { id, username, password, instituteCode, name, studentId, role, nickname, picture } = user;
        const addData = {
            '_id': id,
            'username': username,
            'password': password,
            'instituteCode': instituteCode,
            'name': name,
            'studentId': studentId,
            'role': role,
            'nickname': nickname,
            'picture': picture,
        };

        Database.store('user', addData);
    }

    static deleteUser = (id: string) => {
        Database.remove('user', id);
    }

    static getUser = async (id: string): Promise<LoginUser | null> => {
        const res = await Database.read('user', id);
        console.log(res);
        if (!res) return null;
        const user = new LoginUser(res['_id'], res['username'], res['password'], res['instituteCode'], res['name'], res['studentId'], res['role'], res['nickname'], res['picture']);
        return user;
    }

    static listUsers = async (): Promise<any> => {
        const res = await Database.readAll('user');
        return res;
    }
}
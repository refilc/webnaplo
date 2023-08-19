import { LoginUser } from '../../models/user';
import { Database } from './db';
import { UserSettings } from '../settings';

export class UserDB {
    static addUser = (user: LoginUser) => {
        const { id, username, password, instituteCode, name, student, role, nickname, picture, accessToken } = user;
        const addData = {
            '_id': id,
            'username': username,
            'password': password,
            'instituteCode': instituteCode,
            'name': name,
            'student': {
                'json': student.json,
                'id': student.id,
                'name': student.name,
                'school': student.school,
                'birth': student.birth.toISOString(),
                'yearId': student.yearId,
                'address': student.address,
                'groupId': student.groupId,
                'parents': student.parents,
                'className': student.className,
            },
            'role': role,
            'nickname': nickname,
            'picture': picture,
            'accessToken': accessToken,
        };

        Database.store('user', addData);
    }

    static deleteUser = (id: string) => {
        Database.remove('user', id);
    }

    static getUser = async (id: string): Promise<LoginUser | null> => {
        const res = await Database.read('user', id);
        if (!res) return null;

        return LoginUser.fromJSON(res);
    }

    static listUsers = async (): Promise<any> => {
        const res = await Database.readAll('user');
        return res;
    }

    static currentUser = async (): Promise<LoginUser | null> => {
        return await this.getUser(UserSettings.currentUser);
    }
}
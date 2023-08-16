import { LoginUser } from '../../models/user';
import * as Database from './db';

export class UserDB {
    static details = {
        id: '',
        username: '',
        password: '',
        instituteCode: '',
        name: '',
        studentId: '',
        role: '',
        nickname: '',
        picture: '',
    }

    static addUser = async (user: LoginUser) => {
        const { id, username, password, instituteCode, name, studentId, role, nickname, picture } = user;
        const db = await Database.get();

        const addData = {
            id,
            username,
            password,
            instituteCode,
            name,
            studentId,
            role,
            nickname,
            picture,
        };

        await db.users.insert(addData);
    }

    static deleteUser = async () => {
        const { id } = this.details;
        const db = await Database.get();

        const query = db.users.find({
            selector: {
                id: id,
            }
        });

        await query.remove();
    }

    static listUsers = async () => {
        const db = await Database.get();

        const query = db.users.find({
            selector: {},
            sort: [
                { username: 'asc' },
            ],
        });

        query.$.subscribe((users: any) => {
            if (!users) return null;
            return users as NodeList;
        });
    }
}
import { Homework } from '../../models/homework';
import { LoginUser } from '../../models/user';
import { Database, DatabaseType } from './db';

export class HomeworkDB {
    static addHomework = (homework: Homework, user: LoginUser) => {
        const { id, json, date, lessonDate, deadline, byTeacher, homeworkEnabled, teacher, content, subject, groupId, attachments } = homework;
        const addData = {
            '_id': id,
            'userId': user.id,
            'json': json,
            'date': date.toISOString(),
            'lessonDate': lessonDate.toISOString(),
            'deadline': deadline.toISOString(),
            'byTeacher': byTeacher,
            'homeworkEnabled': homeworkEnabled,
            'teacher': teacher,
            'content': content,
            'subject': {
                'id': subject.id,
                'category': subject.category,
                'name': subject.name,
                'renamedTo': subject.renamedTo,
            },
            'groupId': groupId,
            'attachmetns': attachments.map((a) => {
                return {
                    'id': a.id,
                    'json': a.json,
                    'name': a.name,
                    'type': a.type,
                    'isImage': a.isImage,
                }
            }),
        };

        Database.store(DatabaseType.homework, addData);
    }

    static deleteHomework = (id: string) => {
        Database.remove(DatabaseType.homework, id);
    }

    static getHomework = async (id: string): Promise<Homework | null> => {
        const res = await Database.read(DatabaseType.homework, id);
        if (!res) return null;

        return Homework.fromJSON(res);
    }

    static listHomeworks = async (): Promise<Homework[]> => {
        const res = await Database.readAll(DatabaseType.homework);
        return res.map((d: any): Homework => {
            return Homework.fromJSON(d['doc']);
        });
    }
}
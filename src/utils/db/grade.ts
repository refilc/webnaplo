import { LoginUser } from '../../models/user';
import { Database, DatabaseType } from './db';
import { Grade } from '../../models/grade';

export class GradeDB {
    static addGrade = (grade: Grade, user: LoginUser) => {
        const { id, json, date, value, teacher, description, type, groupId, subject, gradeType, mode, writeDate, seenDate, form } = grade;
        const addData = {
            '_id': id,
            'userId': user.id,
            'json': json,
            'date': date.toISOString(),
            'value': {
                'numValue': value.numValue,
                'textValue': value.textValue,
                'shortTextValue': value.shortTextValue,
                'percentage': value.percentage,
            },
            'teacher': teacher,
            'description': description,
            'type': type,
            'groupId': groupId,
            'subject': {
                'id': subject.id,
                'category': subject.category,
                'name': subject.name,
                'renamedTo': subject.renamedTo,
            },
            'gradeType': {
                'id': gradeType.id,
                'description': gradeType.description,
                'name': gradeType.name,
            },
            'mode': {
                'id': mode.id,
                'description': mode.description,
                'name': mode.name,
            },
            'writeDate': writeDate.toISOString(),
            'seenDate': seenDate.toISOString(),
            'form': form,
        };

        Database.store(DatabaseType.grade, addData);
    }

    static deleteGrade = (id: string) => {
        Database.remove(DatabaseType.grade, id);
    }

    static getGrade = async (id: string): Promise<Grade | null> => {
        const res = await Database.read(DatabaseType.grade, id);
        if (!res) return null;

        return Grade.fromJSON(res);
    }

    static listGrades = async (): Promise<Grade[]> => {
        const res = await Database.readAll(DatabaseType.grade);
        return res.map((d: any): Grade => {
            return Grade.fromJSON(d['doc']);
        });
    }
}
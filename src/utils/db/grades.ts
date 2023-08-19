import { LoginUser, UserStudent } from '../../models/user';
import { Database } from './db';
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

        Database.store('grade', addData);
    }

    static deleteGrade = (id: string) => {
        Database.remove('grade', id);
    }

    static getGrade = async (id: string): Promise<LoginUser | null> => {
        const res = await Database.read('grade', id);
        if (!res) return null;

        const student = new UserStudent(
            res['student']['json'],
            res['student']['id'],
            res['student']['name'],
            res['student']['school'],
            res['student']['birth'],
            res['student']['yearId'],
            res['student']['address'],
            res['student']['groupId'],
            res['student']['parents'],
            res['student']['className']
        );
        const user = new LoginUser(
            res['_id'],
            res['username'],
            res['password'],
            res['instituteCode'],
            res['name'],
            student,
            res['role'],
            res['nickname'],
            res['picture'],
            '',
        );

        console.log(user);
        
        return user;
    }

    static listGrades = async (): Promise<any> => {
        const res = await Database.readAll('grade');
        return res;
    }
}
import { Absence, Justification } from '../../models/absence';
import { LoginUser } from '../../models/user';
import { Database, DatabaseType } from './db';

export class AbsenceDB {
    static addAbsence = (absence: Absence, user: LoginUser) => {
        const { id, json, date, delay, submitDate, teacher, state, justification, type, mode, subject, lessonStart, lessonEnd, lessonIndex, groupId } = absence;
        const addData = {
            '_id': id,
            'userId': user.id,
            'json': json,
            'date': date.toISOString(),
            'delay': delay,
            'submitDate': submitDate.toISOString(),
            'teacher': teacher,
            'state': state == Justification.excused ? 'excused' : state == Justification.pending ? 'pendig' : 'unexcused',
            'justification': {
                'id': justification.id,
                'description': justification.description,
                'name': justification.name,
            },
            'type': {
                'id': type.id,
                'description': type.description,
                'name': type.name,
            },
            'mode': {
                'id': mode.id,
                'description': mode.description,
                'name': mode.name,
            },
            'subject': {
                'id': subject.id,
                'category': subject.category,
                'name': subject.name,
                'renamedTo': subject.renamedTo,
            },
            'lessonStart': lessonStart.toISOString(),
            'lessonEnd': lessonEnd.toISOString(),
            'lessonIndex': lessonIndex,
            'groupId': groupId,
        };

        Database.store(DatabaseType.absence, addData);
    }

    static deleteAbsence = (id: string) => {
        Database.remove(DatabaseType.absence, id);
    }

    static getAbsence = async (id: string): Promise<Absence | null> => {
        const res = await Database.read(DatabaseType.absence, id);
        if (!res) return null;

        return Absence.fromJSON(res);
    }

    static listAbsences = async (): Promise<Absence[]> => {
        const res = await Database.readAll(DatabaseType.absence);
        return res.map((d: any): Absence => {
            return Absence.fromJSON(d['doc']);
        });
    }
}
import { Note } from '../../models/note';
import { LoginUser } from '../../models/user';
import { Database, DatabaseType } from './db';

export class NoteDB {
    static addNote = (note: Note, user: LoginUser) => {
        const { id, json, title, date, submitDate, seenDate, teacher, groupId, content, type } = note;
        const addData = {
            '_id': id,
            'userId': user.id,
            'json': json,
            'title': title,
            'date': date.toISOString(),
            'submitDate': submitDate.toISOString(),
            'seenDate': seenDate.toISOString(),
            'teacher': teacher,
            'groupId': groupId,
            'content': content,
            'type': {
                'id': type.id,
                'description': type.description,
                'name': type.name,
            },
        };

        Database.store(DatabaseType.note, addData);
    }

    static deleteNote = (id: string) => {
        Database.remove(DatabaseType.note, id);
    }

    static getNote = async (id: string): Promise<Note | null> => {
        const res = await Database.read(DatabaseType.note, id);
        if (!res) return null;

        return Note.fromJSON(res);
    }

    static listNotes = async (): Promise<Note[]> => {
        const res = await Database.readAll(DatabaseType.note);
        return res.map((d: any): Note => {
            return Note.fromJSON(d['doc']);
        });
    }
}
import { v4 } from 'uuid';
import { Category } from './category';
import { Subject } from './subject';

export class Absence {
    constructor(
        json: any,
        id: string,
        date: Date,
        delay: number,
        submitDate: Date,
        teacher: string,
        state: Justification,
        justification: Category,
        type: Category,
        mode: Category,
        subject: Subject,
        lessonStart: Date,
        lessonEnd: Date,
        lessonIndex: number,
        groupId: string,
    ) {
        this.json = json;
        this.id = id;
        this.date = date;
        this.delay = delay;
        this.submitDate = submitDate;
        this.teacher = teacher;
        this.state = state;
        this.justification = justification;
        this.type = type;
        this.mode = mode;
        this.subject = subject;
        this.lessonStart = lessonStart;
        this.lessonEnd = lessonEnd;
        this.lessonIndex = lessonIndex;
        this.groupId = groupId;
    }

    json: any;
    id: string;
    date: Date;
    delay: number;
    submitDate: Date;
    teacher: string;
    state: Justification;
    justification: Category;
    type: Category;
    mode: Category;
    subject: Subject;
    lessonStart: Date;
    lessonEnd: Date;
    lessonIndex: number;
    groupId: string;
  
    static fromKretaJSON(json: any): Absence {
        let lessonStart;
        let lessonEnd;
        
        if (json['Ora']) {
            lessonStart = json['Ora']['KezdoDatum'] ? new Date(json['Ora']['KezdoDatum']) : new Date(0);
            lessonEnd = json['Ora']['VegDatum'] ? new Date(json['Ora']['VegDatum']) : new Date(0);
        } else {
            lessonStart = new Date(0);
            lessonEnd = new Date(0);
        }

        return new Absence(
            json,
            json['Uid'] ?? v4(),
            new Date(json['Datum'] ?? null),
            json['KesesPercben'] ?? 0,
            new Date(json['KeszitesDatuma'] ?? null),
            json['RogzitoTanarNeve'] ?? '',
            json['IgazolasAllapota'] == 'Igazolt' 
                ? Justification.excused : json['IgazolasAllapota'] == 'Igazolando' 
                ? Justification.pending : Justification.unexcused,
            Category.fromKretaJSON(json['IgazolasTipusa'] ?? {}),
            Category.fromKretaJSON(json['Tipus'] ?? {}),
            Category.fromKretaJSON(json['Mod'] ?? {}),
            Subject.fromKretaJSON(json['Tantargy'] ?? {}),
            lessonStart,
            lessonEnd,
            json['Ora']['Oraszam'] ?? 0,
            json['OsztalyCsoport'] ? json['OsztalyCsoport']['Uid'] : '',
        );
    }

    static fromJSON(json: any): Absence {
        const justification = new Category(
            json['justification']['id'],
            json['justification']['description'],
            json['justification']['name'],
        );
        const type = new Category(
            json['type']['id'],
            json['type']['description'],
            json['type']['name'],
        );
        const mode = new Category(
            json['mode']['id'],
            json['mode']['description'],
            json['mode']['name'],
        );
        const subject = new Subject(
            json['subject']['id'],
            json['subject']['category'],
            json['subject']['name'],
            json['subject']['renamedTo'],
        )

        const absence = new Absence(
            json,
            json['_id'],
            new Date(json['date']),
            json['delay'],
            new Date(json['submitDate']),
            json['teacher'],
            json['state'] == 'excused' 
                ? Justification.excused : json['state'] == 'pending' 
                ? Justification.pending : Justification.unexcused,
            justification,
            type,
            mode,
            subject,
            new Date(json['lessonStart']),
            new Date(json['lessonEnd']),
            json['lessonIndex'],
            json['groupId'],
        );

        return absence;
    }
}
  
export enum Justification {
    excused,
    unexcused,
    pending,
}
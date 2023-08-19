import { v4 } from "uuid";
import { Category } from "./category";
import { Subject } from "./subject";

export class Grade {
    constructor(
        json: any,
        id: string,
        date: Date,
        value: GradeValue,
        teacher: string,
        description: string,
        type: string,
        groupId: string,
        subject: Subject,
        gradeType: Category,
        mode: Category,
        writeDate: Date,
        seenDate: Date,
        form: string,
    ) {
        this.json = json;
        this.id = id;
        this.date = date;
        this.value = value;
        this.teacher = teacher;
        this.description = description;
        this.type = type;
        this.groupId = groupId;
        this.subject = subject;
        this.gradeType = gradeType;
        this.mode = mode;
        this.writeDate = writeDate;
        this.seenDate = seenDate;
        this.form = form;
    }

    json: any;
    id: string;
    date: Date;
    value: GradeValue;
    teacher: string;
    description: string;
    type: string;
    groupId: string;
    subject: Subject;
    gradeType: Category;
    mode: Category;
    writeDate: Date;
    seenDate: Date;
    form: string;

    static fromKretaJSON(json: any): Grade {
        return new Grade(
            json,
            `${json['Uid']}` ?? v4(),
            new Date(json['KeszitesDatuma'] ?? null),
            new GradeValue(
                json['SzamErtek'] ?? 0,
                json['SzovegesErtek'] ?? '',
                json['SzovegesErtekelesRovidNev'] ?? '',
                json['SulySzazalekErteke'] ?? 0,
            ),
            json['ErtekeloTanarNeve'] ?? '',
            json['Tema'].replace(/^./, json['Tema'].charAt(0).toUpperCase()) ?? '',
            json['Tipus']['Nev'] ?? '',
            json['OsztalyCsoport'] ? json['OsztalyCsoport']['Uid'] ?? '' : '',
            Subject.fromKretaJSON(json['Tantargy'] ?? {}),
            Category.fromKretaJSON(json['ErtekFajta'] ?? {}),
            Category.fromKretaJSON(json['Mod'] ?? {}),
            new Date(json['RogzitesDatuma'] ?? null),
            new Date(json['LattamozasDatuma'] ?? null),
            (json['Jelleg'] ?? 'Na') != 'Na' ? json["Jelleg"] : '',
        );
    }

    static fromJSON(json: any): Grade {
        const value = new GradeValue(
            json['value']['numValue'],
            json['value']['textValue'],
            json['value']['shortTextValue'],
            json['value']['percentage'],
        );
        const subject = new Subject(
            json['subject']['id'],
            json['subject']['category'],
            json['subject']['name'],
            json['subject']['renamedTo'],
        );
        const gradeType = new Category(
            json['gradeType']['id'],
            json['gradeType']['description'],
            json['gradeType']['name'],
        );
        const mode = new Category(
            json['mode']['id'],
            json['mode']['description'],
            json['mode']['name'],
        );

        const grade = new Grade(
            json['json'],
            json['_id'],
            new Date(json['date']),
            value,
            json['teacher'],
            json['description'],
            json['type'],
            json['groupId'],
            subject,
            gradeType,
            mode,
            new Date(json['writeDate']),
            new Date(json['seenDate']),
            json['form'],
        );
        
        return grade;
    }
}

export class GradeValue {
    constructor(numValue: number, textValue: string, shortTextValue: string, percentage: number) {
        this.numValue = numValue;
        this.textValue = textValue;
        this.shortTextValue = shortTextValue;
        this.percentage = percentage;
    }

    numValue: number;
    textValue: string;
    shortTextValue: string;
    percentage: number;
}




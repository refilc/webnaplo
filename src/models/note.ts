import { v4 } from "uuid";
import { Category } from "./category";

export class Note {
    constructor(
        json: any,
        id: string,
        title: string,
        date: Date,
        submitDate: Date,
        seenDate: Date,
        teacher: string,
        groupId: string,
        content: string,
        type: Category,
    ) {
        this.json = json;
        this.id = id;
        this.title = title;
        this.date = date;
        this.submitDate = submitDate;
        this.seenDate = seenDate;
        this.teacher = teacher;
        this.groupId = groupId;
        this.content = content;
        this.type = type;
    }

    json: any;
    id: string;
    title: string;
    date: Date;
    submitDate: Date;
    seenDate: Date;
    teacher: string;
    groupId: string;
    content: string;
    type: Category;

    static fromKretaJSON(json: any): Note {
        return new Note(
            json,
            json['Uid'] ?? v4(),
            json['Cim'] ?? '',
            new Date(json['Datum'] ?? null),
            new Date(json['KeszitesDatuma'] ?? null),
            new Date(json['LattamozasDatuma'] ?? null),
            (json['KeszitoTanarNeve'] ?? '').trim(),
            json['OsztalyCsoport'] ? json['OsztalyCsoport']['Uid'] ?? '' : '',
            json['Tartalom'].replace('\r', '') ?? '',
            Category.fromKretaJSON(json['Tipus'] ?? {}),
        );
    }

    static fromJSON(json: any): Note {
        const type = new Category(
            json['type']['id'],
            json['type']['description'],
            json['type']['name'],
        );

        const note = new Note(
            json,
            json['_id'],
            json['title'],
            new Date(json['date']),
            new Date(json['submitDate']),
            new Date(json['seenDate']),
            json['teacher'],
            json['groupId'],
            json['content'],
            type
        );

        return note;
    }
}

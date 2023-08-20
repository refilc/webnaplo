import { v4 } from "uuid";
import { Subject } from "./subject";
import { KretaAPI } from "../utils/webkreten/api";

export class Homework {
    constructor(
        json: any,
        id: string,
        date: Date,
        lessonDate: Date,
        deadline: Date,
        byTeacher: boolean,
        homeworkEnabled: boolean,
        teacher: string,
        content: string,
        subject: Subject,
        groupId: string,
        attachments: HomeworkAttachment[],
    ) {
        this.json = json;
        this.id = id;
        this.date = date;
        this.lessonDate = lessonDate;
        this.deadline = deadline;
        this.byTeacher = byTeacher;
        this.homeworkEnabled = homeworkEnabled;
        this.teacher = teacher;
        this.content = content;
        this.subject = subject;
        this.groupId = groupId;
        this.attachments = attachments;
    }

    json: any;
    id: string;
    date: Date;
    lessonDate: Date;
    deadline: Date;
    byTeacher: boolean;
    homeworkEnabled: boolean;
    teacher: string;
    content: string;
    subject: Subject;
    groupId: string;
    attachments: HomeworkAttachment[];

    static fromKretaJSON(json: any): Homework {
        return new Homework(
            json,
            json['Uid'] ?? v4(),
            new Date(json['RogzitesIdopontja'] ?? null),
            new Date(json['FeladasDatuma'] ?? null),
            new Date(json['HataridoDatuma'] ?? null),
            json['IsTanarRogzitette'] ?? true,
            json['IsTanuloHaziFeladatEnabled'] ?? false,
            (json['RogzitoTanarNeve'] ?? '').trim(),
            (json['Szoveg'].replace('\r', '') ?? '').trim(),
            Subject.fromKretaJSON(json['Tantargy'] ?? {}),
            json['OsztalyCsoport'] ? json['OsztalyCsoport']['Uid'] ?? '' : '',
            (json['Csatolmanyok'] ?? []).map((json: any) => {
                HomeworkAttachment.fromKretaJSON(json);
            }),
        );
    }

    static fromJSON(json: any): Homework {
        return new Homework(
            json,
            json['_id'],
            new Date(json['date']),
            new Date(json['submitDate']),
            new Date(json['seenDate']),
            json['byTeacher'],
            json['homeworkEnabled'],
            json['teacher'],
            json['content'],
            Subject.fromJSON(json['subject']),
            json['groupId'],
            (json['attachments'] ?? []).map((json: any) => {
                HomeworkAttachment.fromJSON(json);
            }),
        );
    }
}

export class HomeworkAttachment {
    constructor(
        json: any,
        id: string,
        name: string,
        type: string,
        isImage: boolean,
    ) {
        this.json = json;
        this.id = id;
        this.name = name;
        this.type = type;
        this.isImage = isImage;
    }

    json: any;
    id: string;
    name: string;
    type: string;
    isImage: boolean;

    static fromKretaJSON(json: any): HomeworkAttachment {
        return new HomeworkAttachment(
            json,
            json['Uid'] ?? '',
            json['Nev'] ?? '',
            json['Tipus'],
            this.name.endsWith('.jpg') || this.name.endsWith('.jpeg') || this.name.endsWith('.png') || this.name.endsWith('.gif'),
        );
    }

    static fromJSON(json: any): HomeworkAttachment {
        return new HomeworkAttachment(
            json,
            json['id'],
            json['name'],
            json['type'],
            json['isImage'],
        );
    }

    static downloadUrl(iss: string, id: string, type: string) {
        KretaAPI.downloadHomeworkAttachments(iss, id, type);
    }
}
import { Absence } from "../models/absence";
import { Grade } from "../models/grade";
import { Homework } from "../models/homework";
import { Note } from "../models/note";

export class DateGroup {
    static groupGrades(data: Grade[]): any[] {
        const groupedObject: any = {};

        data.forEach((v) => {
            const date = v.date.toISOString().split('T')[0];
            if (groupedObject[date]) {
                groupedObject[date].push(v);
            } else {
                groupedObject[date] = [v];
            }
        });

        const groupedList = Object.values(groupedObject).map((e, i) => {
            return {
              'date': Object.keys(groupedObject)[i],
              'grades': e,
            };
        });
    
        return groupedList;
    }

    static groupOthers(data: (Absence | Note | Homework)[]): any[] {
        const groupedObject: any = {};

        data.forEach((v) => {
            const date = v.date.toISOString().split('T')[0];
            if (groupedObject[date]) {
                groupedObject[date].push(v);
            } else {
                groupedObject[date] = [v];
            }
        });

        const groupedList = Object.values(groupedObject).map((e, i) => {
            return {
              'date': Object.keys(groupedObject)[i],
              'items': e,
            };
        });
    
        return groupedList;
    }
}
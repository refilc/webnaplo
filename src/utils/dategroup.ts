import { Grade } from "../models/grade";

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
}
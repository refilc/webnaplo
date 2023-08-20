import { Category } from "./category";

export class Subject {
    constructor(
        id: string,
        category: Category,
        name: string,
        renamedTo: string,
    ) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.renamedTo = renamedTo;
    }

    id: string;
    category: Category;
    name: string;
    renamedTo: string;

    static fromKretaJSON(json: any): Subject {
        return new Subject(
            json['Uid'] ?? '',
            Category.fromKretaJSON(json['Kategoria'] ?? {}),
            json['Nev'] ?? '',
            '',
        );
    }

    static fromJSON(json: any): Subject {
        const subject = new Subject(
            json['id'],
            json['category'],
            json['name'],
            json['renamedTo'],
        );

        return subject;
    }
}
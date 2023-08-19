export class Category {
    constructor(
        id: string,
        description: string,
        name: string,
    ) {
        this.id = id;
        this.description = description;
        this.name = name;
    }

    id: string;
    description: string;
    name: string;

    static fromKretaJSON(json: any): Category {
        return new Category(
            json['Uid'] ?? '',
            json['Leiras'] != 'Na' ? json['Leiras'] ?? '' : '',
            json['Nev'] != 'Na' ? json['Nev'] ?? '' : '',
        );
    }
}
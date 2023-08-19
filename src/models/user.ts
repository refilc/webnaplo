interface User {
    id: string,
    username: string,
    password: string;
    instituteCode: string;
    name: string;
    student: UserStudent;
    role: string;
    nickname: string;
    picture: string;
}

export class LoginUser implements User {
    constructor(id: string, username: string, password: string, instituteCode: string, name: string, student: UserStudent, role: string, nickname: string, picture: string, accessToken: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.instituteCode = instituteCode;
        this.name = name;
        this.student = student;
        this.role = role;
        this.nickname = nickname;
        this.picture = picture;
        this.accessToken = accessToken;
    }

    id: string;
    username: string;
    password: string;
    instituteCode: string;
    name: string;
    student: UserStudent;
    role: string;
    nickname: string;
    picture: string;
    accessToken: string;
}

interface Student {
    json: any,
    id: string,
    name: string,
    school: string,
    birth: Date,
    yearId: string,
    address: string,
    groupId: string,
    parents: string[],
    className: string,
}

export class UserStudent implements Student {
    constructor(json: any, id: string, name: string, school: string, birth: Date, yearId: string, address: string, groupId: string, parents: string[], className: string) {
        this.json = json;
        this.id = id;
        this.name = name;
        this.school = school;
        this.birth = birth;
        this.yearId = yearId;
        this.address = address;
        this.groupId = groupId;
        this.parents = parents;
        this.className = className;
    }

    json: any;
    id: string;
    name: string;
    school: string;
    birth: Date;
    yearId: string;
    address: string;
    groupId: string;
    parents: string[];
    className: string;

    static fromKretaJSON(json: any): UserStudent {
        const parents: string[] = [];
        json['Gondviselok'].forEach((parent: any) => {
            parents.push(parent['Nev']);
        });

        return new UserStudent(
            json ?? '',
            json['Uid'] ?? '',
            json['Nev'] ?? json['SzuletesiNev'] ?? '',
            json['IntezmenyRovidNev'] ?? json['IntezmenyNev'] ?? '',
            new Date(json['SzuletesiDatum'] ?? null),
            json['TanevUid'] ?? '',
            json['Cimek'][0] ?? '',
            '',
            parents.length > 0 ? parents : [json['AnyjaNeve']],
            '',
        );
    }
}
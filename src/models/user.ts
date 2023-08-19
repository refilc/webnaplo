export class LoginUser {
    constructor(id: string, username: string, password: string, instituteCode: string, name: string, student: Student, role: string, nickname: string, picture: string, accessToken: string) {
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
    student: Student;
    role: string;
    nickname: string;
    picture: string;
    accessToken: string;

    static fromJSON(json: any): LoginUser {
        const student = new Student(
            json['student']['json'],
            json['student']['id'],
            json['student']['name'],
            json['student']['school'],
            json['student']['birth'],
            json['student']['yearId'],
            json['student']['addjsons'],
            json['student']['groupId'],
            json['student']['parents'],
            json['student']['className']
        );

        const user = new LoginUser(
            json['_id'],
            json['username'],
            json['password'],
            json['instituteCode'],
            json['name'],
            student,
            json['role'],
            json['nickname'],
            json['picture'],
            json['accessToken'],
        );
        
        return user;
    }
}

export class Student {
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

    static fromKretaJSON(json: any): Student {
        const parents: string[] = [];
        json['Gondviselok'].forEach((parent: any) => {
            parents.push(parent['Nev']);
        });

        return new Student(
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
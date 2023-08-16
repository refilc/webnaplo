interface User {
    id: string,
    username: string,
    password: string;
    instituteCode: string;
    name: string;
    studentId: string;
    role: string;
    nickname: string;
    picture: string;
}

export class LoginUser implements User {
    constructor(id: string, username: string, password: string, instituteCode: string, name: string, studentId: string, role: string, nickname: string, picture: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.instituteCode = instituteCode;
        this.name = name;
        this.studentId = studentId;
        this.role = role;
        this.nickname = nickname;
        this.picture = picture;
    }

    id: string;
    username: string;
    password: string;
    instituteCode: string;
    name: string;
    studentId: string;
    role: string;
    nickname: string;
    picture: string;
}
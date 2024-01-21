export class AdminUser {
    constructor(id: string, username: string, password: string, accessToken: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.accessToken = accessToken;
    }

    id: string;
    username: string;
    password: string;
    accessToken: string;

    static fromJSON(json: any): AdminUser {
        const user = new AdminUser(
            json['_id'],
            json['username'],
            json['password'],
            json['accessToken'],
        );
        
        return user;
    }
}
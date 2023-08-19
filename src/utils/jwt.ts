export class JwtUtils {
    // static decodeJwt(jwt: string) {
    //     const parts = jwt.split(".");
    //     if (parts.length != 3) return null;
    
    //     if (parts[1].length % 4 == 2) {
    //         parts[1] += "==";
    //     } else if (parts[1].length % 4 == 3) {
    //         parts[1] += "=";
    //     }
    
    //     // try {
    //     //     var payload = utf8.decode(base64Url.decode(parts[1]));
    //     //     return JSON.parse(payload);
    //     // } catch (error) {
    //     //     console.log("ERROR: JwtUtils.decodeJwt: $error");
    //     // }
    //     return null;
    // }

    static parseJWT (jwt: string) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
  
    static getNameFromJWT(jwt: string) {
        const jwtData = this.parseJWT(jwt);

        return jwtData["name"];
    }
  
    static getRoleFromJWT(jwt: string) {
        const jwtData = this.parseJWT(jwt);
    
        switch (jwtData["role"]) {
            case "Tanulo":
                return 'student';
            case "Gondviselo":
                return "parent";
        }
        return null;
    }
}
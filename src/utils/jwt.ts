export class JwtUtils {
    static decodeJwt(jwt: string) {
        const parts = jwt.split(".");
        if (parts.length != 3) return null;
    
        if (parts[1].length % 4 == 2) {
            parts[1] += "==";
        } else if (parts[1].length % 4 == 3) {
            parts[1] += "=";
        }
    
        // try {
        //     var payload = utf8.decode(base64Url.decode(parts[1]));
        //     return JSON.parse(payload);
        // } catch (error) {
        //     console.log("ERROR: JwtUtils.decodeJwt: $error");
        // }
        return null;
    }
  
    // static getNameFromJWT(jwt: string) {
    //     const jwtData = this.decodeJwt(jwt);

    //     // return jwtData["name"];
    // }
  
    static getRoleFromJWT(jwt: string) {
        jwt;
        // const jwtData = this.decodeJwt(jwt);
    
        // switch (jwtData["role"]) {
        //     case "Tanulo":
        //         return 'hulyegyerek';
        //     case "Gondviselo":
        //         return "kotsogszulo";
        // }
        return null;
    }
}
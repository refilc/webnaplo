export class Config {
    private static _userAgent: string;
    json?: Map<any, any>;
    private static _version = '2.2.0';
  
    constructor(userAgent: string, json?: Map<any, any>) {
        Config._userAgent = userAgent;
        this.json = json;
    }
  
    public static fromJson(json: Map<any, any>): Config {
        return new Config(
            json ? json.get("user_agent") : "hu.refilc.naplo/$0/$1/$2",
            json
        );
    }
  
    userAgent(): string {
        return Config._userAgent.replace("$0", Config._version).replace("$1", this.platform).replace("$2", "0");
    }
  
    platform(): string {
        if (navigator.platform.toLowerCase().startsWith('android')) {
            return "Android";
        } else if (navigator.platform.toLowerCase().startsWith('ios')) {
            return "iOS";
        } else if (navigator.platform.toLowerCase().startsWith('linux')) {
            return "Linux";
        } else if (navigator.platform.toLowerCase().startsWith('win')) {
            return "Windows";
        } else if (navigator.platform.toLowerCase().startsWith('mac')) {
            return "MacOS";
        } else {
            return "Unknown";
        }
    }
  
    toString(): string {
        if (this.json) return this.json.toString();
        return '';
    }
}
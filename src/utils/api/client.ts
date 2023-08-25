import { Config } from "../../models/config";
import { UserSettings } from "../settings";

export class reFilcAPI {
    // Public API
    static schoolList = "https://api.refilc.hu/v1/public/school-list";
    static news = "https://api.refilc.hu/v1/public/news";
    static supporters = "https://api.refilc.hu/v1/public/supporters";

    // Private API
    static config = "https://api.refilc.hu/v1/private/config";
    static report = "https://api.refilc.hu/v1/private/crash-report";
    static premiumApi = "https://api.filcnaplo.hu/premium/activate";
    // static const premiumScopesApi = "https://api.filcnaplo.hu/premium/scopes";

    // Updates
    static repo = "refilc/webnaplo";
    static releases = `https://api.github.com/repos/${this.repo}/releases`;        

    async getSchools() {
        try {
            const res: Response = await fetch(reFilcAPI.schoolList, {
                method: 'GET',
            });

            if (res.status == 200) {
                const schools = res.json();
                return schools;
            } else {
                throw `HTTP ${res.status}: ${res.body}`;
            }
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.getSchools: ${error}`);
        }
        return null;
    }

    static async getConfig() {
        const settings = UserSettings;
        const userAgent = Config.fromJson(new Map<any, any>).userAgent();

        const headers: Record<string, string> = {
            "x-filc-id": settings.xFilcID,
            "user-agent": userAgent,
        };

        console.log(`[CONFIG] x-filc-id: "${settings.xFilcID}"`);
        console.log(`[CONFIG] user-agent: "$userAgent"`);

        try {
            let res: Response = await fetch(reFilcAPI.config, {
                headers: headers,
            });

            if (res.status == 200) {
                console.log(res.json());
                return Config.fromJson(await res.json());
            } else if (res.status == 429) {
                res = await fetch(reFilcAPI.config);
                if (res.status == 200) return Config.fromJson(await res.json());
            }
            throw `HTTP ${res.status}: ${res.body}`;
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.getConfig: ${error}`);
        }
        return null;
    }

    static async getNews() {
        try {
            const res: Response = await fetch(reFilcAPI.news);

            if (res.status == 200) {
                return res.json();
            } else {
                throw `HTTP ${res.status}: ${res.body}`;
            }
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.getNews: ${error}`);
        }
        return null;
    }

    static async getSupporters() {
        try {
            const res: Response = await fetch(reFilcAPI.supporters);

            if (res.status == 200) {
                return res.json();
            } else {
                throw `HTTP ${res.status}: ${res.body}`;
            }
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.getSupporters: ${error}`);
        }
        return null;
    }

    static async getReleases() {
        try {
            const res: Response = await fetch(reFilcAPI.releases);

            if (res.status == 200) {
                return res.json();
            } else {
                throw `HTTP ${res.status}: ${res.body}`;
            }
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.getReleases: ${error}`);
        }
        return null;
    }

    static async sendReport(report: ErrorReport) {
        try {
            const body: Record<string, string> = {
                'os': report.os!,
                'version': report.version!,
                'error': report.error!,
                'stack_trace': report.stack!,
            }

            const res: Response = await fetch(reFilcAPI.report, {
                body: JSON.stringify(body),
            });

            if (res.status != 200) {
                throw `HTTP ${res.status}: ${res.body}`;
            }
        } catch (error) {
            console.error(`[reFilc-API]: reFilcAPI.sendReport: ${error}`);
        }
    }
}

export class ErrorReport {
    stack?: string;
    os?: string;
    version?: string;
    error?: string;
}

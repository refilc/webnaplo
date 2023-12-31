import { v4 } from "uuid";

export class Settings {
    static get(key: string): string {
        let s = window.localStorage.getItem('settings');
        if (!s) {
            const defaultSettings = {
                'xFilcID': DefaultSettings.xFilcID,
                'currentUser': DefaultSettings.currentUser,
                'corsProxy': DefaultSettings.corsProxy,
            }

            const stringSettings: string = this.parseToString(defaultSettings);
            window.localStorage.setItem('settings', stringSettings);
            s = stringSettings;
        }
        const parsedS = this.parseFromString(s);

        return parsedS[key];
    }

    static set(key: string, value: string): string {
        const s: Record<string, any> = this.parseFromString(window.localStorage.getItem('settings') ?? '{}');
        s[key] = value;

        const stringS = this.parseToString(s);
        window.localStorage.setItem('settings', stringS);

        return s[key];
    }

    static parseFromString(settings: string): Record<string, any> {
        return JSON.parse(settings);
    }

    static parseToString(settings: Record<string, any>): string {
        return JSON.stringify(settings);
    }
}

export class UserSettings {
    static get xFilcID() {
        return Settings.get('xFilcID');
    }
    static get currentUser() {
        return Settings.get('currentUser');
    }
    static get corsProxy() {
        return Settings.get('corsProxy');
    }
}

export class DefaultSettings {
    static get xFilcID() {
        return v4();
    }
    static currentUser = null;
    static corsProxy = 'https://corsproxy.io/?';
}
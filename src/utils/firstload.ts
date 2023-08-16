import { reFilcAPI } from "./api/client";
import { DefaultSettings } from "./settings";

export async function doImportantThings() {
    if (window.localStorage.length == 0) {
        const config = await reFilcAPI.getConfig();
        const configString: string = JSON.stringify(config);

        const settings = DefaultSettings;
        const settingsString: string = JSON.stringify(settings);
        
        window.localStorage.setItem('config', configString);   
        window.localStorage.setItem('settings', settingsString);
    }
}
import { Config } from "../../../models/config";
import { Homework } from "../../../models/homework";
import { HomeworkDB } from "../../db/homework";
import { UserDB } from "../../db/user";
import { KretaAPI } from "../api";
import { KretaClient } from "../client";

export class HomeworkProvider {
    static _homeworks: Homework[] = [];

    static fetch = async (from: Date, { db = true }): Promise<any> => {
        const config: Config = Config.fromJson(JSON.parse(window.localStorage.getItem('config')!));

        const kretaClient = new KretaClient();
        kretaClient.userAgent = config.userAgent();

        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot fetch Homeworks for User null';

        kretaClient.accessToken = user.accessToken;

        const homeworksJson = await kretaClient.getAPI(KretaAPI.homework(user.instituteCode, from), {}, {});
        if (!homeworksJson) throw `Cannot fetch Homeworks for User ${user.id}`;
        const homeworks: Homework[] = [];

        homeworksJson.forEach(async (hw: any) => {
            const hwJson = await kretaClient.getAPI(KretaAPI.homework(user.instituteCode, undefined, hw['Uid']), {}, {});
            homeworks.push(Homework.fromKretaJSON(hwJson));
        });

        if ((homeworks.length > 0 || this._homeworks.length > 0) && db) await HomeworkProvider.store(homeworks);

        const groupsJson = await kretaClient.getAPI(KretaAPI.groups(user.instituteCode), {}, {});
        if (!groupsJson || groupsJson.length == 0) throw `Cannot fetch Groups for User ${user.id}`;

        // const groupAvgJson = await kretaClient.getAPI(KretaAPI.groupAverages(user.instituteCode, this._groups), {}, {});
        // if (!groupAvgJson) throw `Cannot fetch Class Averages for User ${user.id}`;
        // const groupAvgs = groupAvgJson.map((e) => GroupAverage.fromJson(e)).toList();
        // await storeGroupAvg(groupAvgs);
    }

    static store = async (homeworks: Homework[]): Promise<any> => {
        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot store Homeworks for User null';

        homeworks.map((homework) => {
            HomeworkDB.addHomework(homework, user);
        });

        this._homeworks = homeworks;
    }
}

import { Absence } from "../../../models/absence";
import { Config } from "../../../models/config";
import { AbsenceDB } from "../../db/absence";
import { UserDB } from "../../db/user";
import { KretaAPI } from "../api";
import { KretaClient } from "../client";

export class AbsenceProvider {
    static _absences: Absence[] = [];

    static fetch = async (): Promise<any> => {
        const config: Config = Config.fromJson(JSON.parse(window.localStorage.getItem('config')!));

        const kretaClient = new KretaClient();
        kretaClient.userAgent = config.userAgent();

        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot fetch Absences for User null';

        kretaClient.accessToken = user.accessToken;

        const absencesJson = await kretaClient.getAPI(KretaAPI.absences(user.instituteCode), {}, {});
        if (!absencesJson) throw `Cannot fetch Absences for User ${user.id}`;
        const absences: Absence[] = absencesJson.map((e: any) => Absence.fromKretaJSON(e));

        if (absences.length > 0 || this._absences.length > 0) await AbsenceProvider.store(absences);

        const groupsJson = await kretaClient.getAPI(KretaAPI.groups(user.instituteCode), {}, {});
        if (!groupsJson || groupsJson.length == 0) throw `Cannot fetch Groups for User ${user.id}`;

        // const groupAvgJson = await kretaClient.getAPI(KretaAPI.groupAverages(user.instituteCode, this._groups), {}, {});
        // if (!groupAvgJson) throw `Cannot fetch Class Averages for User ${user.id}`;
        // const groupAvgs = groupAvgJson.map((e) => GroupAverage.fromJson(e)).toList();
        // await storeGroupAvg(groupAvgs);
    }

    static store = async (absences: Absence[]): Promise<any> => {
        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot store Absences for User null';

        absences.map((absence) => {
            AbsenceDB.addAbsence(absence, user);
        });

        console.log(absences);

        this._absences = absences;
    }
}

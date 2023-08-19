import { Config } from "../../../models/config";
import { Grade } from "../../../models/grade";
import { GradeDB } from "../../db/grades";
import { UserDB } from "../../db/users";
import { KretaAPI } from "../api";
import { KretaClient } from "../client";

export class GradeProvider {
    static _grades: Grade[] = [];
    static _groups: string = '';

    static fetch = async (): Promise<any> => {
        const config: Config = Config.fromJson(JSON.parse(window.localStorage.getItem('config')!));

        const kretaClient = new KretaClient();
        kretaClient.userAgent = config.userAgent();

        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot fetch Grades for User null';

        kretaClient.accessToken = user.accessToken;

        const gradesJson = await kretaClient.getAPI(KretaAPI.grades(user.instituteCode), {}, {});
        if (!gradesJson) throw `Cannot fetch Grades for User ${user.id}`;
        const grades: Grade[] = gradesJson.map((e: any) => Grade.fromKretaJSON(e));

        if (grades.length > 0 || this._grades.length > 0) await GradeProvider.store(grades);

        const groupsJson = await kretaClient.getAPI(KretaAPI.groups(user.instituteCode), {}, {});
        if (!groupsJson || groupsJson.length == 0) throw `Cannot fetch Groups for User ${user.id}`;

        this._groups = (groupsJson[0]['OktatasNevelesiFeladat'] ?? {})['Uid'] ?? '';

        // const groupAvgJson = await kretaClient.getAPI(KretaAPI.groupAverages(user.instituteCode, this._groups), {}, {});
        // if (!groupAvgJson) throw `Cannot fetch Class Averages for User ${user.id}`;
        // const groupAvgs = groupAvgJson.map((e) => GroupAverage.fromJson(e)).toList();
        // await storeGroupAvg(groupAvgs);
    }

    static store = async (grades: Grade[]): Promise<any> => {
        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot store Grades for User null';

        grades.map((grade: Grade) => {
            GradeDB.addGrade(grade, user);
        });

        this._grades = grades;
    }
}

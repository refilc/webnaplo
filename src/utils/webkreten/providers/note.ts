import { Config } from "../../../models/config";
import { Note } from "../../../models/note";
import { NotesDB } from "../../db/note";
import { UserDB } from "../../db/user";
import { KretaAPI } from "../api";
import { KretaClient } from "../client";

export class NoteProvider {
    static _notes: Note[] = [];

    static fetch = async (): Promise<any> => {
        const config: Config = Config.fromJson(JSON.parse(window.localStorage.getItem('config')!));

        const kretaClient = new KretaClient();
        kretaClient.userAgent = config.userAgent();

        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot fetch Notes for User null';

        kretaClient.accessToken = user.accessToken;

        const notesJson = await kretaClient.getAPI(KretaAPI.notes(user.instituteCode), {}, {});
        if (!notesJson) throw `Cannot fetch Notes for User ${user.id}`;
        const notes: Note[] = notesJson.map((e: any) => Note.fromKretaJSON(e));

        if (notes.length > 0 || this._notes.length > 0) await NoteProvider.store(notes);

        const groupsJson = await kretaClient.getAPI(KretaAPI.groups(user.instituteCode), {}, {});
        if (!groupsJson || groupsJson.length == 0) throw `Cannot fetch Groups for User ${user.id}`;

        // const groupAvgJson = await kretaClient.getAPI(KretaAPI.groupAverages(user.instituteCode, this._groups), {}, {});
        // if (!groupAvgJson) throw `Cannot fetch Class Averages for User ${user.id}`;
        // const groupAvgs = groupAvgJson.map((e) => GroupAverage.fromJson(e)).toList();
        // await storeGroupAvg(groupAvgs);
    }

    static store = async (notes: Note[]): Promise<any> => {
        const user = await UserDB.currentUser();
        if (!user) throw 'Cannot store Notes for User null';

        notes.map((note) => {
            NotesDB.addNote(note, user);
        });

        this._notes = notes;
    }
}

class BaseKreta {
    static kreta(iss: string) {
        return `https://${iss}.e-kreta.hu`;
    }
    static kretaIdp = "https://idp.e-kreta.hu";
    static kretaAdmin = "https://eugyintezes.e-kreta.hu";
    static kretaFiles = "https://files.e-kreta.hu";
}

class KretaApiEndpoints {
    static token = "/connect/token";
    static nonce = "/nonce";
    static notes = "/ellenorzo/V3/Sajat/Feljegyzesek";
    static events = "/ellenorzo/V3/Sajat/FaliujsagElemek";
    static student = "/ellenorzo/V3/Sajat/TanuloAdatlap";
    static grades = "/ellenorzo/V3/Sajat/Ertekelesek";
    static absences = "/ellenorzo/V3/Sajat/Mulasztasok";
    static groups = "/ellenorzo/V3/Sajat/OsztalyCsoportok";
    static groupAverages = "/ellenorzo/V3/Sajat/Ertekelesek/Atlagok/OsztalyAtlagok";
    static timetable = "/ellenorzo/V3/Sajat/OrarendElemek";
    static exams = "/ellenorzo/V3/Sajat/BejelentettSzamonkeresek";
    static homework = "/ellenorzo/V3/Sajat/HaziFeladatok";
    // static homeworkDone = "/ellenorzo/V3/Sajat/HaziFeladatok/Megoldva"; // removed from the API
    static capabilities = "/ellenorzo/V3/Sajat/Intezmenyek";
    static downloadHomeworkAttachments(uid: string, type: string) {
        type;
        return `/ellenorzo/V3/Sajat/Csatolmany/${uid}`;
    }
}
class KretaAdminEndpoints {
    //static messages = "/api/v1/kommunikacio/postaladaelemek/sajat";
    static sendMessage = "/api/v1/kommunikacio/uzenetek";
    static messages(endpoint: string) {
        return `/api/v1/kommunikacio/postaladaelemek/${endpoint}`;
    }
    static message(id: string) {
        `/api/v1/kommunikacio/postaladaelemek/${id}`;
    }
    static recipientCategories = "/api/v1/adatszotarak/cimzetttipusok";
    static availableCategories = "/api/v1/kommunikacio/cimezhetotipusok";
    static recipientsTeacher = "/api/v1/kreta/alkalmazottak/tanar";
    static uploadAttachment = "/ideiglenesfajlok";
    static downloadAttachment(id: string) {
        `/api/v1/dokumentumok/uzenetek/${id}`;
    }
    static trashMessage = "/api/v1/kommunikacio/postaladaelemek/kuka";
    static deleteMessage = "/api/v1/kommunikacio/postaladaelemek/torles";
  }

export class KretaAPI {
    // IDP API
    static login = BaseKreta.kretaIdp + KretaApiEndpoints.token;
    static nonce = BaseKreta.kretaIdp + KretaApiEndpoints.nonce;
    static clientId = "kreta-ellenorzo-mobile-android";
  
    // ELLENORZO API
    static notes(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.notes;
    }
    static events(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.events;
    }
    static student(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.student;
    }
    static grades(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.grades;
    }
    static absences(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.absences;
    }
    static groups(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.groups;
    }
    static groupAverages(iss: string, uid: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.groupAverages + "?oktatasiNevelesiFeladatUid=" + uid;
    }
    static timetable(iss: string, start: Date, end: Date) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.timetable +
            (start != null && end != null ? "?datumTol=" + start.toISOString() + "&datumIg=" + end.toISOString() : "");
    }
    static exams(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.exams;
    }
    static homework(iss: string, start?: Date, id?: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.homework +
            (id ? `/${id}` : "") + (!id && start ? "?datumTol=" + start.toLocaleDateString('sv') : "");
    }
    static capabilities(iss: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.capabilities;
    }
    static downloadHomeworkAttachments(iss: string, uid: string, type: string) {
        return BaseKreta.kreta(iss) + KretaApiEndpoints.downloadHomeworkAttachments(uid, type);
    }

    // ADMIN API
    static sendMessage = BaseKreta.kretaAdmin + KretaAdminEndpoints.sendMessage;
    static messages(endpoint: string) {
        BaseKreta.kretaAdmin + KretaAdminEndpoints.messages(endpoint);
    }
    static message(id: string) {
        BaseKreta.kretaAdmin + KretaAdminEndpoints.message(id);
    }
    static recipientCategories = BaseKreta.kretaAdmin + KretaAdminEndpoints.recipientCategories;
    static availableCategories = BaseKreta.kretaAdmin + KretaAdminEndpoints.availableCategories;
    static recipientsTeacher = BaseKreta.kretaAdmin + KretaAdminEndpoints.recipientsTeacher;
    static uploadAttachment = BaseKreta.kretaAdmin + KretaAdminEndpoints.uploadAttachment;
    static downloadAttachment(id: string) {
        BaseKreta.kretaAdmin + KretaAdminEndpoints.downloadAttachment(id);
    }
    static trashMessage = BaseKreta.kretaAdmin + KretaAdminEndpoints.trashMessage;
    static deleteMessage = BaseKreta.kretaAdmin + KretaAdminEndpoints.deleteMessage;
}
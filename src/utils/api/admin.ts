import { v4 } from "uuid";
import { LoginState } from "./login";
// import { AdminUserDB } from "../db/adminuser";
import { AdminUser } from "../../models/adminuser";

export async function adminLoginAPI(username: string, password: string, onLogin?: Function, onSuccess?: Function): Promise<LoginState> {
    if (username.replace(' ', '') == '') return LoginState.missingFields;
    if (password.replace(' ', '') == '') return LoginState.missingFields;

    const res = await fetch(`https://api.refilc.hu/v2/admin/auth/login?password=${password}`, {
        method: 'GET',
    });

    const resp = await res.json();

    console.log(resp);

    if (resp != null) {
        if (resp["type"] == "error") {
            if (res.status == 401) {
                return LoginState.invalidGrant;
            }
        } else {
            console.log(resp["data"]["access_token"]);
            if (resp["data"]["access_token"]) {
                try {
                    const userID = v4();
                    const user = new AdminUser(userID, username, password, resp["data"]["access_token"]);
            
                    if (onLogin != null) await onLogin(user);

                    // Store User in the database
                    // AdminUserDB.addUser(user);
                    window.localStorage.setItem('admin_token', user.accessToken);
                    window.localStorage.setItem('admin_uid', userID);
            
                    if (onSuccess != null) await onSuccess();
            
                    return LoginState.success;
                } catch (error) {
                    console.error(error);
                    console.error(`[reFilc-Auth]: adminLoginApi: ${error}`);
                    // maybe check debug mode
                    // ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("ERROR: $error")));
                    return LoginState.failed;
                }
            }
        }
    }
    return LoginState.inProgress;
}
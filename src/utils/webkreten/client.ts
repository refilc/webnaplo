// import { X509Certificate } from "crypto";
import { KretaAPI } from "./api";
import { Nonce, getNonce } from "./nonce";

export class KretaClient {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    userAgent?: string;

    // _checkCerts(cert: X509Certificate, host: string, port: number): boolean {
    //     return false;
    // }

    async getAPI(url: string, headers: Record<string, string> = {}, { autoHeader = true, json = true, rawResponse = false }): Promise<any> {
        if (rawResponse) json = false;
    
        try {
            let res: Response | undefined;
    
            for (let i = 0; i < 3; i++) {
                if (autoHeader) {
                    if (!headers['authorization'] && this.accessToken) headers['authorization'] = `Bearer ${this.accessToken}`;
                    if (!headers['user-agent'] && this.userAgent) headers['user-agent'] = this.userAgent;
                }
            
                res = await fetch('https://corsproxy.io/?' + encodeURIComponent(url), {
                    method: 'GET',
                    headers: headers,
                });
        
                if (res.status == 401) {
                    await this.refreshLogin();
                    delete headers['authorization'];
                } else {
                    break;
                }

                this.sleep(500);
            }
    
            if (!res) throw "Auth error";
    
            if (json) {
                return res.json();
            } else if (rawResponse) {
                return res.body;
            } else {
                return res.text();
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log(`ERROR: KretaClient.getAPI (${url}) SyntaxError: ${error.message}`);
            } else {
                console.log(`ERROR: KretaClient.getAPI (${url}) UnknownException: ${error}`);
            }
        }
    }

    async postAPI(url: string, body: string, headers: Record<string, string> = {}, { autoHeader = true, json = true }): Promise<any> {    
        try {
            let res: Response | undefined;
    
            for (let i = 0; i < 3; i++) {
                if (autoHeader) {
                    if (!headers['authorization'] && this.accessToken) headers['authorization'] = `Bearer ${this.accessToken}`;
                    if (!headers['user-agent'] && this.userAgent) headers['user-agent'] = this.userAgent;
                    if (!headers['content-type']) headers['content-type'] = 'application/json';
                }
            
                res = await fetch('https://corsproxy.io/?' + encodeURIComponent(url), {
                    method: 'POST',
                    headers: headers,
                    body: body,
                });
        
                if (res.status == 401) {
                    await this.refreshLogin();
                    delete headers['authorization'];
                } else {
                    break;
                }
            }
    
            if (!res) throw "Auth error";
    
            if (json) {
                return res.json();
            } else {
                return res.text();
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log(`ERROR: KretaClient.getAPI (${url}) SyntaxError: ${error.message}`);
            } else {
                console.log(`ERROR: KretaClient.getAPI (${url}) UnknownException: ${error}`);
            }
        }
    }

    async refreshLogin() {
        // if ('majd_lesz_user_check' == null) return;

        const headers = new Map<string, string>([
            ['content-type', 'application/x-www-form-urlencoded'],
        ]);

        const nonceString: string = await this.getAPI(KretaAPI.nonce, {}, {json: false});
        const nonce: Nonce = getNonce(nonceString, '72687219753', 'bgeszc-ganz');

        const nonceHeaders: Map<string, string> = nonce.header()
        nonceHeaders.forEach((value, key) => {
            headers.set(key, value);
        });

        // const loginBody: Record<any, any> = {
        //     'userName': '72687219753',
        //     'password': '2007-09-05',
        //     'institute_code': 'bgeszc-ganz',
        //     'grant_type': 'password',
        //     'client_id': KretaAPI.clientId,
        // };
        const loginBody: string = `userName=72687219753&password=2007-09-05&institute_code=bgeszc-ganz&client_id${KretaAPI.clientId}&grant_type=password`;

        // console.log(`DEBUG: refreshLogin: ${loginUser.id} ${loginUser.name}`);
        const loginRes: Map<any, any> | undefined = await this.postAPI(KretaAPI.login, loginBody, Object.fromEntries(headers), {});

        if (loginRes) {
            if (loginRes.has("access_token")) this.accessToken = loginRes.get("access_token");
            if (loginRes.has("refresh_token")) this.refreshToken = loginRes.get("refresh_token");
      
            // Update role
            // loginUser.role =
            //     JwtUtils.getRoleFromJWT(accessToken ?? "") ?? Role.student;
        }

        if (this.refreshToken) {
            const refreshBody: string = `refresh_token=${this.refreshToken}&institute_code=bgeszc-ganz&client_id=${KretaAPI.clientId}&grant_type=refresh_token&refresh_user_data=${false}`;

            const refreshRes: Map<any, any> | undefined = await this.postAPI(KretaAPI.login, refreshBody, Object.fromEntries(headers), {});
            if (refreshRes != null) {
                if (refreshRes.has("id_token")) this.idToken = refreshRes.get("id_token");
            }
        }
    }

    private sleep(milliseconds: number) {
        const start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
}
import { useState } from "react";
import { LoginUser } from "../../../models/user";
import { LoginState, loginAPI } from "../../../utils/api/login";
import { useNavigate } from "react-router-dom";
import SchoolSelect from "../../app/components/school_select";

const AuthLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [institute, setInstitute] = useState<any>();
    const [corsProxy, setCorsProxy] = useState('https://corsproxy.io/?');

    const navigate = useNavigate();

    const onLogin = async (user: LoginUser) => {
        console.log(`[reFilc-Auth]: Successfully logged in user "${user.username}"!`);
        // alert(`Üdv ${user.name}!`);
    }
    const onSuccess = async () => {
        navigate('/app/home');
    }

    const doAuth = async () => {
        let proxyUrl = corsProxy.replace(' ', '');
        if (proxyUrl != '') {
            proxyUrl = proxyUrl.startsWith('http://') ? proxyUrl : ('https://' + proxyUrl.replace('https://', ''));
            proxyUrl = 
                proxyUrl.endsWith('/') ? proxyUrl : 
                (
                    (proxyUrl.endsWith('?') || 
                    proxyUrl.endsWith('=') || 
                    proxyUrl.endsWith('&') || 
                    proxyUrl.endsWith('#')) ? proxyUrl : (proxyUrl + '/')
                );
        }

        const res: LoginState = await loginAPI(username, password, institute ? institute['value'] : '', proxyUrl, onLogin, onSuccess);
        if (res == LoginState.missingFields) alert('Adj meg minden adatot a belépéshez!');
        if (res == LoginState.failed) alert('Ismeretlen hiba történt!');
        if (res == LoginState.invalidGrant) alert('Hibás felhasználónév vagy jelszó!');
        // console.log(`[reFilc-Auth]: ${response?.toString()}`);
    }

    const showProxyAlert = async () => {
        alert('Mivel a Kréta API nem engedélyezi a CORS kéréseket mindenhonnan, szükség van egy CORS proxy-ra...');
        alert('Mi az a CORS? - refilc.hu/go/cors\nMi az a CORS proxy? - refilc.hu/go/cors-proxy');
        alert('Ha nem bízol meg egyik online elérhető CORS proxy-ban sem, futtathatsz sajátot is.');
        alert('Böngésző kiegészítőt vagy bővítményt is használhatsz, ebben az esetben hagyd üresen a mezőt!');
    }

    

    return (
        <div className="flex flex-col items-center justify-center w-full h-5/6 gap-4">
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Felhasználónév</p>
                    <p className="opacity-50 text-[14px]">Oktatási azonosító</p>
                </div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Jelszó</p>
                    <p className="opacity-50 text-[14px]">Születési dátum</p>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Intézmény</p>
                    <p className="opacity-50 text-[14px]">Iskola</p>
                </div>
                <SchoolSelect setInstitute={setInstitute}/>
                {/* <input type="text" value={instituteCode} onChange={(e) => setInstituteCode(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[35px] outline-none px-2"/> */}
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max mt-5">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">CORS proxy</p>
                    <p className="opacity-50 text-[14px] underline cursor-pointer" onClick={showProxyAlert}>Mi ez?</p>
                </div>
                <input type="text" value={corsProxy} onChange={(e) => setCorsProxy(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max mt-5">
                <button type="button" onClick={doAuth} className="w-full bg-white rounded-lg text-black px-10 py-2">Belépés</button>
            </div>
        </div>
    )
}

export default AuthLogin;
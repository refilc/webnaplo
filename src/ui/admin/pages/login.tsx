import { useState } from "react";
import { LoginState } from "../../../utils/api/login";
import { AdminUser } from "../../../models/adminuser";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../../utils/api/admin";
import qwitLogo from '/image/brand/qwit_t_color_logo.png?url';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onLogin = async (user: AdminUser) => {
        console.log(`[reFilc-Auth]: Successfully logged in user "${user.username}"!`);
        // alert(`Üdv ${user.name}!`);
    }
    const onSuccess = async () => {
        navigate('/admin/home');
    }

    const doAuth = async () => {
        const res: LoginState = await adminLoginAPI(username, password, onLogin, onSuccess);
        if (res == LoginState.missingFields) alert('Adj meg minden adatot a belépéshez!');
        if (res == LoginState.failed) alert('Ismeretlen hiba történt!');
        if (res == LoginState.invalidGrant) alert('Hibás felhasználónév vagy jelszó!');
        // console.log(`[reFilc-Auth]: ${response?.toString()}`);
    }

    const doQwIDRedirect = () => {
        window.localStorage.setItem('qwid_oauth2_redirect', '/admin/home');
        window.location.assign('https://qwid.qwit.dev/oauth2/authorize?client_id=99aa103a-0bd7-43e0-8421-3bb0b2f6adb1&redirect_uri=https%3A%2F%2Fapi.refilc.hu%2Fv4%2Foauth2%2Fcallback%2Fweb%2Fqwid&response_type=code&scope=%2A');
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-5/6 gap-4">
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Felhasználónév</p>
                    <p className="opacity-50 text-[14px]">Admin azonosító</p>
                </div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Jelszó</p>
                    <p className="opacity-50 text-[14px]">Admin jelszó</p>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max mt-5">
                <button type="button" onClick={doAuth} className="w-full bg-white rounded-lg text-black px-10 py-2">Belépés</button>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max mt-5">
                <button type="button" onClick={doQwIDRedirect} className="w-full bg-white rounded-lg text-black px-3 py-2 flex flex-row items-center justify-center gap-3">
                    <img src={qwitLogo} className="w-6 h-6"/>
                    <p>Folytatás QwID fiókkal</p>
                </button>
            </div>
        </div>
    )
}

export default AdminLogin;
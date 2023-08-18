import { useState } from "react";
import { LoginUser } from "../../models/user";
import { loginAPI } from "../../utils/api/login";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [instituteCode, setInstituteCode] = useState('');

    const navigate = useNavigate();

    const loginSuccess = async (user: LoginUser) => {
        console.log(`[reFilc-Auth]: Successfully logged in user "${user.username}"!`);
        // alert(`Üdv ${user.name}!`)
        navigate('/app/home');
    }

    const doAuth = async () => {
        await loginAPI(username, password, instituteCode, loginSuccess);
        // console.log(`[reFilc-Auth]: ${response?.toString()}`);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-5/6 gap-5">
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Felhasználónév</p>
                    <p className="opacity-50 text-[14px]">Oktatási azonosító</p>
                </div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[35px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Jelszó</p>
                    <p className="opacity-50 text-[14px]">Születési dátum</p>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[35px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max">
                <div className="flex flex-row items-center justify-between gap-5 w-full">
                    <p className="text-[15px]">Intézmény</p>
                    <p className="opacity-50 text-[14px]">Iskola</p>
                </div>
                <input type="text" value={instituteCode} onChange={(e) => setInstituteCode(e.target.value)} className="min-w-[300px] bg-white/[0.12] rounded-lg h-[35px] outline-none px-2"/>
            </div>
            <div className="flex flex-col items-start justify-center w-max h-max mt-5">
                <button type="button" onClick={doAuth} className="w-full bg-white rounded-lg text-black px-10 py-2">Belépés</button>
            </div>
        </div>
    )
}

export default AuthLogin;
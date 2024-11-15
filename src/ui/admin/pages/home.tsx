import { useEffect, useState } from "react";
// import { AdminUserDB } from "../../../utils/db/adminuser";

const AdminHome = () => {
    const [installCount, setInstallCount] = useState('');
    const [iosInstallCount, setIosInstallCount] = useState('');
    const [androidInstallCount, setAndroidInstallCount] = useState('');
    const [verFourInstallCount, setVerFourInstallCount] = useState('');
    const [verFiveInstallCount, setVerFiveInstallCount] = useState('');

    const [qrScanCount, setQrScanCount] = useState('');

    const [authToken, setAuthToken] = useState('');

    const [customerEmail, setCustomerEmail] = useState('');
    const [reFilcPlusID, setReFilcPlusID] = useState('');

    const loadData = async () => {
        console.log('Loading data from reFilc API..');

        // const userID = window.localStorage.getItem('admin_uid') ?? '';
        const accessToken = window.localStorage.getItem('admin_token') ?? '';

        // fetch things
        const installResJson = (await (await fetch(`https://api.refilc.hu/v2/admin/data/install-count?token=${accessToken}`, {
            method: 'GET',
        })).json());

        const qrResJson = (await (await fetch(`https://api.refilc.hu/v2/admin/data/qr-scan-count?token=${accessToken}`, {
            method: 'GET',
        })).json());

        // set things
        const installs = installResJson['install_count']['total'];
        const iosInstalls = installResJson['install_count']['ios'];
        const androidInstalls = installResJson['install_count']['android'];
        const verFourInstalls = installResJson['install_count']['by_version']['older'];
        const verFiveInstalls = installResJson['install_count']['by_version']['latest'];

        const scanCount = qrResJson['scan_count'];

        // set variables
        setInstallCount(installs);
        setIosInstallCount(iosInstalls);
        setAndroidInstallCount(androidInstalls);
        setVerFourInstallCount(verFourInstalls);
        setVerFiveInstallCount(verFiveInstalls);
        
        setQrScanCount(scanCount);

        setAuthToken(accessToken);
    }

    const reFilcPlusIDByEmail = async (email: string) => {
        console.log('Getting reFilc+ ID by customer e-mail..');

        setReFilcPlusID('ID lekérése..');

        const accessToken = window.localStorage.getItem('admin_token') ?? '';

        // fetch things
        try {
            const resJson = (await (await fetch(`https://api.refilc.hu/v4/admin/subscription/by-email?email=${email}&token=${accessToken}`, {
                method: 'GET',
            })).json());

            // set things
            const id = resJson['data']['subscription']['session_id'] ?? 'Az azonosító nem található!';

            // set variables
            setReFilcPlusID(id);
        } catch (e) {
            console.error('Error while fetching reFilc+ ID by e-mail:', e);
            setReFilcPlusID('Az azonosító nem található!');
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Sikeresen másolva a vágólapra!');
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-row flex-wrap items-start justify-start w-full h-5/6 gap-4">
            <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">Telepítések száma</h1>
                <div className="ml-2 text-[18px]">
                    <p className="mb-2">- Összes: <b>{installCount}</b></p>
                    <p>- iOS: <b>{iosInstallCount}</b></p>
                    <p>- Android: <b>{androidInstallCount}</b></p>
                    <br />
                    <p>- Verzió szerinti (4.x.x): <b>{verFourInstallCount}</b></p>
                    <p>- Verzió szerinti (5.x.x): <b>{verFiveInstallCount}</b></p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">QR kód beolvasások száma</h1>
                <form className="ml-2 text-[18px]" method="get" action="https://api.refilc.hu/v2/admin/data/qr-scan-count" target="_blank">
                    <p className="mb-2">- Összes: <b>{qrScanCount}</b></p>
                    <p>- ID alapján: <b><input type="text" name="qr_code_id" id="qr_code_id" placeholder="(rf01)" className="outline-none bg-transparent" /></b></p>
                    <input type="hidden" name="token" value={authToken} />
                    {/* <p>- Android: <b>{androidInstallCount}</b></p> */}
                </form>
            </div>
            <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">reFilc+ ID e-mail alapján</h1>
                <div className="ml-2 text-[18px]">
                    <p>- E-mail cím: <b><input type="email" name="email" id="email" placeholder="(social@refilc.hu)" className="outline-none bg-transparent" onChange={(e) => setCustomerEmail(e.target.value)} /></b></p>
                    <p className="mb-2">- reFilc+ ID: <b className="select-text" onClick={() => copyToClipboard(reFilcPlusID)}>{reFilcPlusID}</b></p>
                    <button onClick={() => reFilcPlusIDByEmail(customerEmail)} className="bg-v5_btn px-4 py-2 rounded-xl">Lekérés</button>
                    {/* <p>- Android: <b>{androidInstallCount}</b></p> */}
                </div>
            </div>
            {/* <h1 className="text-white">reFilc össz telepítések száma: {installCount}</h1> */}
        </div>
    )
}

export default AdminHome;
import { useEffect, useState } from "react";
// import { AdminUserDB } from "../../../utils/db/adminuser";

const AdminCoupons = () => {
    // const [installCount, setInstallCount] = useState('');
    // const [iosInstallCount, setIosInstallCount] = useState('');
    // const [androidInstallCount, setAndroidInstallCount] = useState('');
    // const [verFourInstallCount, setVerFourInstallCount] = useState('');
    // const [verFiveInstallCount, setVerFiveInstallCount] = useState('');

    // const [qrScanCount, setQrScanCount] = useState('');

    const [authToken, setAuthToken] = useState('');

    const loadData = async () => {
        console.log('Loading data from reFilc API..');

        // const userID = window.localStorage.getItem('admin_uid') ?? '';
        const accessToken = window.localStorage.getItem('admin_token') ?? '';

        // // fetch things
        // const installResJson = (await (await fetch(`https://api.refilc.hu/v2/admin/data/install-count?token=${accessToken}`, {
        //     method: 'GET',
        // })).json());

        // const qrResJson = (await (await fetch(`https://api.refilc.hu/v2/admin/data/qr-scan-count?token=${accessToken}`, {
        //     method: 'GET',
        // })).json());

        // // set things
        // const installs = installResJson['install_count']['total'];
        // const iosInstalls = installResJson['install_count']['ios'];
        // const androidInstalls = installResJson['install_count']['android'];
        // const verFourInstalls = installResJson['install_count']['by_version']['older'];
        // const verFiveInstalls = installResJson['install_count']['by_version']['latest'];

        // const scanCount = qrResJson['scan_count'];

        // // set variables
        // setInstallCount(installs);
        // setIosInstallCount(iosInstalls);
        // setAndroidInstallCount(androidInstalls);
        // setVerFourInstallCount(verFourInstalls);
        // setVerFiveInstallCount(verFiveInstalls);
        
        // setQrScanCount(scanCount);

        setAuthToken(accessToken);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-row flex-wrap items-start justify-start w-full h-5/6 gap-4">
            {/* <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">Telepítések száma</h1>
                <div className="ml-2 text-[18px]">
                    <p className="mb-2">- Összes: <b>{installCount}</b></p>
                    <p>- iOS: <b>{iosInstallCount}</b></p>
                    <p>- Android: <b>{androidInstallCount}</b></p>
                    <br />
                    <p>- Verzió szerinti (4.x.x): <b>{verFourInstallCount}</b></p>
                    <p>- Verzió szerinti (5.x.x): <b>{verFiveInstallCount}</b></p>
                </div>
            </div> */}
            {/* <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">QR kód beolvasások száma</h1>
                <form className="ml-2 text-[18px]" method="get" action="https://api.refilc.hu/v2/admin/data/qr-scan-count" target="_blank">
                    <p className="mb-2">- Összes: <b>{qrScanCount}</b></p>
                    <p>- ID alapján: <b><input type="text" name="qr_code_id" id="qr_code_id" placeholder="(rf01)" className="outline-none bg-transparent" /></b></p>
                    <input type="hidden" name="token" value={authToken} />
                    {/* <p>- Android: <b>{androidInstallCount}</b></p> *}
                </form>
            </div> */}
            {/* <h1 className="text-white">reFilc össz telepítések száma: {installCount}</h1> */}
            <div className="flex flex-col items-start justify-start p-10">
                <h1 className="text-[30px] mb-2">Promóció létrehozása</h1>
                <form className="ml-2 text-[18px]" method="post" action="https://api.refilc.hu/v4/payment/coupon/create" target="_blank">
                    {/* <p className="mb-2">- Összes: <b>{qrScanCount}</b></p>
                    <p>- ID alapján: <b><input type="text" name="qr_code_id" id="qr_code_id" placeholder="(rf01)" className="outline-none bg-transparent" /></b></p> */}
                    <input type="hidden" name="access_token" value={authToken} />
                    <p>- Termék: <b><input type="text" name="product" id="product" placeholder="(refilcplus_basic/refilcplus_gold)" className="outline-none bg-transparent" /></b></p>
                    <p>- Mennyiség: <b><input type="text" name="count" id="count" placeholder="(opcionális, 1/2/3/...)" className="outline-none bg-transparent" /></b></p>
                    <p>- Kód: <b><input type="text" name="coupon_code" id="coupon_code" placeholder="(opcionális, STRING)" className="outline-none bg-transparent" /></b></p>
                    <p>- Lejárat: <b><input type="text" name="expire_date" id="expire_date" placeholder="(opcionális, RFC3339)" className="outline-none bg-transparent" /></b></p>
                    {/* <p>- Android: <b>{androidInstallCount}</b></p> */}
                    <button type="submit" className="bg-white rounded-lg text-black px-10 py-2 mt-[20px]">Létrehozás</button>
                </form>
            </div>
        </div>
    )
}

export default AdminCoupons;
import { useEffect, useState } from "react";
// import { AdminUserDB } from "../../../utils/db/adminuser";

const AdminHome = () => {
    const [installCount, setInstallCount] = useState('');

    const loadData = async () => {
        console.log('Loading data from reFilc API..');

        // const userID = window.localStorage.getItem('admin_uid') ?? '';
        const accessToken = window.localStorage.getItem('admin_token') ?? '';

        // put things together
        const installs = (await (await fetch(`https://api.refilc.hu/v2/admin/data/install-count?token=${accessToken}`, {
            method: 'GET',
        })).json())['install_count'];
        console.log(installs);

        // set variables
        setInstallCount(installs);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-5/6 gap-4">
            <h1 className="text-white">reFilc össz telepítések száma: {installCount}</h1>
        </div>
    )
}

export default AdminHome;
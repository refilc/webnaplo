import iPhoneMockup from '/image/mockup.png?url';
import iPhoneMockup2 from '/image/mockup_2.png?url';
import fullLogo from '/image/brand/full_logo.png?url';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainIndex = () => {
    const [latestVersion, setLatestVersion] = useState<any>('');

    const fetchLatestVersion = async () => {
        const res = await fetch('https://api.refilcapp.hu/v1/public/client/version/latest/name');
        setLatestVersion((await res.text()).replace('-beta', ''));
    }

    useEffect(() => {
        fetchLatestVersion();
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-row items-center justify-center px-10 gap-20 w-full">
                <div className="flex items-center justify-center">
                    <img src={iPhoneMockup} alt="iphone mockup" width={600}/>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 drop-shadow-[0_0_100px_rgba(27,58,117,0.5)]'>
                    <img src={fullLogo} alt="iphone mockup" width={400}/>
                    <p className='font-bold text-[34px]'>Egy nem hivatalos e-KRÉTA kliens</p>
                    <Link to={'#download'} className='rounded-full'>
                        <div className='flex flex-row items-center justify-center py-3 px-10 bg-gradient-to-r from-[#3C7BF5] to-[#3C5AF5] rounded-full'>
                            <p className='text-[34px] font-medium'>
                                <span className='font-extrabold'>Letöltés</span> | v{latestVersion}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full w-[110%] h-max -skew-y-1 bg-[#3C5AF5] mt-10 pt-10'>
                <div className='flex flex-col items-center justify-center px-10 w-full w-full h-max skew-y-1'>
                    <h1 className='font-bold text-[80px]'>Egy friss vászon</h1>
                    <p className='text-[25px]'>Új színpaletta, hogy elbűvölőbb legyen a matek egyes.</p>
                    <img src={iPhoneMockup2} alt="iphone mockup" width={1000}/>
                    <div className='w-full w-[110%] h-[60px] -skew-y-1 bg-[#0F131D]'></div>
                </div>
            </div>
        </div>
    )
}

export default MainIndex;
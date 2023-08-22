import iPhoneMockup1 from '/image/mockup_1.png?url';
import iPhoneMockup2 from '/image/mockup_2.png?url';
import fullLogo from '/image/brand/full_logo.png?url';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import premFeature1 from '/image/premium_1.png?url';
import premFeature2 from '/image/premium_2.png?url';
import lockIcon from '/image/icon/lock.svg?url';
import circleLogo from '/image/brand/logo.png?url';

const MainIndex = ({ scrollToDownload, downloadRef }: { scrollToDownload: any, downloadRef: any }) => {
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
                    <img src={iPhoneMockup1} alt="iphone mockup" width={600}/>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 drop-shadow-[0_0_100px_rgba(27,58,117,0.5)]'>
                    <img src={fullLogo} alt="iphone mockup" width={400}/>
                    <p className='font-bold text-[34px] text-center'>Egy nem hivatalos e-KRÉTA kliens</p>
                    <Link to={''} onClick={scrollToDownload} className='rounded-full'>
                        <div className='flex flex-row items-center justify-center py-3 px-10 bg-gradient-to-r from-[#3C7BF5] to-[#3C5AF5] rounded-full'>
                            <p className='text-[34px] font-medium'>
                                <span className='font-extrabold'>Letöltés</span> | v{latestVersion}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-[#3C5AF5] mt-10 pt-10'>
                <div className='flex flex-col items-center justify-center px-10 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[65px] mt-8 text-center'>Egy friss vászon</h1>
                    <p className='text-[25px] leading-3 text-center'>Új színpaletta, hogy elbűvölőbb legyen a matek egyes.</p>
                    <img src={iPhoneMockup2} alt="iphone mockup" width={1000}/>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-[#0F131D] mt-[-20px] pb-20'>
                <div className='flex flex-col items-center justify-center px-10 pt-12 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[65px] mt-8 text-center'>Ingyenes, örökké</h1>
                    <p className='text-[25px] leading-3 text-center'>Az összes Filc Prémium funckiót <span className='bg-clip-text bg-gradient-to-r from-[#3C5AF5] to-[#3C7BF5] text-fill-transparent'>ingyenessé</span> tettük.</p>
                    <p className='font-medium text-[25px] tracking-[10px] mt-12 text-center'>EBBE BELETARTOZIK A...</p>
                    <div className='flex flex-row items-center justify-center gap-24 mt-4'>
                        <div className='flex flex-col items-center justify-around bg-[#1E2435] h-[260px] rounded-[50px] px-10 max-w-[380px]'>
                            <img src={premFeature1} alt="premium feature" width={350} className='mt-3'/>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-bold text-[22px] text-center'>Profil személyre szabás</h2>
                                <p className='font-medium text-[15px] text-center'>Állíts be egy saját becenevet, és egy profilképet (akár animáltat is!)</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-around bg-[#1E2435] h-[260px] rounded-[50px] px-10 max-w-[380px]'>
                            <img src={premFeature2} alt="premium feature" width={350} className='mt-3'/>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-bold text-[22px] text-center mt-[-24px]'>Téma+</h2>
                                <p className='font-medium text-[15px] text-center'>Válassz saját háttérszínt és kártyaszínt is, akár saját HEX-kóddal!</p>
                            </div>
                        </div>
                    </div>
                    <p className='font-extralight text-[25px] mt-6'>és még sok más...</p>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-black py-24'>
                <div className='flex flex-col items-center justify-center px-10 w-full w-full h-max skew-y-2'>
                    <h2 className='font-bold text-[30px]'>Nem sok adatot tárolunk rólad.</h2>
                    <p className='text-[25px]'>
                        Úgy nagyjából... 
                        <span>
                            <img src={lockIcon} alt="lock icon" className='inline mt-[-5px] ml-2 mr-1' width={15}/>
                        </span> 
                        <span className='bg-clip-text bg-gradient-to-r from-[#FFC700] to-transparent text-fill-transparent font-semibold'>semmit...</span>
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-[#0F131D] pb-20' ref={downloadRef}>
                <div className='flex flex-col items-center justify-center px-10 pt-12 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[65px] mt-8 text-center'>Meggyőztünk?</h1>
                    <p className='text-[25px] leading-3 text-center'>Töltsd le most! <span className='bg-clip-text bg-gradient-to-r from-white to-transparent text-fill-transparent'>(or else..)</span></p>
                    <h2 className='font-bold text-[25px] mt-8'>Verzió: {latestVersion}</h2>
                    <div className='flex flex-col items-start justify-center gap-6 mt-6'>
                        <div className='flex flex-row items-center justify-start gap-14'>
                            <Link to={'/go/dl/android'} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-10 bg-[#3C5AF5] rounded-full min-w-[225px]'>
                                    <p className='text-[34px] font-bold'>Android</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                MD5: majd lesz pussy<br />
                                Fájlméret: 69MB
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-start gap-14'>
                            <Link to={'/go/dl/ios'} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-10 bg-[#3C5AF5] rounded-full min-w-[225px]'>
                                    <p className='text-[34px] font-bold'>iOS</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                MD5: majd lesz pussy<br />
                                Fájlméret: 69MB
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-start gap-14'>
                            <Link to={'/download/desktop'} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-10 bg-[#3C5AF5] rounded-full min-w-[225px]'>
                                    <p className='text-[34px] font-bold'>Asztali</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                MD5: majd lesz pussy<br />
                                Fájlméret: 69MB
                            </p>
                        </div>
                    </div>
                    <Link to={'/go/s/github-releases'} className='mt-6'>
                        <p className='font-extralight text-[25px]'>régebbi verziók...</p>
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-black py-24'>
                <div className='flex flex-row items-center justify-between px-10 w-full w-full h-max skew-y-2'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <div className='flex flex-row items-center justify-start gap-5'>
                            <img src={circleLogo} alt="logo" width={80} height={80}/>
                            <h1 className='font-extrabold text-[75px]'>reFilc</h1>
                        </div>
                        <h2 className='font-bold text-[30px] text-[#B7B7B7]'>
                            Website design by 
                            <span className='underline ml-[10px]'> 
                                <Link to={'https://liba.lol'} target='_blank'>liba</Link>
                            </span>
                            , developed by 
                            <span className='underline mx-[10px]'> 
                                <Link to={'https://vrolandd.hu'} target='_blank'>vrolandd</Link>
                            </span> 
                            and 
                            <span className='underline ml-[10px]'> 
                                <Link to={'https://kima.dev'} target='_blank'>kima</Link>
                            </span>
                            .<br />
                            Copyright © 2023, All Rights Reserved.
                        </h2>
                        <Link to={'/privacy-policy'}>
                            <p className='text-[20px] underline mt-8'>Adatkezelési tájékoztató</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='h-[30px] w-full bg-black mt-[-100px]'></div>
        </div>
    )
}

export default MainIndex;
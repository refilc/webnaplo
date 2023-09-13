import iPhoneMockup1 from '/image/mockup_1.png?url';
import iPhoneMockup2 from '/image/mockup_2.png?url';
import fullLogo from '/image/brand/full_logo.png?url';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import premFeature1 from '/image/premium_1.png?url';
import premFeature2 from '/image/premium_2.png?url';
import lockIcon from '/image/icon/lock.svg?url';
import Footer from '../components/footer';

const MainIndex = ({ scrollToDownload, downloadRef }: { scrollToDownload: any, downloadRef: any }) => {
    const [latestRelease, setLatestRelease] = useState<any>();
    const [latestVersion, setLatestVersion] = useState<any>('');
    const [latestGithubRelease, setLatestGithubRelease] = useState<any>();
    const [width, setWidth] = useState<number>(window.innerWidth);

    const fetchLatestRelease = async () => {
        const res = await fetch('https://api.refilc.hu/v1/public/client/version/latest');
        const json = await res.json();
        setLatestRelease(json);
        setLatestVersion(json['version'].replace('-beta', ''));
    }
    const fetchLatestGithubRelease = async () => {
        const res = await fetch('https://api.github.com/repos/refilc/naplo/releases/latest');
        setLatestGithubRelease(await res.json());
    }

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        fetchLatestRelease();
        fetchLatestGithubRelease();

        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
    console.log(isMobile);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center px-10 gap-20 w-full">
                <div className="flex items-center justify-center">
                    <img src={iPhoneMockup1} alt="iphone mockup" width={600} className='min-w-[400px] md:min-w-0 mt-[-20px] md:mt-0 mb-[-80px] md:mb-0'/>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 drop-shadow-[0_0_100px_rgba(27,58,117,0.5)]'>
                    <img src={fullLogo} alt="iphone mockup" width={400}/>
                    <p className='font-bold text-[26px] md:text-[34px] text-center'>Egy nem hivatalos e-KRÉTA kliens</p>
                    <Link to={''} onClick={scrollToDownload} className='rounded-full'>
                        <div className='flex flex-row items-center justify-center py-3 px-10 bg-gradient-to-r from-[#3C7BF5] to-[#3C5AF5] rounded-full'>
                            <p className='text-[24px] md:text-[34px] font-medium'>
                                <span className='font-extrabold'>Letöltés</span> | v{latestVersion}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-center px-5 md:px-10 w-full h-max -skew-y-2 bg-[#3C5AF5] mt-10 pt-4 md:pt-10'>
                <div className='flex flex-col items-center justify-center md:px-10 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[40px] md:text-[65px] mt-6 md:mt-8 text-center'>Egy friss vászon</h1>
                    <p className='text-[20px] md:text-[25px] leading-5 md:leading-3 text-center'>Új színpaletta, hogy elbűvölőbb legyen a matek egyes.</p>
                    <img src={iPhoneMockup2} alt="iphone mockup" width={1000} className='min-w-[400px] md:min-w-0'/>
                </div>
            </div>
            <div className='flex items-center justify-center px-5 md:px-10 w-full h-max -skew-y-2 bg-[#0F131D] mt-[-20px] pb-10 md:pb-20'>
                <div className='flex flex-col items-center justify-center md:px-10 pt-6 md:pt-12 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[40px] md:text-[65px] mt-6 md:mt-8 text-center'>Ingyenes, örökké</h1>
                    <p className='text-[20px] md:text-[25px] leading-5 md:leading-3 text-center'>Az összes Filc Prémium funckiót <span className='bg-clip-text bg-gradient-to-r from-[#3C5AF5] to-[#3C7BF5] text-fill-transparent'>ingyenessé</span> tettük.</p>
                    <p className='font-medium text-[20px] md:text-[25px] tracking-[10px] mt-4 md:mt-12 text-center'>EBBE BELETARTOZIK A...</p>
                    <div className='flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-10 md:gap-24 mt-4'>
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
            <div className='flex items-center justify-center px-5 md:px-10 w-full h-max -skew-y-2 bg-black py-14 md:py-24'>
                <div className='flex flex-col items-center justify-center md:px-10 w-full w-full h-max skew-y-2'>
                    <h2 className='font-bold text-[25px] md:text-[30px] text-center md:text-left'>Nem sok adatot tárolunk rólad.</h2>
                    <p className='text-[22px] md:text-[25px] text-center md:text-left'>
                        Úgy nagyjából... 
                        <span>
                            <img src={lockIcon} alt="lock icon" className='inline mt-[-5px] ml-2 mr-1' width={15}/>
                        </span> 
                        <span className='bg-clip-text bg-gradient-to-r from-[#FFC700] to-transparent text-fill-transparent font-semibold'>semmit...</span>
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-center px-5 md:px-10 w-full h-max -skew-y-2 bg-[#0F131D] pb-10 md:pb-20' ref={downloadRef}>
                <div className='flex flex-col items-center justify-center md:px-10 pt-6 md:pt-12 w-full w-full h-max skew-y-2'>
                    <h1 className='font-bold text-[40px] md:text-[65px] mt-6 md:mt-8 text-center'>Meggyőztünk?</h1>
                    <p className='text-[20px] md:text-[25px] leading-5 md:leading-3 text-center'>Töltsd le most! <span className='bg-clip-text bg-gradient-to-r from-white to-transparent text-fill-transparent'>(or else..)</span></p>
                    <h2 className='font-bold text-[25px] mt-8'>Verzió: {latestVersion}</h2>
                    <div className='flex flex-col items-start justify-center gap-4 md:gap-6 mt-6'>
                        <div className='flex flex-row items-center justify-start gap-6 md:gap-14'>
                            <Link to={latestRelease ? latestRelease['download_url']['android'] : ''} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-5 md:px-10 bg-[#3C5AF5] rounded-full min-w-[142px] md:min-w-[225px]'>
                                    <p className='text-[24px] md:text-[34px] font-bold'>Android</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                Letöltések: {latestGithubRelease ? latestGithubRelease['assets'][0]['download_count']: ''}<br />
                                Fájlméret: {latestGithubRelease ? `${(latestGithubRelease['assets'][0]['size'] / 1048576).toFixed(2)}MB` : ''}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-start gap-6 md:gap-14'>
                            <Link to={latestRelease ? latestRelease['download_url']['ios']: ''} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-5 md:px-10 bg-[#3C5AF5] rounded-full min-w-[142px] md:min-w-[225px]'>
                                    <p className='text-[24px] md:text-[34px] font-bold'>iOS</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                Letöltések: {latestGithubRelease ? latestGithubRelease['assets'][1]['download_count']: ''} (.ipa)<br />
                                Fájlméret: {latestGithubRelease ? `${(latestGithubRelease['assets'][1]['size'] / 1048576).toFixed(2)}MB` : ''}
                            </p>
                        </div>
                        {/* <div className='hidden md:flex flex-row items-center justify-start gap-6 md:gap-14'>
                            <Link to={'/download/desktop'} className='rounded-full'>
                                <div className='flex flex-row items-center justify-center py-3 px-5 md:px-10 bg-[#3C5AF5] rounded-full min-w-[142px] md:min-w-[225px]'>
                                    <p className='text-[24px] md:text-[34px] font-bold'>Asztali</p>
                                </div>
                            </Link>
                            <p className='font-light text-[15px]'>
                                Letöltések: 0<br />
                                Fájlméret: 0.00MB
                            </p>
                        </div> */}
                    </div>
                    <Link to={'/go/s/github-releases'} className='mt-6'>
                        <p className='font-extralight text-[25px] hover:underline'>összes verzió...</p>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainIndex;
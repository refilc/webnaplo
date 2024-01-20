import { Link, useLocation } from "react-router-dom";
import circleLogo from '/image/brand/logo.png?url';

const Footer = () => {
    const location = useLocation();
    const currentPage = location.pathname;

    const backToHome = <Link to={'/'}>
        <p className='text-[20px] underline mt-8'>Vissza a főoldalra</p>
    </Link>
    const goToPrivacy = <Link to={'/privacy-policy'}>
        <p className='text-[20px] underline mt-8'>Adatkezelési tájékoztató</p>
    </Link>

    return (
        <>
            <div className='flex items-center justify-center px-10 w-full h-max -skew-y-2 bg-black py-24'>
                <div className='flex flex-row items-center justify-between px-10 w-full w-full h-max skew-y-2'>
                    <div className='flex flex-col items-center md:items-start justify-center gap-2'>
                        <div className='flex flex-row items-center justify-start gap-5'>
                            <img src={circleLogo} alt="logo" width={80} height={80}/>
                            <h1 className='font-extrabold text-[50px] md:text-[75px]'>reFilc</h1>
                        </div>
                        <h2 className='font-bold text-[20px] md:text-[30px] text-[#B7B7B7] text-center md:text-left'>
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
                        {
                            currentPage == '/privacy-policy' ? backToHome : goToPrivacy
                        }
                        
                    </div>
                </div>
            </div>
            <div className='h-[30px] w-full bg-black mt-[-100px]'></div>
        </>
    );
}

export default Footer;
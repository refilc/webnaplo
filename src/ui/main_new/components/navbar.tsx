import { Link, useLocation } from "react-router-dom";
// import { IconContext } from "react-icons";
// import { FaDiscord, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import roundLogo from '/image/brand/round_logo.png?url';

const NewNavBar = () => {
    const location = useLocation();

    return(
        <div className="top-0 left-0 right-0 w-full flex flex-row items-center justify-between px-4 pt-4 z-50">
            <div className="flex flex-row items-center justify-center w-max h-max gap-3">
                <img src={roundLogo} alt="logo" className="w-[32px] h-[32px]" />
                <p className="text-v5_btn text-[32px] font-bold leading-3">reFilc</p>
                
            </div>
            <div className="flex flex-row items-center justify-center w-max h-max gap-[24px] font-medium text-[16px]">
                <Link to={location.pathname == '/' ? '' : '/'} className="hidden md:inline">
                    <div className="flex flex-row items-center justify-center text-v5_txt opacity-50 hover:opacity-100">
                        <p className="text-[14px]">Micsoda</p>
                    </div>
                </Link>
                <Link to={'/history'} className="hidden md:inline">
                    <div className="flex flex-row items-center justify-center text-v5_txt opacity-50 hover:opacity-100">
                        <p className="text-[14px]">Történet</p>
                    </div>
                </Link>
                <Link to={'/download'} className="hidden md:inline">
                    <div className="flex flex-row items-center justify-center text-v5_txt opacity-50 hover:opacity-100">
                        <p className="text-[14px]">Letöltés</p>
                    </div>
                </Link>
                <Link to={'/plus'} className="hidden md:inline">
                    <div className="flex flex-row items-center justify-center text-v5_txt opacity-50 hover:opacity-100">
                        <p className="text-[14px]">reFilc+</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NewNavBar;
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import * as Icon from "react-feather";

const NavBar = ({ scrollToDownload }: { scrollToDownload: any }) => {
    const location = useLocation();

    return(
        <div className="top-0 left-0 right-0 w-full flex flex-row items-center justify-between px-4 pt-4 z-50">
            <div className="flex flex-row items-center justify-center w-max h-max gap-3">
                <Link to={'/go/s/tiktok'} target="_blank">
                    <IconContext.Provider value={{ color: "white", size: "25" }}>
                        <FaTiktok />
                    </IconContext.Provider>
                </Link>
                <Link to={'/go/s/discord'} target="_blank">
                    <IconContext.Provider value={{ color: "white", size: "30" }}>
                        <FaDiscord />
                    </IconContext.Provider>
                </Link>
                <Link to={'/go/s/instagram'} target="_blank">
                    <IconContext.Provider value={{ color: "white", size: "30" }}>
                        <FaInstagram />
                    </IconContext.Provider>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-center w-max h-max gap-3">
                <Link to={'/auth/login'} className="rounded-full hidden md:inline">
                    <div className="flex flex-row items-center justify-center py-[7px] px-4 rounded-full bg-refilc text-white">
                        <p className="text-[14px]">Bejelentkezés</p>
                    </div>
                </Link>
                <Link to={location.pathname == '/' ? '' : '/'} onClick={scrollToDownload} className="rounded-full">
                    <div className="flex flex-row items-center justify-center p-[7px] rounded-full bg-refilc text-white">
                        <Icon.Download size={21} />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
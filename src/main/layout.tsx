import { useRef } from "react";
import NavBar from "./components/navbar";
import MainIndex from "./pages";
import PrivacyPolicy from "./pages/privacy";

const MainLayout = ({ currentPage }: { currentPage: string }) => {
    const downloadRef = useRef<null | HTMLDivElement>(null);
    const scrollToDownload = () => {
        downloadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            <NavBar scrollToDownload={scrollToDownload} />
            {
                currentPage == 'home' ? <MainIndex scrollToDownload={scrollToDownload} downloadRef={downloadRef} /> : 
                currentPage == 'privacy' ? <PrivacyPolicy /> :
                ''
            }
        </div>
    )
}

export default MainLayout;

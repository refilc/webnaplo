import { useRef } from "react";
import NavBar from "./components/navbar";
import MainIndex from "./pages";
import PrivacyPolicy from "./pages/privacy";
import { Helmet } from "react-helmet";

const MainLayout = ({ currentPage }: { currentPage: string }) => {
    const downloadRef = useRef<null | HTMLDivElement>(null);
    const scrollToDownload = () => {
        if (currentPage == 'home') {
            downloadRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setTimeout(() => {
                downloadRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            <Helmet>
                <meta property="og:title" content="reFilc" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/image/brand/logo.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="reFilc logo" />
                <meta property="og:url" content="https://refilc.hu" />
                <meta property="og:description" content="Egy alternatív e-KRÉTA app, diákoktól diákoknak." />
                <meta property="og:locale" content="hu_HU" />
                <meta property="og:locale:alternate" content="en_US" />
                <meta property="og:site_name" content="reFilc" />
            </Helmet>
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

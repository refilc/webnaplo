import { useRef } from "react";
import NavBar from "./components/navbar";
import MainIndex from "./pages";
import PrivacyPolicy from "./pages/privacy";
import PrivacyPolicyEnglish from "./pages/privacy-english";

// import CountdownModal from "./components/countdown";

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

    // const [timerVisible, setTimerVisible] = useState<boolean>(true);

    // useEffect(() => {
    //     setTimerVisible(true);
    // }, []);

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            {/* {timerVisible && <CountdownModal setTimerVisible={setTimerVisible} />} */}
            <NavBar scrollToDownload={scrollToDownload} />
            {
                currentPage == 'home' ? <MainIndex scrollToDownload={scrollToDownload} downloadRef={downloadRef} /> : 
                currentPage == 'privacy' ? <PrivacyPolicy /> :
                currentPage == 'privacyenglish' ? <PrivacyPolicyEnglish /> :
                ''
            }
        </div>
    )
}

export default MainLayout;

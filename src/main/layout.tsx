import { useRef } from "react";
import NavBar from "./components/navbar";
import MainIndex from "./pages";

const MainLayout = () => {
    const downloadRef = useRef<null | HTMLDivElement>(null);
    const scrollToDownload = () => {
        downloadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            <NavBar scrollToDownload={scrollToDownload} />
            <MainIndex scrollToDownload={scrollToDownload} downloadRef={downloadRef} />
        </div>
    )
}

export default MainLayout;

import NavBar from "./components/navbar";
import MainIndex from "./pages";

const MainLayout = () => {
    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            <NavBar />
            <MainIndex />
        </div>
    )
}

export default MainLayout;

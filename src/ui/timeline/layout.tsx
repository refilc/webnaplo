import NavBar from "./components/navbar";
import TimelineIndex from "./pages";

const TimelineLayout = ({ currentPage }: { currentPage: string }) => {

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#EFF4FE]">
            <NavBar />
            {
                currentPage == 'home' ? <TimelineIndex /> : 
                ''
            }
        </div>
    )
}

export default TimelineLayout;

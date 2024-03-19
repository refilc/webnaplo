
import NewNavBar from "./components/navbar";
import NewMainIndex from "./pages";
// import NewPrivacyPolicy from "./pages/privacy";

const NewMainLayout = ({ currentPage }: { currentPage: string }) => {
    return (
        <div className="select-none flex flex-col w-full h-full bg-[#E3EBFB] pt-[80px]">
            <div className="px-[120px]">
                <NewNavBar />
            </div>
            {
                currentPage == 'home' ? <NewMainIndex /> : 
                // currentPage == 'privacy' ? <PrivacyPolicy /> :
                ''
            }
        </div>
    )
}

export default NewMainLayout;

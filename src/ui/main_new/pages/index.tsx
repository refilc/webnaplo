import { Link } from "react-router-dom";
// import Footer from '../components/footer';

const NewMainIndex = () => {
    

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="mt-[230px] flex flex-col items-center justify-center w-max h-max">
                <div className="p-[12px] rounded-[40px] bg-[#F7F9FC] flex items-center justify-center">
                    <p className="text-v5_txt text-center text-[16px] font-medium leading-normal">4asfasdfgsdfh</p>
                </div>
                <div className="mt-[32px] flex flex-col items-center justify-center text-center">
                    <p className="text-v5_txt text-[80px] font-bold leading-normal">Kell egy jobb<br /> e-KRÉTA.</p>
                </div>
                <p className="text-center mt-[32px] text-v5_txt opacity-70 text-[18px] font-medium leading-normal">
                    A reFilc folytatja, amit a Filc Napló és a Szivacs Napló elkezdett: egy<br /> diákoknak készült e-KRÉTA kliens, ami szép és hasznos is.
                </p>
                <Link to={'/download'}>
                    <div className="mt-[32px] flex h-[34px] p-[16px] h-[40px] justify-center items-center gap-[10px] rounded-[22px] bg-v5_btn">
                        <p className="text-[16px] font-medium leading-normal">Letöltés</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NewMainIndex;
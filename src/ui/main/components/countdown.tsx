import { useLockBodyScroll } from "@uidotdev/usehooks";
import { IconContext } from "react-icons";
import { FaX } from "react-icons/fa6";
import Countdown from 'react-countdown';
import ParticlesBackground from "./particles";

const CountdownModal = ({ setTimerVisible }: { setTimerVisible: any }) => {
    useLockBodyScroll();

    return(
        <div className="absolute flex flex-col items-center justify-start w-screen h-screen bg-black z-50">
            <ParticlesBackground />
            <div className="absolute flex flex-col items-center justify-start w-screen h-screen bg-transparent z-50">
                <div className="flex flex-row items-center justify-end py-10 px-10 w-full">
                    <button onClick={() => setTimerVisible(false)}>
                        <IconContext.Provider value={{ color: "white", size: "17" }}>
                            <FaX />
                        </IconContext.Provider>
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-[77%]">
                    <p className="text-[69px] tracking-widest">
                        <Countdown date={Date.UTC(2024, 4, 5, 17, 55, 0, 0)} >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[40px]">Már csak néhány másodperc! 👀</span><br />
                                <span className="text-[18px] tracking-normal">...ne felejtsd el frissíteni az oldalt</span>
                            </div>
                        </Countdown>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountdownModal;
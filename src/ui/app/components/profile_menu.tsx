import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const ProfileMenu = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <div className={'flex flex-col items-center justify-center p-1 gap-1 bg-white/[0.12] backdrop-blur-2xl backdrop-brightness-[0.2] rounded-2xl fixed top-[80px] right-[20px] z-50 ' + (isVisible ? 'flex' : 'hidden')}>
            <Link to={'/app/settings'} className="w-full">
                <div className="flex flex-row items-center justify-start p-3 gap-3 hover:bg-white/[0.05] rounded-xl w-full">
                    <Icon.Settings />
                    <p>Beállítások</p>
                </div>
            </Link>
            <Link to={'/auth/logout'} className="w-full">
                <div className="flex flex-row items-center justify-start p-3 gap-3 hover:bg-white/[0.05] rounded-xl text-red-500 w-full">
                    <Icon.LogOut />
                    <p>Kilépés</p>
                </div>
            </Link>
        </div>
    );
}

export default ProfileMenu;
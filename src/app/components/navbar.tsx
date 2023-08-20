import { Link, useLoaderData, useLocation } from 'react-router-dom';
import * as Icon from 'react-feather';
import fullLogo from '/image/brand/full_logo.svg?url';

const NavBar = () => {
    const location = useLocation();
    const user: any = useLoaderData();

    const finalName = user.nickname == '' ? user.name.split(' ')[1] : user.nickname;

    const navLinks: { href: string; name: string; }[] = [
        {
            href: '/app/home',
            name: 'Home',
        },
        {
            href: '/app/grades',
            name: 'Grades',
        },
        {
            href: '/app/timetable',
            name: 'Timetable',
        },
        {
            href: '/app/messages',
            name: 'Messages',
        },
        {
            href: '/app/absences',
            name: 'Absences',
        },
    ];

    function profileClick(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className='flex flex-row p-5 items-center justify-between w-full h-max text-white sticky inset-x-0 top-0 gap-5 bg-black z-50'>
            <div className='flex flex-row items-center justify-start w-max h-max flex-1 pl-1'>
                <img src={fullLogo} alt="logo" width={130} height={44}/>
            </div>
            <div className='flex flex-row items-center justify-center w-max h-max flex-1 gap-2'>
                {navLinks.map((link) => {
                    const isActive = location.pathname == link.href;
            
                    return (
                        <Link to={link.href} key={link.name}>
                            <div className={(isActive ? 'bg-refilc-sec bg-opacity-40' : 'bg-transparent') + ' rounded-xl p-3 text-refilc-sec'}>
                                {link.name.toLowerCase() == 'home' ? <Icon.Home className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} /> :
                                    link.name.toLowerCase() == 'grades' ? <Icon.Bookmark className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} /> :
                                    link.name.toLowerCase() == 'timetable' ? <Icon.Calendar className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} /> :
                                    link.name.toLowerCase() == 'messages' ? <Icon.MessageSquare className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} /> :
                                    link.name.toLowerCase() == 'absences' ? <Icon.Clock className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} /> :
                                    <Icon.HelpCircle className={/*(isActive ? 'fill-current' : '') + */' w-[20px] h-[20px]'} />
                                }
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className='flex flex-row items-center justify-end w-max h-max gap-5 flex-1 pr-1'>
                <p className='font-bold'>Szép napot, {finalName}!</p>
                <div onClick={profileClick} className='cursor-pointer'>
                    <div className='rounded-full bg-refilc w-[44px] h-[44px] flex items-center justify-center'>
                        <p className='text-sm'>{finalName.charAt(0)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
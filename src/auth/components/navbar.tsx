import fullLogo from '/image/brand/full_logo.svg?url';

const NavBar = () => {
    return (
        <div className='flex flex-row p-5 items-center justify-between w-full h-max text-white sticky inset-x-0 top-0 gap-5 bg-black z-50'>
            <div className='flex flex-row items-center justify-start w-max h-max flex-1 pl-1'>
                <img src={fullLogo} alt="alt" width={130} height={44}/>
            </div>
            <div className='flex flex-row items-center justify-end w-max h-max gap-5 flex-1 pr-1'>
                <p className='font-bold'>Jelentkezz be a folytatáshoz!</p>
            </div>
        </div>
    );
}

export default NavBar;
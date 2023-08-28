const ErrorLayout = () => {
    return (
        <div className='select-none h-screen w-full flex flex-col items-center justify-center text-center'>
            <h1 className="text-[60px] leading-[50px]">404</h1>
            <p className="text-[22px]">A keresett oldal nem található!</p>
            <br />
            <p className="text-[16px]">Amennyiben a webes reFilc-et keresed, sajnos még nem elérhető :(</p>
        </div>
    )
}

export default ErrorLayout;
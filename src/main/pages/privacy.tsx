import Footer from '../components/footer';

const PrivacyPolicy = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center px-10 pb-16 w-full">
                <h1 className='font-bold text-[45px] mt-16'>Adatkezelési tájékoztató</h1>
                <p className='text-[20px] opacity-70'>Utoljára módosítva: 2023. 08. 22.</p>
                <div className='flex flex-col'></div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy;
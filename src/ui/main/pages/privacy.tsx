import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const PrivacyPolicy = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center px-10 pb-16 w-full">
                <h1 className='font-bold text-[45px] mt-16'>Adatkezelési Irányelvek</h1>
                <p className='text-[20px] opacity-70'>Utoljára módosítva: Október 24, 2024</p>
                <div className='flex flex-col gap-4 max-w-[900px] mt-10 text-justify indent-2'>
                    <p>• A reFilc (továbbiakban alkalmazás) egy mobilos, asztali és webes kliensalkalmazás, segítségével az e-KRÉTA rendszeréből letöltheted és felhasználóbarát módon megjelenítheted az adataidat. Tanulmányi adataid csak közvetlenül az alkalmazás és a KRÉTA-szerverek között közlekednek, titkosított kapcsolaton keresztül.</p>
                    <p>
                        • A reFilc fejlesztői és/vagy üzemeltetői, valamint az alkalmazás a tanulmányi és személyes adataidat semmilyen célból és semmilyen körülmények között nem másolják, nem tárolják és harmadik félnek nem továbbítják. Ezeket így az Educational Development Informatikai Zrt. kezeli, az Ő adatkezeléssel kapcsolatos tájékoztatójukat itt találod: 
                        <span className='mx-2 underline'>
                            <Link to={'https://tudasbazis.ekreta.hu/pages/viewpage.action?pageId=4065038'}>tudasbazis.ekreta.hu</Link>
                        </span>
                    </p>
                    <p>• Azok törlésével vagy módosítával kapcsolatban keresd az osztályfőnöködet vagy az iskolád rendszergazdáját.</p>
                    <p>• Az alkalmazás névtelen használati statisztikákat gyűjt, ezek alapján tudjuk meghatározni a felhasználók és a telepítések számát, valamint az eszközük platformját. Ezt a beállításokban kikapcsolhatod. Kérünk, hogy ha csak teheted, hagyd ezt a funkciót bekapcsolva, hogy pontosabb információnk legyen a felhasználóink platform-megoszlásáról.</p>
                    <p>• Amikor az alkalmazás hibába ütközik, lehetőség van hibajelentés küldésére. Ez személyes- és/vagy tanulmányi adatokat nem tartalmaz, viszont részletes információval szolgál a hibáról, annak okáról és eszközödről. A küldés előtt megjelenő képernyőn a te felelősséged átnézni a továbbításra kerülő adatsort. A hibajelentéseket a reFilc fejlesztői felületén tároljuk, ezekhez csak az app fejlesztői férnek hozzá.</p>
                    <p>• Az alkalmazás (az alábbi platformokon: Android, Linux, Windows) minden egyes indításakor a reFilc API, valamint a Github API segítségével ellenőrzi, hogy elérhető-e új verzió, és kérésre innen letölti és telepíti a frissítést.</p>
                    <p>
                        • Amennyiben az adataiddal kapcsolatban bármilyen kérdésed van (megtekintés, törlés, módosítás, adathordozás), keress minket a 
                        <span className='mx-2 underline'>
                            <Link to={'mailto:social@refilc.hu'}>
                                social@refilc.hu 
                            </Link>
                        </span>
                        e-mail címen, vagy 
                        <span className='mx-2 underline'>
                            <Link to={'/go/s/discord'}>
                                Discord 
                            </Link>
                        </span>
                        szerverünkön!
                    </p>
                    <p>• A kliensalkalmazás bármely eszközön és platformon történő használatával tudomásul vetted és elfogadod a jelen adatkezelési tájékoztatót. A reFilc csapata fenntartja a jogot a tájékoztató módosítására és a módosításokról nem köteles értesíteni a felhasználóit!</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy;

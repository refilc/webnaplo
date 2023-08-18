import NavBar from './components/navbar';
import { useParams } from 'react-router-dom';
import AppHome from './pages/home';

const AppLayout = () => {
    const params = useParams();
    const currentPage = params.page;

    return (
        <div className='select-none'>
            <NavBar />
            {
                currentPage == 'home' ? <AppHome /> : ''
            }
        </div>
    )
}

export default AppLayout;
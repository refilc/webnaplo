import { useParams } from 'react-router-dom';
import AuthLogin from './pages/login';
import NavBar from './components/navbar';

const AuthLayout = () => {
    const params = useParams();
    const currentPage = params.page;

    return (
        <div className='select-none h-screen'>
            <NavBar />
            {
                currentPage == 'login' ? <AuthLogin /> : ''
            }
        </div>
    )
}

export default AuthLayout;
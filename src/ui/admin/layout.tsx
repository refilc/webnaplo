import { useParams } from 'react-router-dom';
import AdminLogin from './pages/login';
import NavBar from './components/navbar';
import AdminHome from './pages/home';

const AdminLayout = () => {
    const params = useParams();
    const currentPage = params.page;

    return (
        <div className='select-none h-screen'>
            <NavBar />
            {
                currentPage == 'login' ? <AdminLogin /> : <AdminHome />
            }
        </div>
    )
}

export default AdminLayout;
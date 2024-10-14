import { useParams } from 'react-router-dom';
import AdminLogin from './pages/login';
import NavBar from './components/navbar';
import AdminHome from './pages/home';
import AdminCoupons from './pages/coupons';

const AdminLayout = () => {
    const params = useParams();
    const currentPage = params.page;

    const loginUser = window.localStorage.getItem('admin_login_user');

    return (
        <div className='select-none h-screen'>
            <NavBar showLoginText={currentPage == 'login'} loginUser={loginUser ?? 'Ismeretlen'} />
            {
                currentPage == 'login' ? <AdminLogin /> : (currentPage == 'coupons' ? <AdminCoupons /> : <AdminHome />)
            }
        </div>
    )
}

export default AdminLayout;
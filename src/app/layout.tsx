import NavBar from './components/navbar';
import { useParams } from 'react-router-dom';
import AppHome from './pages/home';
import AppGrades from './pages/grades';
import AppTimetable from './pages/timetable';
import AppMessages from './pages/messages';
import AppAbsences from './pages/absences';
import AppSettingsIndex from './pages/settings';

const AppLayout = () => {
    const params = useParams();
    const currentPage = params.page;

    return (
        <div className='select-none flex flex-col items-center'>
            <NavBar />
            {
                currentPage == 'home' ? <AppHome /> : 
                currentPage == 'grades' ? <AppGrades /> : 
                currentPage == 'timetable' ? <AppTimetable /> : 
                currentPage == 'messages' ? <AppMessages /> : 
                currentPage == 'absences' ? <AppAbsences /> : 
                currentPage == 'settings' ? <AppSettingsIndex /> : 
                '404'
            }
        </div>
    )
}

export default AppLayout;
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightMenu from '../chat/listusersendmessage';
import { useLoginStatus } from '../../services/authservice';
import ListCourse from '../carousel/listcourse';
import PlayVideoTest from '../test/PlayVideoTest';

function HomePage() {
    const accessToken = localStorage.getItem('accessToken');

    const isLogined = useLoginStatus();


    return (

        <div>
            {isLogined && <RightMenu />}
            <ListCourse />

            <PlayVideoTest />
        </div>

        // if user not login -> call api get alls -> show list course
        

        // if user logined -> call api get recommend -> show list course
    );
}


export default HomePage;
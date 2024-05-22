import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightMenu from '../chat/listusersendmessage';
import { useLoginStatus } from '../../services/authservice';
import ListCourse from '../carousel/listcourse';
import PlayVideoTest from '../test/PlayVideoTest';
import MyCart from '../../cart/mycart';
import CreateCourse from '../publisher/courses/createcourse';
import LessonPlayVideo from '../test/LessonPlayVideo';

function HomePage() {
    const accessToken = localStorage.getItem('accessToken');

    const isLogined = useLoginStatus();


    return (

        <div>
            {isLogined && <RightMenu />}
            {/* <ListCourse /> */}

            {/* <PlayVideoTest /> */}
            {/* <LessonPlayVideo /> */}
            {/* <MyCart /> */}

            {/* <CreateCourse /> */}
        </div>

        // if user not login -> call api get alls -> show list course


        // if user logined -> call api get recommend -> show list course
    );
}


export default HomePage;
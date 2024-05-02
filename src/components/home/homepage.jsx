import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightMenu from '../chat/listusersendmessage';
import { useLoginStatus } from '../../services/authservice';

function HomePage() {
    const accessToken = localStorage.getItem('accessToken');

    const isLogined = useLoginStatus();


    return (

        <div>
            {isLogined && <RightMenu />}
        </div>
    );
}


export default HomePage;
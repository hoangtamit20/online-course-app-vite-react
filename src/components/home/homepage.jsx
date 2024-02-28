import { useState } from 'react';
import viteLogo from '../../../public/vite.svg';
import reactLogo from '../../assets/react.svg';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
    const [count, setCount] = useState(0);

    const logoutCurrentDevice = async () => {
        const response = await fetch('https://localhost:7209/api/v1/auth/logout-current-device', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Redirect user to login page or show a message
        }
    };

    const logoutAllDevices = async () => {
        const response = await fetch('https://localhost:7209/api/v1/auth/logout-all-device', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Redirect user to login page or show a message
        }
    };

    return (
        <div>
            <button className='btn btn-sm btn-outline-secondary' onClick={logoutCurrentDevice}>Logout Current Device</button>
            <button className='btn btn-sm btn-outline-danger' onClick={logoutAllDevices}>Logout All Devices</button>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}


export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../services/apiservice'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isTokenValid(accessToken)) {
            navigate('/');
        } else {
            localStorage.clear();
        }
    }, [navigate]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleLoginWithEmailAndPassword = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.isSuccess) {
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken); // Lưu refresh token vào local storage
                setErrors([]);

                // navigate to homepage after user login successfully.
                navigate('/');
            } else {
                setErrors(data.errors);
            }
            setValidated(true);
        }
    };


    const handleGoogleSuccess = async (googleResponse) => {
        console.log(googleResponse);
        const idToken = googleResponse.credential;

        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth/login-with-google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: idToken,
            }),
        });

        const data = await response.json();

        if (data.isSuccess) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            setErrors([]);
            // navigate to home page after user login successfully
            navigate('/');
        } else {
            setErrors(data.errors);
        }
    };


    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENTID}>
            <div>
                {errors.length > 0 && (
                    <div className='alert alert-danger'>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Form noValidate validated={validated} onSubmit={handleLoginWithEmailAndPassword}>
                    <Form.Group controlId="validationUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className='mt-2 mb-2' type="submit">Login</Button>
                </Form>
                <Link to="/register">Register</Link> <br />
                <Link to="/reset-password">Reset password</Link>
                <GoogleLogin
                    buttonText="Login with Google"
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleSuccess}
                    cookiePolicy={'single_host_origin'}
                >Đăng nhập với google</GoogleLogin>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;

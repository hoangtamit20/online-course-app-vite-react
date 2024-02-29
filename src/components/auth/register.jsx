import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMesage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]); // This will clear the error message after 5 seconds
            }, 5000);
            return () => clearTimeout(timer); // This will clear the timeout if the component is unmounted
        }
    }, [errors]); // This effect runs whenever the 'errors' state changes

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMesage(''); // This will clear the error message after 5 seconds
            }, 5000);
            return () => clearTimeout(timer); // This will clear the timeout if the component is unmounted
        }
    }, [successMessage]); // This effect runs whenever the 'errors' state changes


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setErrors(['Passwords do not match']);
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (data.isSuccess) {
            setErrors([]);
            setSuccessMesage(data.data.message)
            // navigate to home page after user register successfully
            // navigate('/');
        } else {
            setErrors(data.errors);
        }
    };

    return (
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
            {successMessage && (
                <div className='alert alert-info'>
                    <ul>
                        <li>{successMessage}</li>
                    </ul>
                </div>
            )}
            <h1>Register Account</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formRePassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                </Form.Group>

                <Button className='mt-3' variant="outline-primary" type="submit">
                    Register
                </Button>

                <Link to="/login" >Back to login</Link>
            </Form>
        </div>
    );
}

export default Register;

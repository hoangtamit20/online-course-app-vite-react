import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMesage] = useState('');


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

        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth/check-email-reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        const data = await response.json();

        if (data.isSuccess) {
            setSuccessMesage(data.data.message)
            setErrors([]);
            // You can show a success message here
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
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Button className='mt-3 mb-2' variant="outline-primary" type="submit">
                    Reset Password
                </Button>
            </Form>
        </div>
    );
}

export default ResetPassword;

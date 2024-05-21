import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const ToastError = ({ error, onClose }) => {
    const [show, setShow] = useState(true);

    return (
        <Toast show={show} onClose={() => { setShow(false); onClose(); }} delay={3000} autohide>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
        </Toast>
    );
};

export default ToastError;
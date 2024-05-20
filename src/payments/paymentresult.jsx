// PaymentResult.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function PaymentResult() {
    const searchParams = new URLSearchParams(useLocation().search);
    const paymentStatus = searchParams.get('PaymentStatus');

    let alertVariant;
    let message;
    switch (paymentStatus) {
        case '00':
            alertVariant = 'success';
            message = 'Thanh toán thành công!';
            break;
        case '10':
            alertVariant = 'danger';
            message = 'Lỗi thanh toán!';
            break;
        case '99':
        default:
            alertVariant = 'warning';
            message = 'Trạng thái thanh toán không xác định!';
            break;
    }

    return (
        <div className="container mt-5">
            <Alert variant={alertVariant}>
                <Alert.Heading>Kết quả thanh toán</Alert.Heading>
                <p>{message}</p>
            </Alert>
        </div>
    );
}

export default PaymentResult;

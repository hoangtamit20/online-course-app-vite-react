import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';


const MyCart = () => {
    // const { ownerName, toltalPrice, cartItemInfoDtos } = cartData;
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("accessToken");
            console.log(accessToken);

            const response = await axios.get('https://localhost:7209/api/v1/carts/getall', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data.data);
            setCartData(response.data.data);
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h2>Giỏ hàng của {cartData && cartData.ownerName}</h2>
                    {cartData && cartData.cartItemInfoDtos.map((item, index) => (
                        <Card key={index}>
                            <Card.Img variant="top" src={item.thumbnail} />
                            <Card.Body>
                                <Card.Title>{item.courseName}</Card.Title>
                                <Card.Text>
                                    Giá: {item.price} VND
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Ngày thêm: {new Date(item.dateAdded).toLocaleDateString()}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    ))}
                </Col>
                <Col md={4}>
                    <h2>Thông tin thanh toán</h2>
                    <ListGroup>
                        <ListGroupItem>Tổng giá: {cartData && cartData.toltalPrice} VND</ListGroupItem>
                    </ListGroup>
                    <Button variant="primary" size="lg" block>
                        Thanh toán
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MyCart;

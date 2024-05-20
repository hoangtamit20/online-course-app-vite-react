import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, ListGroup, ListGroupItem, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

export default function MyCart() {

    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/carts/getall`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data.data);
            setCartData(response.data.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const handleRemoveCartItem = async (itemId) => {
        try {
            console.log(itemId);
            const accessToken = localStorage.getItem("accessToken");
            await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/carts/remove`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    courseIds: [itemId]
                }
            });
            fetchData();
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    return (
        <section className="h-100 gradient-custom">
            <Container className="py-5 h-100">
                <Row className="justify-content-center my-4">
                    <Col md="8">
                        <Card className="mb-4">
                            <Card.Header className="py-3">
                                <h5>Cart - {cartData && cartData.cartItemInfoDtos.length} items</h5>
                            </Card.Header>
                            <Card.Body>
                                {cartData && cartData.cartItemInfoDtos.map((item, index) => (
                                    <Row key={index} className="mb-4">
                                        <Col lg="3" md="12">
                                            <div className="bg-image rounded hover-zoom hover-overlay">
                                                <Image
                                                    src={item.thumbnail}
                                                    fluid
                                                    className="w-100"
                                                />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                                </a>
                                            </div>
                                        </Col>
                                        <Col lg="7" md="6" className="text-start">
                                            <p>
                                                <strong>{item.courseName}</strong>
                                            </p>
                                            <p>Owner: {cartData && cartData.ownerName}</p>
                                            <p>Price: ${item.price}</p>
                                            <p>Date: {new Date(item.dateAdded).toLocaleDateString()}</p>
                                        </Col>

                                        <Col lg="2" md="6">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove-tooltip">Remove item</Tooltip>}
                                            >
                                                <Button variant="link" className="icon-button" onClick={() => handleRemoveCartItem(item.courseId)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="wishlist-tooltip">Move to the wish list</Tooltip>}
                                            >
                                                <Button variant="link" className="icon-button">
                                                    <i className="fas fa-heart text-danger"></i>
                                                </Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                ))}
                                <hr className="my-4" />
                            </Card.Body>
                        </Card>

                        <Card className="mb-4">
                            <Card.Body>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <Card.Body>
                                <p>
                                    <strong>We accept</strong>
                                </p>
                                <Image src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" width="45px" className="me-2" />
                                <Image src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" width="45px" className="me-2" />
                                <Image src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" width="45px" className="me-2" />
                                <Image src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png" width="45px" className="me-2" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="mb-4">
                            <Card.Header>
                                <h5>Summary</h5>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Courses
                                        <span>${cartData && cartData.totalPrice}</span>
                                    </ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        {/* Shipping
                                        <span>Gratis</span> */}
                                    </ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <p className="mb-0">(including VAT)</p>
                                        </div>
                                        <span>
                                            <strong>${cartData && cartData.totalPrice}</strong>
                                        </span>
                                    </ListGroupItem>
                                </ListGroup>
                                <Button variant="primary" block={true.toString()} size="lg">
                                    Go to checkout
                                </Button>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
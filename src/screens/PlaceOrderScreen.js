import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  cart.shippingPrice = cart.itemsPrice > 30 ? 0 : 5.99
  cart.taxPrice = Number((0.10) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  const placeOrder = () => {
      console.log('placed order');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"   "}
                {cart.shippingAddress.postalCode},{"   "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? <Message variant="info">
                    Your cart is empty
                  </Message> : (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={4}>
                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup.Item variant='flush'>
                    <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Items:</Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>${cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Total:</Col>
                        <Col>${cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button 
                        type='submit'
                        className='btn-block'
                        disable={cart.cartItems === 0 }
                        onClick={placeOrder}
                    >
                        Place Order
                    </Button>
                </ListGroup.Item>

            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;

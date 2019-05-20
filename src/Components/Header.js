import React from 'react'
import './Components.css'
import logo from "../Assets/tickets.png";
import { Col, Container, Row } from 'reactstrap';


const Header = () => {
    return (
        <Container sm={0}>
            <Row>
                <Col><img className={"Header_Image"} alt="Logo" src={logo}/></Col>
                <Col><h1>Welcome to Online Train Bookings</h1></Col>
            </Row>
        </Container>
    )
};

export default Header;
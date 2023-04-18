import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyAccount(){
    return(
        <Container>
            <header>My Account Info</header>
            <Row>
                    <Col>Username: TraderHaley</Col>
            </Row>
            <Row>
                    <Col>Email: haleynfisher018@gmail.com</Col>
            </Row>
            <Row>
                    <Col>Password: TraderHaley442</Col>
            </Row>
       </Container>
    )
}

export default MyAccount;
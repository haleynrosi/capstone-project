import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyAccount(){
    return(
        <Container>
            <header>My Account Info</header>
            <Col>
                    <div>
                        <h3>Name:</h3>
                        <p></p>
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <p></p>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <p></p>
                    </div>
            
            </Col>
        
       </Container>
    )
}

export default MyAccount;
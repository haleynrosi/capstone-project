import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
import '../App.css';

function MyAccount(){
    return(
        <div style={{ display: "flex", flexDirection: 'row' }}>   
        <NavBar/>
        <Container>
            <h2>My Account Info</h2>
            <Col>
                <Col>
                    
                        <h3>Name:</h3>
                        <p></p>
                        <Button>Update Name</Button>
                    
                </Col>
                <Col>
                
                        <h3>Email:</h3>
                        <p></p>
                        <Button>Update Email</Button>
                    
                </Col>
                <Col>
                    
                        <h3>Password:</h3>
                        <p></p>
                        <Button>Update Password</Button>
                    
                </Col>
                <Button>Delete My Account</Button>
            
            </Col>
        
       </Container>
       </div>
    )
}

export default MyAccount;
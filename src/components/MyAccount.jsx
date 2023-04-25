import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
import '../App.css';
import { useSelector } from "react-redux";

function MyAccount(){

    const loginSelector = useSelector(state => state.alterUser.userLogin)

    const updateName = async () => {
        await fetch(``)
    }

    const updateEmail = async () => {
        
    }

    const deleteAccount = async () => {
        await fetch(`http://34.210.179.63:8008/Users/id/${loginSelector.userID}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        }).then(response =>{
            console.log(response)
        }).catch(error =>{
            console.log(error)
        })
    }

    return(
        <div style={{ display: "flex", flexDirection: 'row' }}>   
        <NavBar/>
        <Container>
            <h2>My Account Info</h2>
            <Col>
                <Col>
                    
                        <h3>Name:</h3>
                        <p>{loginSelector.firstName} {loginSelector.lastName}</p>
                        <Button onClick={updateName}>Update Name</Button>
                    
                </Col>
                <Col>
                
                        <h3>Email:</h3>
                        <p>{loginSelector.email}</p>
                        <Button onClick={updateEmail}>Update Email</Button>
                    
                </Col>
                <Button onClick={deleteAccount}>Delete My Account</Button>
            
            </Col>
        
       </Container>
       </div>
    )
}

export default MyAccount;
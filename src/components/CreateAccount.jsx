import React from "react";
import {Card,Form,Button} from 'react-bootstrap';
import '../App.css';

function CreateAccount(){
    return(
        <body>
            <h1>Account Creation</h1>
            <Card>
                <Form>
                <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..."/>
                    </Form.Group>
                    <Button>Create your account!</Button>
                </Form>
            </Card>
        </body>
    )
}

export default CreateAccount;
import React from "react";
import {Card,Form,Button} from 'react-bootstrap';

function SignIn(){
    return(
        <Card>
            <Card.Title>Sign In</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"/>
                    </Form.Group>
                    <a href="/accountcreation">Need a login? Sign up here!</a>
                    <bR></bR>
                    <Button>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignIn;
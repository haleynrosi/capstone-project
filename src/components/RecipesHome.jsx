import React from "react";
import NavBar from "./NavBar";
import {Container,Row, Col, Card} from 'react-bootstrap'
import '../App.css';

function RecipesHome(){
    return(
        <body style={{display: "flex", flexDirection: 'row'}}>
            <NavBar/>
             <Container style={{paddingTop: 100, paddingRight:100, paddingLeft:100, }}>
                <Row>
                    <Card>
                        <Card.Title>Recipe Of The Day</Card.Title>
                        <Card.Body>.....recipe with title, picture, shows a new one everyday</Card.Body>
                    </Card>
                </Row>
                <br></br>
                <Row>
                    <Card>
                        <Card.Title>Featured Recipes</Card.Title>
                        <Card.Body>....rotating pictures with recipe pictures, names that are clickable thumbnails</Card.Body>
                    </Card>
                </Row>
             </Container>
        </body>
    
    )
}

export default RecipesHome;
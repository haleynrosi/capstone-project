import React from "react";
import NavBar from "./NavBar";
import { Button, Form, Row, Card } from "react-bootstrap";

function LunchRecipes() {
    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row" >
                <div className="d-flex row" style={{padding:40}}>
                    <Form className="">
                        <Form.Control
                            type="search"
                            placeholder="Search by Recipe..."
                            className=""
                            aria-label="Search"
                        />
                        <Button variant="outline-dark">Search</Button>
                    </Form>
                    <Form className="">
                        <Form.Control
                            type="search"
                            placeholder="Search by Ingredient..."
                            className=""
                            aria-label="Search"
                        />
                        <Button variant="outline-dark">Search</Button>
                    </Form>
                </div>

                <Card className="d-flex col " style={{margin:40}}>
                    <Card.Title>Popular Lunch Recipes</Card.Title>
                    <Card.Body>....rotating pictures with recipe pictures, names that are clickable thumbnails</Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default LunchRecipes;
import React from "react";
import {Card} from 'react-bootstrap';

function MyDashboard() {
    return (
        <body>
            <h1>User's Dashboard</h1>
        <div>
        <div className="dashboardDiv">
            <Card>
                <Card.Title>Your Favorite Recipes</Card.Title>
                <Card.Body></Card.Body>
            </Card>
            <Card>
                <Card.Title>Your Grocery List</Card.Title>
                <Card.Body></Card.Body>
            </Card>
        </div>

        </div>
        </body>
    )

}

export default MyDashboard;  
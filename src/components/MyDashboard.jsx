import React from "react";
import {Card, Col, Row, Button} from 'react-bootstrap';
import { useSelector } from "react-redux";

const MyDashboard = ({username}) => {
    console.log(username)
    const userId = useSelector((state)=>
        state.userId
    )

//    const [username, setUsername] = useState('');

//    const userName = async() => {
//     let fetchUserName = await fetch(`http://34.210.179.63:8008/Users/username/${username}`);
//     await fetchUser.json()
//     .then((data) =>{
//      console.log(data)
//      // dispatch(alterId(data.userId)) 
//      if(data.userId!== null){
//          setLoggedIn(true)
//      }
//     })
//  }
 

    return (
        <body>
            <h1>{username}'s Dashboard</h1>
        <div>
        <Col className="dashboardDiv">
            <Card>
                <Card.Title>Your Favorite Recipes</Card.Title>
                <Card.Body></Card.Body>
            </Card>
        </Col>
        
        <Col>
        <Card>
                <Card.Title>Your Grocery List</Card.Title>
                <Card.Body></Card.Body>
            </Card>
        </Col>
        <Col>
            <Button>Submit a recipe to TraderRecipes!</Button>
            <Card>
                <Card.Title>TraderRecipe Of The Week</Card.Title>
                <Card.Body>
                    <Card.Img></Card.Img>
                </Card.Body>
            </Card>
        </Col>

        </div>
        </body>
    )

}

export default MyDashboard;  
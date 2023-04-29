import React from "react";
import {Card, Col, Row, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import '../App.css';
import { openSRModal } from '../actions/SubmitRecipeModalSlice';
import SubmitRecipe from "./SubmitRecipe";
import { useDispatch } from "react-redux";

const MyDashboard = () => {
    const dispatch = useDispatch();
    const openRecipeModal = () =>{
        dispatch(openSRModal());
    }
    
    
    const loginSelector = useSelector(state => state.alterUser.userLogin)

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
        <div style={{ display: "flex"}}>
            <NavBar/>
        <div>
        <h2 style={{textAlign: 'center'}}>{loginSelector.firstName}'s Dashboard</h2>
        <Row style={{display:"flex", margin: 50}}>
        <Col >
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
            <Button onClick={ openRecipeModal }>Submit a recipe to TraderRecipes!</Button>
            <SubmitRecipe/>
            <Card>
                <Card.Title>TraderRecipe Of The Week</Card.Title>
                <Card.Body>
                    <Card.Img></Card.Img>
                </Card.Body>
            </Card>
        </Col>
        </Row>

        </div>
        </div>
    )

}

export default MyDashboard;  
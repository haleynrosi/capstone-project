import React, { useEffect, useState } from "react";
import {Card, Col, Row, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import '../App.css';
import { openSRModal, handleMessage } from '../actions/SubmitRecipeModalSlice';
import SubmitRecipe from "./SubmitRecipe";
import axios from 'axios'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import submitMessage from './SubmitMessage';


const MyDashboard = () => {
    const dispatch = useDispatch();
    const openRecipeModal = () =>{
        dispatch(openSRModal());
    }
    
    
    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const userId = loginSelector.userID


  const [userRecipes, setUserRecipes] = useState([]);
  const [userRecipesWithImages, setUserRecipesWithImages] = useState([]);


useEffect(()=>{
    axios.get(`http://34.210.179.63:8008/Recipes/owner/${userId}`, {
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            "api-key": "DigtalCrafts"
        }
    })
    .then((res) =>{
        setUserRecipes(res.data);
    })
    .catch((err)=>{
        console.log(err)
    })
},[])



useEffect(()=>{
    const fetchImages = async() => {
        const updatedRecipes = [];
        for (const recipe of userRecipes) {
            try{
                const response = await axios.get(
                    `http://34.210.179.63:8008/Images/${recipe.imageName}`,
                    {
                        headers:{
                            "Content-Type": "text/html",
                            "Access-Control-Allow-Origin": "*",
                            "api-key": "DigtalCrafts"
                        },
                    }
                );

                const updatedRecipe = {
                    ...recipe,
                    image: response.data
                };
                updatedRecipes.push(updatedRecipe);
            }catch (err){
                console.log(err)
            }
        }
        setUserRecipesWithImages(updatedRecipes)
    };
    fetchImages();
},[userRecipes])



const handleDeleteRecipe =  (recipeId) => {  


         axios.delete(`http://34.210.179.63:8008/Recipes/id/${recipeId}`, {
          headers: {'api-key': 'DigtalCrafts'}
        })
        .then(() => {
            setUserRecipesWithImages(userRecipesWithImages.filter(recipe => recipe.recipeId !== recipeId));
        })
        .catch(err => console.error(err));   
 
}


 

    return (
        <div style={{ display: "flex"}}>
            <NavBar/>
        <div>
        <h2 style={{textAlign: 'center'}}>{loginSelector.firstName}'s Dashboard</h2>
        <Row style={{display:"flex", margin: 50}}>
            <Col >
                <Card>
                    <Card.Title>Favorites</Card.Title>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
        </Row>
        <Row style={{display:"flex"}}>
            <Col>
                <Card style={{textAlign:'center', margin: 10, padding:10, borderWidth:5, borderColor:'lightgray'}}>
                    <Card.Title>My Recipes</Card.Title>
                    <Card.Body style={{display:'flex', flexFlow:'row wrap', rowGap: 25, columnGap:25}}>
                        {userRecipesWithImages.map((recipe)=>(
                        <Col>
                          <Card style ={{padding:20, borderWidth:3, borderColor:'rgb(188,143,143'}}>
                                <Card.Title>{recipe.recipeName}</Card.Title>
                                <Card.Body>
                                    <div style={{ position: 'relative'  }}>
                                    <img style={{ borderRadius:10, minWidth: 250, minHeight: 250, maxHeight: 250, width: 'auto', height: 'auto', objectFit: 'cover' }}
                                            className="w-100 p-50"
                                            src={recipe.image}
                                            alt={recipe.recipeName}
                                            // onClick={() => {
                                            //     // TODO: Implement opening the modal with the image, title, and description
                                            // }}
                                        />
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleDeleteRecipe(recipe.recipeId)}
                                        style={{ position:'absolute',top: 10, right: 3, backgroundColor: 'transparent', border:'none', color: `white` }}
                                        title="Delete recipe"
                                    >
                                        <HighlightOffIcon
                                        style={{fontSize:40, textShadow:'0px 2px 40px #000'}} />
                                        
                                    </Button>  
                                    </div> 
                                </Card.Body>
                          </Card>  
                        </Col>
                        ))}
                    </Card.Body>
            </Card>

            </Col>
        </Row>
        <Row>
        <Col>
            <Button onClick={ openRecipeModal }style={{backgroundColor: '#CD5C5C'}}>Post a recipe</Button>
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
import React, { useEffect, useState } from "react";
import {Card, Col, Row, Button} from 'react-bootstrap';
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import '../App.css';
import { openSRModal, handleMessage } from '../actions/SubmitRecipeModalSlice';
import SubmitRecipe from "./SubmitRecipe";
import axios from 'axios'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecipeModal from "./RecipeModal";
import{ alterRecipe } from "../actions/recipeModal";



const MyDashboard = () => {
    const dispatch = useDispatch();
    const openRecipeModal = () =>{
        dispatch(openSRModal());
    }
    
    
    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const recipeSelector = useSelector(state => state.recipeModal.clickRecipeModal)
    console.log(recipeSelector)
    
    const userId = loginSelector.userID


  const [userRecipes, setUserRecipes] = useState([]);
  const [userRecipesWithImages, setUserRecipesWithImages] = useState([]);
  const [openDashRecipeModal, setOpenDashRecipeModal] = useState(false)
  
  




  useEffect(()=>{
    if (userId) {
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
            console.log(err);
        })
    }
},[userId])

useEffect(()=>{
    const fetchImages = async() => {
        const updatedRecipes = [];
        for (const recipe of userRecipes) {
            try{
                const response = await axios.get(
                    `http://34.210.179.63:8008/Images/${recipe.imageName}`,{

                        headers:{
                            "Content-Type": "text/html",
                            "Access-Control-Allow-Origin": "*",
                            "api-key": "DigtalCrafts"
                        }
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
},[userId, userRecipes])


const [userFavorites, setUserFavorites] = useState([]);
  const [userFavoritesWithImages, setUserFavoritesWithImages]= useState([]);


useEffect(()=>{
    axios.get(`http://34.210.179.63:8008/Favorites/user/${userId}`, {
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*",
            "api-key":"DigtalCrafts"
        }
    })
    .then((res)=>{
        setUserFavorites(res.data);
        console.log(userFavorites)
    })
    .catch((err)=>{
        console.log(err);
    })
},[userId])



useEffect(()=>{
    const fetchFavoriteImages = async() => {
        const updatedFavorites = [];
        for (const favorite of userFavorites) {
            console.log(favorite.imageName)
            try{
                const response = await axios.get(
                    `http://34.210.179.63:8008/Images/${favorite.imageName}`, {

                        headers:{
                            "Content-Type":"text/html",
                            "Access-Control-Allow-Origin": "*",
                            "api-key": "DigtalCrafts"
                        }
                    }
                );
                const updatedFavorite = {
                    ...favorite,
                    image: response.data
                };
                updatedFavorites.push(updatedFavorite);
            }catch (err) {
                console.log(err);
            }
        }
        setUserFavoritesWithImages(updatedFavorites);
    }
    fetchFavoriteImages();
},[userId, userFavorites])





const handleDeleteRecipe =  (recipeId) => {  
    if (recipeId) {
        axios.delete(`http://34.210.179.63:8008/Recipes/id/${recipeId}`, {
            headers: {'api-key': 'DigtalCrafts'}
        })
        .then(() => {
            setUserRecipesWithImages(userRecipesWithImages.filter(recipe => recipe.recipeId !== recipeId));
        })
        .catch(err => console.error(err));   
    }
}

const handleRemoveFavorite =(recipeId, userId) => {
    console.log(recipeId, userId)
    if (recipeId) {
        axios.delete(`http://34.210.179.63:8008/Favorites/user/${userId}/recipe/${recipeId}`, {
            headers: {'api-key':'DigtalCrafts'}
        })
        .then(()=>{
            setUserFavoritesWithImages(userFavoritesWithImages.filter(recipe=> recipe.recipeId !== recipeId))
        })
    }
}

const handleRecipeClick = (recipe) => {
    dispatch(alterRecipe({
        recipeModalName: recipe.recipeName,
        recipeModalImage: recipe.image,
        recipeModalRecipe: recipe.description,
        recipeID: recipe.recipeId
    }));
    setOpenDashRecipeModal(true);
}

const closeRecipeModal = () => {
    setOpenDashRecipeModal(false)
}

 

    return (
        <div style={{ display:'flex'}} >
            <NavBar />
        <div>
        
        <h2 style={{marginTop:25,
                    fontSize:55,
                    color:'rgb(188, 143, 143)', 
                    textAlign: 'center'
            }}>
            Dashboard
        </h2>
       
        <Row style={{
                     padding:50}}>
            <Col >
            {/* favorites card */}

                <Card style={{textAlign:'center', 
                              margin: 'auto', 
                              padding:10, 
                              border:'none', 
                              color:'rgb(60,60,60)'
                              }}>
                    <Card.Title style={{fontSize:40}}>Favorites</Card.Title>
                    <Card.Body style={{display:'flex', 
                                       flexFlow:'row wrap', 
                                       rowGap: 25, 
                                       columnGap:25}}>
                    {userFavoritesWithImages.map((recipe)=>(
                        <Col>
                          <Card style ={{margin:'auto',
                                        padding:20, 
                                        borderWidth:3, 
                                        color:'rgb(100,100,100)', 
                                        borderColor:'rgb(188,143,143)'
                                        }}>
                                <Card.Title>{recipe.recipeName}</Card.Title>
                                <Card.Body >
                                    <div style={{ position: 'relative'}}>
                                    <img style={{borderRadius:10, 
                                                 minWidth: 250, 
                                                 maxWidth: 525,
                                                 minHeight: 250, 
                                                 maxHeight: 250, 
                                                  width: 'auto', 
                                                  height: 'auto', 
                                                  objectFit: 'cover'  
                                                }}
                                            className="w-100 p-50"
                                            src={recipe.image}
                                            alt={recipe.recipeName}
                                            onClick = {(e)=>{handleRecipeClick(recipe)}}
                                        />
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleRemoveFavorite(recipe.recipeId, userId)}
                                        style={{ position:'absolute',top: 0, left: 0, backgroundColor: 'transparent', border:'none', color: `RGB(196, 137, 137)` }}
                                        title="Remove favorite"
                                    >
                                        <FavoriteIcon
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
        <Row style={{display:"flex", padding:50}}>
            <Col>
            {/* Created recipes card */}

                <Card style={{textAlign:'center', 
                              margin: 'auto', 
                              padding:10, 
                              border:'none', 
                              color:'rgb(60,60,60)'
                        }}>
                    <Button onClick={ openRecipeModal }
                            style={{margin:'auto' ,
                                    marginBottom:20,
                                    fontSize:25, 
                                    color:'rgb(188, 143, 143)', 
                                    borderWidth:3, 
                                    borderColor:'rgb(188, 143, 143)', 
                                    backgroundColor: 'white'}}>Post a recipe
                    </Button>
                    <Card.Title style={{fontSize:40}}>Your Recipes</Card.Title>
                    <Card.Body style={{display:'flex', 
                                       flexFlow:'row wrap', 
                                       rowGap: 25, 
                                       columnGap:25}}>
                        {userRecipesWithImages.map((recipe)=>(
                        <Col>
                          <Card style ={{margin:'auto',
                                        padding:20, 
                                        borderWidth:3, 
                                        color:'rgb(100,100,100)', 
                                        borderColor:'rgb(188,143,143)'
                                        }}>
                                <Card.Title>{recipe.recipeName}</Card.Title>
                                <Card.Body>
                                    <div style={{ position: 'relative'  }}>
                                    <img style={{ borderRadius:10, 
                                                  minWidth: 250, 
                                                  maxWidth: 525,
                                                  minHeight: 250, 
                                                  maxHeight: 250, 
                                                  width: 'auto', 
                                                  height: 'auto', 
                                                  objectFit: 'cover' 
                                                }}
                                            className="w-100 p-50"
                                            src={recipe.image}
                                            alt={recipe.recipeName}
                                            onClick = {(e)=>{handleRecipeClick(recipe)}}
                                        />
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleDeleteRecipe(recipe.recipeId)}
                                        style={{ position:'absolute',
                                                 top: 0, 
                                                 left: 0, 
                                                 backgroundColor: 'transparent', 
                                                 border:'none', 
                                                 color: `RGB(173, 69, 69` }}
                                        title="Delete recipe"
                                    >
                                        <HighlightOffIcon
                                        style={{fontSize:40, 
                                                textShadow:'0px 2px 40px #000'}} />
                                    </Button>  
                                    </div> 
                                </Card.Body>
                          </Card>  
                        </Col>
                        ))}
                        
                        <SubmitRecipe/>
                        <RecipeModal isOpen={openDashRecipeModal} img={recipeSelector.recipeModalImage} recipeTitle={recipeSelector.recipeModalName} description={recipeSelector.recipeModalRecipe} onClose={closeRecipeModal} value={recipeSelector.recipeID}></RecipeModal>
                    </Card.Body>     
            </Card>

            </Col>
        </Row>

        </div>
    </div>
    )

}

export default MyDashboard;
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import {Container,Row, Col, Card} from 'react-bootstrap'
import { useState } from "react";
import axios from "axios";
import '../App.css';
import { Update } from "@mui/icons-material";

function RecipesHome(){

    const [allRecipes, setAllRecipes] = useState([])
    const [recipeWithImages, setRecipeWithImages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(()=>{
        axios.get('http://34.210.179.63:8008/Recipes', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "api-key": "DigtalCrafts",
            }
        }).then((response)=>{
            setAllRecipes(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }, [allRecipes])

 

    useEffect(()=>{
        const getRecipeImages = async () => {
            const updatedRecipes = [];
            for (const recipeImage of allRecipes){
                try{
                    const response = await axios.get(
                        `http://34.210.179.63:8008/Images/${recipeImage.imageName}`,
                        {
                            headers: {
                                "Content-Type": "text/html",
                                "Access-Control-Allow-Origin": "*",
                                "api-key": "DigtalCrafts",
                            },
                        });

                        const updatedRecipe = {
                            ...recipeImage,
                            image: response.data
                        };
                        updatedRecipes.push(updatedRecipe);
                } catch (error){
                    console.log(error)
                    
                }
            }
            setRecipeWithImages(updatedRecipes)
        
        }
        getRecipeImages();
        

    }, [recipeWithImages])

   

    const nextRecipeImage = () => {
        if(imageIndex === recipeWithImages.length - 1){
            setImageIndex(0)
        } else {
            setImageIndex(imageIndex+1)
        }
    }

 

     

        const renderAllRecipes = () =>{
           
            return recipeWithImages.map((recipe, index)=>{
                return (
                    <div  className={`photo ${index ===! 0 ? 'active' : ''}`}
                    key={index}>
                        <Card style={{padding:10, margin: 'auto'}}>
                            <Card.Title>{recipe.recipeName}</Card.Title>
                            <Card.Img alt={`Photo ${imageIndex}`} src={recipe.image}></Card.Img>
                        </Card>
                    </div>
                )
            })
        }
    

 
        

    return(
        <div style={{display: "flex", flexDirection: 'row', height: '100%'}}>
            <NavBar/>
             <Container style={{paddingTop: 100, paddingRight:100, paddingLeft:100, }}>
                <Row>
                    <Card>
                        <Card.Title>Recipe Of The Day</Card.Title>
                        <Card.Body>.....recipe with title, picture, shows a new one everyday</Card.Body>
                    </Card>
                </Row>
                <br></br>
                <Card>
                    <div className="imageGalleryContainer">
                        <div style={{display:'flex', flexDirection: 'row', transition:'transform 0.3s ease-in-out'}}> {renderAllRecipes()}</div>
                    </div>
                    </Card>
                
             </Container>
        </div>
    
    )
}

export default RecipesHome;
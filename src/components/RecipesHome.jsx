import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useState } from "react";
import axios from "axios";
import '../App.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Update } from "@mui/icons-material";
import recipeModal, { alterRecipe } from "../actions/recipeModal";
import { alterRecipeOfDay } from "../actions/recipeOfDay";
import { useSelector, useDispatch } from "react-redux";
import RecipeModal from "./RecipeModal";

function RecipesHome() {

    const recipeSelector = useSelector(state => state.recipeModal.clickRecipeModal)
    const recipeOfDaySelector = useSelector(state => state.recipeOfDay.recipeOfTheDay)

    const loginSelector = useSelector(state => state.alterUser.userLogin)
    
    const userId = loginSelector.userID
    const dispatch = useDispatch()
    

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const [allRecipes, setAllRecipes] = useState([])
    const [recipeWithImages, setRecipeWithImages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [openRecipeModal, setOpenRecipeModal] = useState(false)
    
   


    

    useEffect(() => {
        axios.get('http://34.210.179.63:8008/Recipes', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "api-key": "DigtalCrafts",
            }
        }).then((response) => {
            setAllRecipes(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])



    useEffect(() => {
        const getRecipeImages = async () => {
            const updatedRecipes = [];
            for (const recipeImage of allRecipes) {
                try {
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
                } catch (error) {
                    console.log(error)

                }
            }
            setRecipeWithImages(updatedRecipes)
        }
        getRecipeImages();



    }, [recipeWithImages])


    // useEffect(()=>{
    //     const renderRandomImage = (array) => {
    //         const randomIndex = Math.floor(Math.random() * array.length)
    //         return array[randomIndex]
    //     }
    
    //     renderRandomImage(recipeWithImages)

    //     // dispatch(alterRecipeOfDay({
    //     //     recipeOfTheDayName: renderRandomImage(recipeWithImages).recipeName,
    //     //     recipeOfTheDayImage: renderRandomImage(recipeWithImages).image,
    //     // }
    //     // ))
    //             console.log(renderRandomImage(recipeWithImages))

               
    // }, [])



    const renderAllRecipes = () => {

        return recipeWithImages.map((recipe, index) => {
            return (
                
                    <Card key={index} style={{margin: 'auto', maxWidth: '80%' }}>
                        <Card.Title>{recipe.recipeName}</Card.Title>
                        <img alt={`Photo ${imageIndex}`} src={recipe.image} onClick = {(e)=>{handleRecipeClick(recipe)}}></img>
                    </Card>
               
            )
        })
    }

    const handleRecipeClick = async (recipe) => {
        if (recipe) {
            try {
                const res = await axios.get(`http://34.210.179.63:8008/Users/id/${recipe.owner}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'api-key': 'DigtalCrafts'
                    }
                });
                const ingredientRes = await axios.get(`http://34.210.179.63:8008/RecipeIngredients/recipe/${recipe.recipeId}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'api-key': 'DigtalCrafts'
                    }
                });
                const ownerUsername = res.data.username;
                const ingredients = ingredientRes.data
                dispatch(alterRecipe({
                    recipeModalName: recipe.recipeName,
                    recipeModalImage: recipe.image,
                    recipeModalRecipe: recipe.description,
                    recipeID: recipe.recipeId,
                    owner: ownerUsername,
                    recipeModalIngredients: ingredients
                }));
                
                setOpenRecipeModal(true);
            } catch (error) {
                console.log(error);
            }
            console.log(recipeSelector.recipeModalIngredients)
        }
    };

    const closeRecipeModal = () => {
        setOpenRecipeModal(false)
    }


    return (
        <div style={{ display: "flex", flexDirection: 'row', height: '100%', justifyContent: 'space-between' }}>
            <NavBar />
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '75%'}}>
                <div style={{width:'100%', padding: 10}}>
                <h3 style={{
                    
                    fontSize: 30,
                    color: 'rgb(188, 143, 143)',
                    margin:25
                }}>Trader Joes Shopping has always been fun -  <u>now it can be easy too.</u></h3>
                <p style={{
                
                    fontSize: 15,
                    color: 'rgb(188, 143, 143)',
                   margin:25
                }}>Welcome to your one stop shop for all inventory related to Trader Joes. Forgot that super cool recipe you saw on tik tok? We got it.
                    Want to start shopping at TJs but dont't know where to start? Start here!
                </p>
                </div>

                <Container style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Row>
                        <Card style={{ alignContent: 'left', width: "40%", height: '100%', margin: 20 }}>
                            <Card.Title>Recipe Of The Day</Card.Title>
                            <div>
                                <Card.Title>{recipeOfDaySelector.recipeOfTheDayName}</Card.Title>
                                <Card.Img src={recipeOfDaySelector.recipeOfTheDayImage}></Card.Img>
                            </div>
                        </Card>



                    </Row>
                    <br></br>
                    <Card style={{ padding: 10, width: '100%'}}>
                        <Card.Title>Featured Recipes</Card.Title>
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            width='100%'
                        
                            
                            
                        >
                            
                            {renderAllRecipes()}
                        </Carousel>
                       
                    </Card>
                    <RecipeModal isOpen={openRecipeModal} img={recipeSelector.recipeModalImage} recipeTitle={recipeSelector.recipeModalName} description={recipeSelector.recipeModalRecipe} owner={recipeSelector.owner} ingredients={recipeSelector.recipeModalIngredients} onClose={closeRecipeModal} value={recipeSelector.recipeID}></RecipeModal>
                </Container>
            </div>
        </div>

    )
}

export default RecipesHome;
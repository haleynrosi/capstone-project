import React, { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Typeahead } from "react-bootstrap-typeahead";
import { Button, Form, Row, Card, Dropdown, DropdownButton, InputGroup, FormControl, Carousel } from "react-bootstrap";
import { selectClasses } from "@mui/material";
import RecipeModal from "./RecipeModal";
import recipeModal, { alterRecipe } from "../actions/recipeModal";



function BreakfastRecipes() {

    const recipeSelector = useSelector(state=> state.recipeModal.clickRecipeModal)
    const dispatch = useDispatch()


    const [imageIndex, setImageIndex] = useState(0)
    const [searchBreakfastOption, setSearchBreakfastOption] = useState('Search by');
    const [recipes, setRecipes] = useState([]); // all the breakfast recipes are stored here
    const [recipesWithImages, setRecipeswithImages] = useState([]);
    const [searchResults, setSearchResults] = useState({
        recipeName: '',
        recipeImg: null,
        recipeInfo: ''
    });

   const [openRecipeModal, setOpenRecipeModal] = useState(false)

   const handleRecipeClick = (recipe) => {
    dispatch(alterRecipe({
        recipeModalName: recipe.recipeName,
        recipeModalImage: recipe.image,
        recipeModalRecipe: recipe.description,
        recipeID: recipe.recipeId
    }));
    setOpenRecipeModal(true);
   }


   const closeRecipeModal = () =>{
    setOpenRecipeModal(false)
   }



    const typeaheadRef = useRef(null);

    const handleImgChange = (selectedImgIndex, e) => {
        setImageIndex(selectedImgIndex)
    }

    const searchOptionDropdown = (searchOption) => {
        setSearchBreakfastOption(searchOption)
    }



    const searchBreakfastRecipes = (selectedOption) => {
    
            if (selectedOption) {
                setSearchResults({
                    recipeName: selectedOption.recipeName,
                    recipeInfo: selectedOption.description,
                    recipeImg: selectedOption.image
                })
            }
    
        console.log(searchResults)
    }



    // const searchBreakfastIngredients = (selectedOption) => {
    //     for(let recipe in recipes)
    //     axios.get(`http://34.210.179.63:8008/RecipeIngredients/ingredient/${selectedOption.recipe_id}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'api-key': 'DigtalCrafts'
    //         }
    //     })

    //         .then((response) => {
    //             console.log(response.data)
    //         }).catch(error =>
    //             console.log(error))
    // }

    useEffect(() => {
        axios.get("http://34.210.179.63:8008/Recipes/type/breakfast", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "api-key": "DigtalCrafts",
                }
            })
            .then((response) => {
                setRecipes(response.data); // Set the state to the data property of the response object
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const updatedRecipes = [];
            for (const recipe of recipes) {
                try {
                    const response = await axios.get(
                        `http://34.210.179.63:8008/Images/${recipe.imageName}`,
                        {
                            headers: {
                                "Content-Type": "text/html",
                                "Access-Control-Allow-Origin": "*",
                                "api-key": "DigtalCrafts",
                            },
                        }
                    );

                    // Update the recipe object with the image data
                    const updatedRecipe = {
                        ...recipe,
                        image: response.data,
                    };
                    updatedRecipes.push(updatedRecipe);
                } catch (error) {
                    console.log(error);
                }
            }

            // Set the state with the updated copy of the recipes array
            setRecipeswithImages(updatedRecipes);
            console.log(recipesWithImages)
        };
        fetchImages();

    }, [recipes]);




    return (
        <div style={{ display: "flex",  flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row" style={{display: "flex",
                                                justifyContent:'center', 
                                                width:650, 
                                                margin:15
                                                }}>
            <h2 style={{
                    marginTop:25,
                    fontSize:55,
                    color:'rgb(188, 143, 143)', 
                    textAlign: 'center'
            }}>
            Breakfast
        </h2>
                <div className="d-flex row" style={{display: "flex",
                                                justifyContent:'center',
                                                flexDirection:'column',
                                                alignSelf:"center",
                                                textAlign:'center', 
                                                margin:15
                                                }}>
                    <h2 style={{
                    marginTop:25,
                    fontSize:35,
                    color:'rgb(60,60,60)', 
                    textAlign: 'center'
            }}>
                Search Breakfast Recipes
                </h2>
                    <InputGroup>
                        <Typeahead
                            id='recipe-list'
                            labelKey='recipeName'
                            options={recipesWithImages}
                            placeholder={searchBreakfastOption}
                            ref={typeaheadRef}
                            filterBy={['recipeName']}
                            onChange={(selected) => {
                                
                                console.log(selected[0])
                                if(searchBreakfastOption === 'Search Recipe'){
                                    searchBreakfastRecipes(selected[0]);
                                } 
                                
                                
                                
                                // else if(placeholder === 'Search Ingredients'){
                                //     searchBreakfastIngredients(selected[0])
                                // }

                            }}
                        />
                        <DropdownButton title={searchBreakfastOption} variant="outline-dark" as={InputGroup.Append}>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Search Recipe') }}>
                                Recipe
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Search Ingredients') }}>
                                Ingredients
                            </Dropdown.Item>
                        </DropdownButton>

                    </InputGroup>

                    <Card className="breakfastRecipeDiv" style={{ margin: 20, border: 'none' }}>
                        <Card.Title style={{ textAlign: 'center' }}>{searchResults.recipeName}</Card.Title>
                        {/* <Card.Img style={{ display: 'none' }}></Card.Img> */}
                    </Card>

                </div>
                <Card className="d-flex col " style={{ margin: 'auto',
                                                        height:400,
                                                       borderWidth:3,
                                                       maxWidth:525,
                                                       borderColor:'rgb(188,143,143)',
                                                       padding:20,
                                                       textAlign:'center',
                                                       color:'rgb(60,60,60)'
                                                       }}>
                    <Card.Title>Popular Breakfast Recipes</Card.Title>
                    <Card.Body>
                        <Carousel style={{maxWidth:525}} activeIndex={imageIndex} onSelect={handleImgChange}>
                            {recipesWithImages.map((recipe, i) => (
                                <Carousel.Item key={i}>
                                    <img style={{borderRadius:10, 
                                                 minWidth: 250, 
                                                 maxWidth: 500,
                                                 minHeight: 250, 
                                                 maxHeight: 250, 
                                                  width: 'auto', 
                                                  height: 'auto', 
                                                  objectFit: 'cover' }}
                                        className="w-100 p-50"
                                        src={recipe.image}
                                        alt={recipe.recipeName}
                                        onClick={() => {
                                            console.log(recipe)
                                            handleRecipeClick(recipe)
                                            
                                        }}
                                    />
                                     <RecipeModal isOpen ={openRecipeModal} img={recipeSelector.recipeModalImage} recipeTitle={recipeSelector.recipeModalName} description={recipeSelector.recipeModalRecipe} onClose={closeRecipeModal} value={recipeSelector.recipeID}></RecipeModal>
                                    <Carousel.Caption>
                                        <h5>{recipe.recipeName}</h5>
                                    </Carousel.Caption>
                                    
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Card.Body>
                </Card>

             

            </div>

        </div>
    )
}

export default BreakfastRecipes;












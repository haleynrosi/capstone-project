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
import { ingredientListSelector, setIngredientList } from "../actions/IngredientsSlice"



function LunchRecipes() {

    const ingredientList = useSelector(ingredientListSelector)
    const recipeSelector = useSelector(state => state.recipeModal.clickRecipeModal)
    const dispatch = useDispatch()


    const [imageIndex, setImageIndex] = useState(0)
    const [searchLunchOption, setSearchLunchOption] = useState('Search by');
    const [recipes, setRecipes] = useState([]); // all the breakfast recipes are stored here
    const [recipesWithImages, setRecipeswithImages] = useState([]);
    const [searchResults, setSearchResults] = useState([
        {
            recipeName: '',
            recipeImg: null,
            recipeInfo: ''
        }
    ]);


    const [openRecipeModal, setOpenRecipeModal] = useState(false)

    useState(() => {
        axios.get(`http://34.210.179.63:8008/Ingredients`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'api-key': 'DigtalCrafts'
            }
        })

            .then((res) => {
                dispatch(setIngredientList(res.data))
            })
    }, [])

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


    const typeaheadRef = useRef(null);

    const handleImgChange = (selectedImgIndex, e) => {
        setImageIndex(selectedImgIndex)
    }

    const searchOptionDropdown = (searchOption) => {
        typeaheadRef.current.clear();
        setSearchLunchOption(searchOption)
    }



    const searchLunchRecipes = (selectedOption) => {

        if (selectedOption) {
            setSearchResults([{
                recipeName: selectedOption.recipeName,
                recipeInfo: selectedOption.description,
                recipeImg: selectedOption.image
            }])
        }

        console.log(searchResults)
    }



    const searchLunchIngredients = (selectedOption) => {
        console.log(selectedOption.ingredientId)

        axios.get(`http://34.210.179.63:8008/RecipeIngredients/ingredient/${selectedOption.ingredientId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'api-key': 'DigtalCrafts'
            }
        })
            .then((res) => {
                console.log(res.data)
                const searchResultsWithImages = res.data
                .filter(result => result.recipeType === 'lunch')
                .map(result => {
                    const recipeWithImage = recipesWithImages.find(recipe => recipe.recipeName === result.recipeName)
                    return {
                        recipeName: result.recipeName,
                         recipeImg: recipeWithImage.image
                    }
                })
                setSearchResults(searchResultsWithImages)
                console.log(searchResults)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get("http://34.210.179.63:8008/Recipes/type/lunch", {
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
        if(recipes.length != 0) {
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
        }
    }, [recipes]);




    return (
        <div style={{ display: "flex", height: '100%', flexDirection: 'row' }}>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="d-flex row" style={{
                    display: "flex",
                    justifyContent: 'center',
                    width: '75%',
                }}>
                    <h2 style={{
                        marginTop: 25,
                        fontSize: 50,
                        color: 'rgb(188, 143, 143)',
                        textAlign: 'center'
                    }}>
                        Lunch
                    </h2>
                    <div className="d-flex row" style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignSelf: "center",
                        textAlign: 'center'
                    }}>
                        <h2 style={{
                            marginTop: 20,
                            fontSize: 30,
                            color: 'rgb(60,60,60)',
                            textAlign: 'center'
                        }}>
                            Search Lunch Recipes
                        </h2>
                        <InputGroup>
                            <Typeahead
                                id='recipe-list'
                                labelKey={searchLunchOption === 'Search Recipe' ? 'recipeName' : 'ingredientName'}
                                options={searchLunchOption === 'Search Recipe' ? recipesWithImages : ingredientList}
                                placeholder={searchLunchOption}
                                ref={typeaheadRef}
                                filterBy={['recipeName']}
                                onChange={(selected) => {

                                    if (selected[0]) {
                                        console.log(selected[0])
                                        if (searchLunchOption === 'Search Recipe') {
                                            searchLunchRecipes(selected[0]);
                                        }
                                        else if (searchLunchOption === 'Search Ingredients') {
                                            searchLunchIngredients(selected[0])
                                            console.log('we got a live one')
                                        }
                                    }

                                }}
                            />
                            <DropdownButton title={searchLunchOption} variant="outline-dark" as={InputGroup.Append}>
                                <Dropdown.Item onClick={() => { searchOptionDropdown('Search Recipe') }}>
                                    Recipe
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => { searchOptionDropdown('Search Ingredients') }}>
                                    Ingredients
                                </Dropdown.Item>
                            </DropdownButton>

                        </InputGroup>




                        {searchResults.map((recipe, i) => (
                            <Card className="breakfastRecipeDiv" style={{ margin: 20, border: 'none' }}>
                                <Card.Title style={{ textAlign: 'center' }}>{recipe.recipeName}</Card.Title>
                                <Card.Img style={{
                                    border: 'none',
                                    maxWidth: '30%',
                                    maxHeight: '10%',
                                    objectFit: 'cover'
                                }}
                                    src={recipe.recipeImg}></Card.Img>
                            </Card>
                        ))}


                    </div>
                    <Card className="d-flex col " style={{
                        margin: 'auto',
                        maxHeight:'40%',
                        borderWidth: 3,
                        maxWidth: '75%',
                        borderColor: 'rgb(188,143,143)',
                        padding: 20,
                        textAlign: 'center',
                        color: 'rgb(60,60,60)'
                    }}>
                        <Card.Title>Popular Lunch Recipes</Card.Title>
                        <Card.Body>
                            <Carousel style={{ maxWidth: 525 }} activeIndex={imageIndex} onSelect={handleImgChange}>
                                {recipesWithImages.map((recipe, i) => (
                                    <Carousel.Item key={i}>
                                        <img style={{
                                            borderRadius: 10,
                                            minWidth: 500,
                                            maxHeight: 200,
                                            width: 'auto',
                                            height: 'auto',
                                            objectFit: 'cover'
                                        }}
                                            className="w-100 p-50"
                                            src={recipe.image}
                                            alt={recipe.recipeName}
                                            onClick={() => {
                                                console.log(recipe)
                                                handleRecipeClick(recipe)

                                            }}
                                        />
                                        <RecipeModal isOpen={openRecipeModal} img={recipeSelector.recipeModalImage} recipeTitle={recipeSelector.recipeModalName} description={recipeSelector.recipeModalRecipe} owner={recipeSelector.owner} ingredients={recipeSelector.recipeModalIngredients} onClose={closeRecipeModal} value={recipeSelector.recipeID}></RecipeModal>
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

        </div>
    )
}

export default LunchRecipes;
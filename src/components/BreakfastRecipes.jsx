import React, {useEffect, useRef}from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useState } from "react";
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {Typeahead} from "react-bootstrap-typeahead";
import { Button, Form, Row, Card, Dropdown, DropdownButton, InputGroup, FormControl, Carousel } from "react-bootstrap";
import { selectClasses } from "@mui/material";



function BreakfastRecipes() {

    const [imageIndex, setImageIndex] = useState(0)
    const [searchBreakfastOption, setSearchBreakfastOption] = useState('Search by');
    const [recipes, setRecipes] = useState([]); // all the breakfast recipes are stored here
   

  



    const typeaheadRef = useRef(null);

    const handleImgChange = (selectedImgIndex, e) => {
        setImageIndex(selectedImgIndex)
    }

    const searchOptionDropdown = (searchOption) => {
        setSearchBreakfastOption(searchOption)
    }

    const searchBreakfastRecipes = (selectedOption) => {
       
       console.log(selectedOption)
    
       
    }

  
useEffect(()=>{
    axios.get(`http://34.210.179.63:8008/Recipes/type/breakfast`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'api-key': 'DigtalCrafts'
        }
    }
    ).then((response) =>{
        // console.log(response.data)
        setRecipes(response.data)
        
      
    }).then(()=>{

    })
    .catch(error=>
        console.log(error))

}, []);
const updateRecipes = async () => {
    try {
      const updatedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          const response = await fetch(`http://34.210.179.63:8008/Images/${recipe.imageName}`,{
            headers: {
                'Accept': 'image/*',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'api-key': 'DigtalCrafts'
            }
          });
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          return { ...recipe, image: imageUrl };
        })
      );
      setRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };
    
  useEffect(() => {
    updateRecipes();
  }, []);
  

 

    const searchRecipeByIngredient =  () => {
        axios.get(`http://34.210.179.63:8008/Ingredients/name/`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'api-key': 'DigtalCrafts'
            }
        })
            .then((data) => {
                searchRecipeByIngredientID(data.ingredientId)
            }).catch(error=>
                console.log(error))
    }



    const searchRecipeByIngredientID =  (ingredientID) => {
        axios.get(`http://34.210.179.63:8008/RecipeIngredients/ingredient/${ingredientID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'api-key': 'DigtalCrafts'
            }
        })
        
            .then((data) => {
                console.log(data)
            }).catch(error=>
                console.log(error))
    }



 







    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row">
                <div className="d-flex row" style={{ padding: 30 }}>
                    <InputGroup style={{ margin: 20 }}>
                        <Typeahead
                            id='recipe-list'
                            labelKey = 'recipeName'
                            options= {recipes}
                            placeholder = {searchBreakfastOption}
                            ref = {typeaheadRef}
                            filterBy ={['recipeName']}
                            onChange={(selected)=> {
                                searchBreakfastRecipes(selected[0]);
                                
                            }}
                        />
                        <DropdownButton title={searchBreakfastOption} variant="outline-dark" as={InputGroup.Append}>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Enter Recipe Name') }}>
                                Recipe Name
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Enter Ingredient Name') }}>
                                Ingredient Name
                            </Dropdown.Item>
                        </DropdownButton>
                      
                    </InputGroup>

                    <Card className="breakfastRecipeDiv" style={{ margin: 20, border: 'none' }}>
                        <Card.Title style={{ textAlign: 'center' }}></Card.Title>
                        <Card.Img style={{ display: 'none' }}></Card.Img>
                    </Card>

                </div>
                <Card className="d-flex col " style={{ margin: 'auto', maxWidth:450 }}>
                    <Card.Title>Popular Breakfast Recipes</Card.Title>
                    <Card.Body>
                        <Carousel activeIndex={imageIndex} onSelect={handleImgChange}>
                            {recipes.map((recipe, i) => (
                                <Carousel.Item key={i}>
                                    <img style={{maxWidth: 400}}
                                        className="w-100 p-50"
                                        src={recipe.image}
                                        alt={recipe.recipeName}
                                        onClick={() => {
                                            // TODO: Implement opening the modal with the image, title, and description
                                        }}
                                    />
                                    <Carousel.Caption>
                                        <h5>{recipe.recipeName}</h5>
                                        <p>{recipe.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )) }
                        </Carousel>
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default BreakfastRecipes;
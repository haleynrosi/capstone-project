import React, {useEffect, useRef}from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useState } from "react";
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {Typeahead} from "react-bootstrap-typeahead";
import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup, FormControl, Carousel } from "react-bootstrap";
import { selectClasses } from "@mui/material";
import RecipeModal from "./RecipeModal";



function BreakfastRecipes() {

    const [imageIndex, setImageIndex] = useState(0)//sets index of each response recieved and put on the Carousel
    const [recipeModalOpen, setRecipeModalOpen] = useState(false) //sets the state of the modal that appears when a recipe is clicked
    const [searchBreakfastOption, setSearchBreakfastOption] = useState('Search by');//sets search by ingredient or recipe name
    const [recipes, setRecipes] = useState([]); // sets all the breakfast recipes to recipes - all are stored here
    const [searchResults, setSearchResults] = useState({ //sets the state for the specific searched recipe 
        recipeName: '',
        recipeImage: null,
        recipeInfo: ''
    })

    //opens the recipe modal when you click on a picture in the carousel
    const openRecipeModal = () => {
        setRecipeModalOpen(true)
    }

    //these two are for the typeahead and the dropdown search function
    const typeaheadRef = useRef(null);
    const searchOptionDropdown = (searchOption) => {
        setSearchBreakfastOption(searchOption)
    }


    //this function sets the search results state and allows for the recipe card with the name and img to appear - when you click the card the modal will access the info as well
    const searchBreakfastRecipes = (selectedOption) => {
        if(selectedOption){
            setSearchResults({
                recipeName:selectedOption.recipeName,
                recipeImage: selectedOption.imageName,
                recipeInfo: selectedOption.description

               }
            )
        }
      
       console.log(selectedOption)
    
       
    }
    ).then((response) =>{
        console.log(response.data)
        setRecipes(response.data)
        
      
    }).then(()=>{

//gets all the breakfast recipes and sets recipes to the data
useEffect(()=>{
    axios.get(`http://34.210.179.63:8008/Recipes/type/breakfast`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'api-key': 'DigtalCrafts'
        }
    }
    ).then((response) =>{
        console.log(response.data)
        setRecipes(response.data)
        
      
    }).then(()=>{

    })
    .catch(error=>
        console.log(error))

}, [])
  
//gets the image based on the imageName stored in recipes and adds it to original json
useEffect(()=>{
    recipes.forEach((recipe)=>{
      fetch(`http://34.210.179.63:8008/Images/${recipe.imageName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'api-key': 'DigtalCrafts'
        }
      })
      .then((response)=>{
        setRecipes(response.data)
      })
      .then(response => response.blob())
      .then(blob => {
        recipe.image = URL.createObjectURL(blob);
      })
      .catch(error=>{
        console.log(error)
      })
      ;
    });
  }, []);
            
    
  

 
//searches by ingredient to get the ingredient Id and associate that with the corresponding recipes
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



 

    //this is the index change handling function for the carousel - it set the index for the next image in the carousel
    const handleImgChange = (selectedImgIndex, e) => {
        setImageIndex(selectedImgIndex)
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

                    <Card className="breakfastRecipeDiv" style={{  margin: 20, border: 'none' }}>
                        <Card.Title style={{ textAlign: 'center' }}>{searchResults.recipeName}</Card.Title>
                        <Row>
                            <Col>
                            <Card.Img style={{ display: 'none' }} src={searchResults.recipeImage}></Card.Img>
                            </Col>
                            <Col>
                            <Card.Body style={{fontSize:15}}>{searchResults.recipeInfo}</Card.Body>
                            </Col>
                        </Row>
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
                                        onClick={openRecipeModal}
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
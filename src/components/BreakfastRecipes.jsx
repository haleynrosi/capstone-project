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
    const [recipesWithImages, setRecipeswithImages] = useState([]);
   

  



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

  
    useEffect(() => {
        axios
          .get("http://34.210.179.63:8008/Recipes/type/breakfast", {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "api-key": "DigtalCrafts",
            },
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




// const updateRecipes = async () => {
//     try {
//       const updatedRecipes = await Promise.all(
//         recipes.map(async (recipe) => {
//           const imageUrl = await 
//           return { ...recipe, image: imageUrl };

//         })
//       );
//       setRecipes(updatedRecipes);
//     } catch (error) {
//       console.log(error);
//     }
//   };







  
//   useEffect(() => {
//     updateRecipes();
//   }, []);
  

 

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
                    color:'rgb(188, 143, 143)', 
                    textAlign: 'center'
            }}>
                Search Breakfast Recipes
                </h2>
                    <InputGroup>
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












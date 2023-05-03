//react libraries
import React, { useRef, useState, useEffect } from "react";
import { Modal, Typography, Box} from "@mui/material";
import { Form, Button } from "react-bootstrap"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import  Dropzone from './Dropzone'
import { setSelectedFile } from '../actions/dropzoneSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


//reducer imports
import { closeSRModal, selectIsModalOpen, handleMessage, handleAddRecipe } from '../actions/SubmitRecipeModalSlice';
import { setIngredientList, resetSelectedIngredients, setSelectedIngredients, deleteSelectedIngredient } from '../actions/IngredientsSlice';





// submit recipe modal form
function SubmitRecipe(){ 
      //modal state
    const isOpen = useSelector(selectIsModalOpen);
    const dispatch = useDispatch();
 
            
    //form data selectors
    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const selectedFile = useSelector((state => state.dropzone.selectedFile));
    //ingredient selectors
    const ingredientList = useSelector(state => state.ingredientList);
    const selectedIngredients = useSelector(state => state.selectedIngredients);
    

    const handleCloseModal = (event) => {  

      setRecipe({
        recipeName: "",
        recipeType:"",
        ingredients:[],
        description:"",
      });
      dispatch(resetSelectedIngredients());
      dispatch(closeSRModal());
    }

    const modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderColor: 'white',
        borderRadius: '20px',
        boxShadow: 15,
        p: 4,
    };

    
    const [recipe, setRecipe] = useState({
        recipeName: "",
        recipeType:"",
        ingredients:[],
        description:""
    
    });

    const handleRecipeChange = (event) => {
        const { name, value } = event.target;
   
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          [name]: value
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        axios.post("http://34.210.179.63:8008/Recipes", {
          recipeName: recipe.recipeName,
          recipeType: recipe.recipeType,
          ingredientList: recipe.ingredients,
          description: recipe.description,
          owner: loginSelector.userID,
          imageName: selectedFile
        }, {
          headers: {
            "Content-Type": "application/json",
            "api-key": "DigtalCrafts"
          }
        })
          .then((req) => {
            dispatch(handleAddRecipe(req.body));
            // reset the form and display success message
            setRecipe({
              recipeName: "",
              recipeType: "",
              ingredients: [],
              description: "",
            });

            dispatch(handleMessage("Your recipe posted successfully!"));
            
            handleCloseModal();

          }).catch((err) => {
            console.error(err);
            dispatch(handleMessage("Please fill in all required fields"));
          })
      };
    
    //API call for ingredientList
    useEffect(()=> {
        axios.get('http://34.210.179.63:8008/Ingredients', {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'DigtalCrafts'
          }
        })
        .then(response => {
          
          dispatch(setIngredientList(response.data));
        })
        .catch(err => console.error(err));
      },[]);


    //ingredient form useRef
    const typeaheadRef = useRef(null);

    // onChange handler to check if selected ingredient exists in selected ingredients, if not, add it to the state `using '...' to add to array`
    const handleIngredientSelect = (selected) => {
        const ingredientExists = selectedIngredients.find(
        (ingredient) => ingredient.ingredientId === selected[0].ingredientId);
        if (!ingredientExists) {
        dispatch(setSelectedIngredients(selected));
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, selected[0].ingredientId]
        }));
        }
        typeaheadRef.current.clear(); // Clear the input field
    };
        

    // onClick handler to check if ingredientId exists in selected ingredients, then if it does, removes it from the selectedIngredients state
    const handleIngredientDelete = (ingredientId) => {
        const ingredientToDelete = selectedIngredients.find(
            (ingredient) => ingredient.ingredientId === ingredientId
        );
        if (ingredientToDelete) {
          dispatch(deleteSelectedIngredient(ingredientToDelete));
        }
      };
      return (
        <>
          <Modal
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Post a Recipe:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Form className="submitForm">
                  <Form.Group>
                    <Form.Label><span style={{ color: "gray" }}>*</span> Recipe Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter recipe name"
                      name="recipeName"
                      value={recipe.recipeName}
                      onChange={handleRecipeChange}
                      required
                    />
                  </Form.Group>
      
                  <Form.Group>
                    <Form.Label><span style={{ color: "gray" }}>*</span> Recipe Type:</Form.Label>
                    <Form.Control
                      as="select"
                      name="recipeType"
                      value={recipe.recipeType}
                      onChange={handleRecipeChange}
                      required
                    >
                      <option style={{ opacity: '0.1' }} value="" disabled selected>
                        Select one
                      </option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </Form.Control>
                  </Form.Group>
      
                  <Form.Group>
                    <Form.Label></Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label><span style={{ color: "gray" }}>*</span> Ingredient List:</Form.Label>
                    <Typeahead
                      id="ingredient-list"
                      labelKey="ingredientName"
                      options={ingredientList}
                      placeholder="Enter ingredients"
                      onChange={handleIngredientSelect}
                      ref={typeaheadRef}
                    />
                    <div style={{ marginTop: 20 }}>
                      {selectedIngredients.map((ingredient) => (
                        <span
                          key={ingredient.ingredientId}
                          className="badge badge-primary"
                          style={{ marginRight: 5, color: 'black' }}
                        >
                          {ingredient.ingredientName}
                          <HighlightOffIcon
                            className="ms-1"
                            onClick={() =>
                              handleIngredientDelete(ingredient.ingredientId)
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </Form.Group>
      
                  <Form.Group>
                    <Form.Label>Recipe Instructions:</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: '200px', '--placeholder-opacity': '0.5' }}
                      placeholder="Enter instructions chronologically, including accurate measurements, timestamps, and supplies"
                      rows={3}
                      name="description"
                      value={recipe.description}
                      onChange={handleRecipeChange}
                      required
                    />
                  </Form.Group>
      
                  <Form.Group>
                   <Dropzone />
                  </Form.Group>
                  <br></br>
                  <Form.Group className ='recipeSubmitBtns'>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: 'white',
                        color: '#CD5C5C',
                        borderColor: `#CD5C5C`,
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleCloseModal}
                      style={{ backgroundColor: '#CD5C5C', borderColor: `#CD5C5C` }}
                    >
                      <HighlightOffIcon />
                    </Button>
                  </Form.Group>
                </Form>
                
              </Typography>
            </Box>
          </Modal>
          
        </>   
      );
}

export default SubmitRecipe;
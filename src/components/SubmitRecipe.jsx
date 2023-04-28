//react libraries
import React, { useRef, useState, useEffect } from "react";
import { Modal, Typography, Box} from "@mui/material";
import { Form, Button } from "react-bootstrap"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import  Dropzone from './Dropzone'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

//reducer imports
import { closeSRModal, selectIsModalOpen } from '../actions/SubmitRecipeModalSlice';
import { setIngredientList, setSelectedIngredients, deleteSelectedIngredient } from '../actions/IngredientsSlice';



// submit recipe modal form
function SubmitRecipe(){

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

    //modal state
    const isOpen = useSelector(selectIsModalOpen);
    const dispatch = useDispatch();
    
    const handleCloseModal = () => {
        dispatch(closeSRModal());
    }

    //ingredient selectors
    const ingredientList = useSelector(state => state.ingredientList);
    const selectedIngredients = useSelector(state => state.selectedIngredients);

    //API call for ingredientList
    useEffect(()=> {
        axios.get('http://34.210.179.63:8008/Ingredients', {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'DigtalCrafts'
          }
        })
        .then(response => {
          console.log(response.data);
          dispatch(setIngredientList(response.data));
        })
        .catch(err => console.error(err));
      },[]);

    //ingredient form useRef
    const typeaheadRef = useRef(null);

    // onChange handler to check if selected ingredient exists in selected ingredients, if not, add it to the state `using '...' to add to array`
    const handleIngredientSelect = (selected) => {
        const ingredientExists = selectedIngredients.find(
            (ingredient) => ingredient.ingredientId === selected[0].ingredientId
        );
        if (!ingredientExists) {
            dispatch(setSelectedIngredients(selected));
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

    //   function postRecipe () {
    //     useEffect(()=> {
    //         axios.post('http://34.210.179.63:8008/Recipes', {
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: {

    //           }
    //         })
    //         .then(response => {
    //           console.log(response.data);
    //           dispatch(setIngredientList(response.data));
    //         })
    //         .catch(err => console.error(err));
    //       },[]);

    //   }
    return(
        <>

        <Modal
            open={isOpen}
            onClose={handleCloseModal} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalstyle} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Post a Recipe: 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Recipe Name:</Form.Label>
                            <Form.Control type="text" placeholder="Name your recipe" style={{'--placeholder-opacity': '0.1'}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Recipe Type:</Form.Label>
                            <Form.Control as="select" defaultValue="">
                                <option  style={{opacity: '0.1' }}value="" disabled selected>Select one</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label></Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ingredient List:</Form.Label>
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
                                <span key={ingredient.ingredientId} className="badge badge-primary" style={{ marginRight: 5, color: 'black' }}>
                                    {ingredient.ingredientName}
                                    <button style={{border:'none',backgroundColor:'white'}} type="button" className="close"  onClick={() => handleIngredientDelete(ingredient.ingredientId)}><HighlightOffIcon style={{color:'gray'}} fontSize="small"/> </button>
                                </span>
                                ))}
                            </div>
                            </Form.Group>
                        <Form.Group>
                            <Form.Label>Recipe Instructions:</Form.Label>
                            <Form.Control style={{ height: '200px','--placeholder-opacity': '0.5'}} as="textarea" placeholder="Enter instructions chronologically (include accurate measurements, timestamps, and supplies...)" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Upload Image:</Form.Label>
                            <Dropzone/>
                        </Form.Group>
                        <br></br>
                        <Button style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C" }} >Submit</Button>
                    </Form>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}

export default SubmitRecipe;
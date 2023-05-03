import React, { useEffect } from "react";
import axios from "axios";
import '../App.css'
import { Modal, Box, Typography } from "@mui/material";
import { Card, Form, Button } from 'react-bootstrap';
import { useState } from "react";
import { useSelector } from "react-redux";
import {CancelPresentation, FavoriteBorder, Favorite} from '@mui/icons-material';



function RecipeModal(props) {

    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const recipeSelector = useSelector(state=> state.recipeModal.clickRecipeModal)
    const idForModal = loginSelector.userID;
    const recipeForModal = recipeSelector.recipeID

    const [isLiked, setIsLiked] = useState(false)

   


    const isRecipeFavorite = () =>{
        axios.put(`http://34.210.179.63:8008/Favorites/user/${idForModal}/recipe/${recipeForModal}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "api-key": "DigtalCrafts",
            }
        }).then((response)=>{
            console.log(response)
            setIsLiked(true)
        }).catch(error=>{
            console.log(error)
        })
    }

    const deleteRecipeFavorite = ()=>{
        axios.delete(`http://34.210.179.63:8008/Favorites/user/${idForModal}/recipe/${recipeForModal}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "api-key": "DigtalCrafts",
            }
        }).then((response)=>{
            console.log(response)
            setIsLiked(false)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box >
                <Typography id="modal-modal-description" >
                    <Card style={{maxHeight:'50%', maxWidth: '50%', flexDirection: 'column'}}>
                        
                            <Card.Title>{props.recipeTitle}</Card.Title>
                            <Card.Img style={{maxWidth:'30%'}} src={props.img}></Card.Img>
                            <Card.Body>{props.description}</Card.Body>
                        
                        {isLiked?
                            <Card.Link href="#" onClick={(e)=>{
                                isRecipeFavorite()
                            }}>
                                <FavoriteBorder/>
                            </Card.Link>
                            :
                            <Card.Link href="#" onClick={(e)=>{
                                deleteRecipeFavorite()
                            }}>
                                <Favorite/>
                            </Card.Link>

                        }
                            
                        
                        <Button style={{backgroundColor: 'white', border:'none'}} onClick={props.onClose}><CancelPresentation style={{color:'black'}}/></Button>
                    </Card>
                </Typography>
            </Box>
        </Modal>
    )
}

export default RecipeModal;
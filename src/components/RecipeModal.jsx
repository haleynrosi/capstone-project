import React, { useEffect } from "react";
import axios from "axios";
import '../App.css'
import { Modal, Box, Typography } from "@mui/material";
import { Card, Form, Button , Row} from 'react-bootstrap';
import { useState } from "react";
import { useSelector } from "react-redux";
import {CancelPresentation, FavoriteBorder, Favorite} from '@mui/icons-material';



function RecipeModal(props) {

    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const recipeSelector = useSelector(state=> state.recipeModal.clickRecipeModal)
    const idForModal = loginSelector.userID;
    const recipeForModal = recipeSelector.recipeID
    const favoritePutUrl = `http://34.210.179.63:8008/Favorites/user/${idForModal}/recipe/${recipeForModal}`; 
    const favoritesByUserGet = `http://34.210.179.63:8008/Favorites/user/${idForModal}`;

    const [isLiked, setIsLiked] = useState(false)
    const [userFavs, setUserFavs] = useState([])
    const recipeFavorites = {favorites:[recipeForModal]};

 


    useEffect(() => {
        if (loginSelector.loggedIn) {
          axios.get(favoritesByUserGet, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          })
            .then((response) => {
              setUserFavs(response.data)
              for (let favorite of response.data) {
                if (favorite.recipeId === recipeForModal) {
                  setIsLiked(true)
                  break;
                } else {
                  setIsLiked(false)
                }
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }, [loginSelector.loggedIn, recipeForModal])




      


    const isRecipeFavorite = async () => {

        try {
          const response = await axios.put(favoritePutUrl, recipeFavorites , {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          });
      
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }

    const handleRemoveFavorite = async () =>{
        try {
            axios.delete(favoritePutUrl, {
                headers: {'api-key':'DigtalCrafts'}
        
            })
        }
        catch (error) {
            console.log(error)
        }
    
    }
 
   

    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex', justifyContent:'center', alignItems:'center'}}
            
        >
            <Box style={{  padding:20, backgroundColor:'white', margin:15, overflowY:'scroll',  display:'flex', maxHeight:'50%', maxWidth: '50%'}}>
                <Typography id="modal-modal-description" >
                    <Card style={{ display:'flex', flexDirection: 'column', padding: 10, border:'solid', borderColor: `RGB(196, 137, 137)`, borderWidth:10}}>
                           
            
                          
                            <Card.Title style={{textAlign: 'center', padding:10, color: `RGB(196, 137, 137)`, fontSize:30, marginBottom:20}} >{props.recipeTitle}</Card.Title>
                            <Row>
                           
                            <Card.Body style={{ display:'flex', flexFlow: 'row wrap', justifyContent:'center',alignItems:'center', columnGap:'5vw', rowGap:'5vw' }}>
                                <Card.Img style={{maxWidth:'50%'}} src={props.img}></Card.Img>
                                <div className="recipeDetails" style ={{ display:'flex', flexDirection:'column',rowGap:'20px',justifyContent:'center', textAlign:'center' }}>
                                    <div>
                                        <p style={{ fontSize:'125%', color:'rgb(188,143,143)' }}>Crafted by</p>
                                        <div style={{fontSize:'145%'}}>{props.owner}</div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize:'125%', color:'rgb(188,143,143)' }}>Ingredients</p>
                                        {props.ingredients.map((ingredient, i)=>(
                                            <p key={i}>{ingredient.ingredientName}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p style={{ fontSize:'125%', color:'rgb(188,143,143)' }}>Description</p>
                                        {props.description}
                                    </div>
                                    
                                
                                </div>
                               
                            </Card.Body>
                            </Row>
                        
                            <div className="actions" style={{display:'flex',flexFlow:'row nowrap', columnGap:'35px',alignItems:'center',justifyContent:'center'}}>
                            <Card.Link  style={{color: `RGB(196, 137, 137)`}} onClick={(e)=>{
                                e.preventDefault();
                                if (isLiked) {
                                    handleRemoveFavorite();
                                }else{
                                    isRecipeFavorite();
                                }
                                setIsLiked(!isLiked)
                                
                            }}>
                                {isLiked? <Favorite style={{fontSize:'40px',cursor:'pointer',color:`RGB(196, 137, 137)`}}/> : <FavoriteBorder style={{fontSize:'40px',cursor:'pointer',color:`RGB(196, 137, 137)`}}/>}
                                </Card.Link>
                        <Button style={{ backgroundColor: 'white', border:'none'}} onClick={props.onClose}><CancelPresentation style={{fontSize:'40px',color:`RGB(196, 137, 137)`}}/></Button>
                        </div>
                    </Card>
                    <br></br>
                </Typography>
            </Box>
        </Modal>
    )
}

export default RecipeModal;
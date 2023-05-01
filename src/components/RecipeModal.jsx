import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";


function RecipeModal(props) {

    const { img, recipeTitle, description, isOpen, onClose } = props;
    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const idForModal = loginSelector.userID;


    if (!isOpen) {
        return null;
    }

    return (
        <Modal

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Account Creation:
                </Typography>
                <Typography id="modal-modal-description" >
                    <div>
                        <h2>{recipeTitle}</h2>
                        <img src={img}></img>
                        <p>{description}</p>
                        <input type="radio" id="star3" name="rating" value="3" onChange={{}} />
                        <label htmlFor="star3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="yellow"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star"
                                style={{ width: '1em', height: '1em' }}
                            >
                                <polygon
                                    points="12 2 15.09 8.15 22 9.27 17 14.51 18.18 21.01 12 17.77 5.82 21.01 7 14.51 2 9.27 8.91 8.15 12 2"
                                ></polygon>
                            </svg>
                        </label>
                        <button onClick={onClose}></button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
}

export default RecipeModal;
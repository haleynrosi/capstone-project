import React from "react";
import { Modal, Typography, Box} from "@mui/material";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeSRModal,openSRModal, selectIsModalOpen } from '../actions/SubmitRecipeModalSlice';


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

    const isOpen = useSelector(selectIsModalOpen);
    const dispatch = useDispatch();
    
    const handleCloseModal = () => {
        dispatch(closeSRModal());
    }
    
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
                    Submit a Recipe: 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Recipe Name:</Form.Label>
                            <Form.Control type="name" placeholder="Enter Recipe Name..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ingredient List:</Form.Label>
                            <Form.Control type="text" placeholder="Enter ingredients in a List Format with bullet points or numerically..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Recipe Instructions:</Form.Label>
                            <Form.Control type="text" placeholder="Enter instructions chronologically with accurate measurements, timestamps, and supplies..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Recipe Image:</Form.Label>
                            <Form.Control type="name" placeholder="Enter Recipe Name..." />
                        </Form.Group>
                        <bR></bR>
                        <Button style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C" }} >Submit</Button>
                    </Form>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}

export default SubmitRecipe;
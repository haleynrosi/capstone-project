import React, { useState } from 'react';
import { Modal, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap'
import { closeSRModal, selectIsModalOpen, handleMessage, selectHandleMessage } from '../actions/SubmitRecipeModalSlice';



function SubmitMessage() {
    const [isClosed, setIsClosed] = useState(false);

    const dispatch = useDispatch();

    const handleClose = () => {
        setIsClosed(true);
        dispatch(handleMessage(""));
    };
    
    const modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderColor: 'white',
        borderRadius: '20px',
        boxShadow: 15,
        p: 4,
    };
    const message = useSelector(selectHandleMessage)
    let btnText="";

        if (message === "Your recipe posted successfully!"){
            btnText = "Got it!"
        }
        else if (message === "Please fill in all required fields"){
            btnText = "Go back"
        }


    return (
        <Modal open={!isClosed}>
            <Box sx={modalstyle}>
                <Typography>
                    <div>
                        <p>{useSelector(selectHandleMessage)}</p>
                        <Button
                            onClick={handleClose}
                            style={{ backgroundColor: '#CD5C5C', borderColor: `#CD5C5C` }}
                        >
                            {btnText}
                        </Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
}

export default SubmitMessage;
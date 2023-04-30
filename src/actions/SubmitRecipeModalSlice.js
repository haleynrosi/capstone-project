import { createSlice } from '@reduxjs/toolkit';

const submitRecipeModalSlice = createSlice({
    name:'submitRecipe',
    initialState: {
            message: "",
            isOpen: false,
            imageUploadTrigger: false
            
    },
    
    reducers: {
        openSRModal: (state) =>{
            state.isOpen = true;
        },
        closeSRModal: (state) =>{
            state.isOpen = false;
        },
        handleMessage: (state, action) =>{
            state.message = action.payload;
        }
    }
});

export const selectIsModalOpen = (state) => state.submitRecipe.isOpen;

export const selectHandleMessage = state => state.submitRecipe.message;

export const {   openSRModal,
                 closeSRModal, 
                 handleMessage, 
                 handleImageUpload, 
                 resetImageUpload } = submitRecipeModalSlice.actions;

export default submitRecipeModalSlice.reducer;
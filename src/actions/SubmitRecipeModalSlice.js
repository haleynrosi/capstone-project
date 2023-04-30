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
        },
        handleImageUpload:(state)=>{
            state.imageUploadTrigger = true;
        },
        resetImageUpload:(state)=>{
            state.imageUploadTrigger = false;
        }
    }
});

export const selectIsModalOpen = (state) => state.submitRecipe.isOpen;
export const selectHandleImageUpload = (state)=> state.submitRecipe.handleImageUpload

export const selectHandleMessage = state => state.submitRecipe.message;

export const {   openSRModal,
                 closeSRModal, 
                 handleMessage, 
                 handleImageUpload, 
                 resetImageUpload } = submitRecipeModalSlice.actions;

export default submitRecipeModalSlice.reducer;
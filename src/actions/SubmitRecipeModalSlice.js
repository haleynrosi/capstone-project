import { createSlice } from '@reduxjs/toolkit';

const submitRecipeModalSlice = createSlice({
    name:'submitRecipe',
    initialState: {
            message: "",
            isOpen: false,
            imageUploadTrigger: false,
            newRecipe:[]
            
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
        handleAddRecipe:(state, action) => {
            state.newRecipe = action.payload
        }
    }
});

export const selectIsModalOpen = (state) => state.submitRecipe.isOpen;

export const selectHandleMessage = (state) => state.submitRecipe.message;

export const selectHandleAddRecipe =(state) => state.submitRecipe.newRecipe

export const {   openSRModal,
                 closeSRModal, 
                 handleMessage, 
                handleAddRecipe
                  } = submitRecipeModalSlice.actions;

export default submitRecipeModalSlice.reducer;
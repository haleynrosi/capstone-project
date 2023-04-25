import { createSlice } from '@reduxjs/toolkit';

const submitRecipeModalSlice = createSlice({
    name:'submitRecipe',
    initialState: {
            isOpen: false
    },
    reducers: {
        openSRModal: (state) =>{
            state.isOpen = true;
        },
        closeSRModal: (state) =>{
            state.isOpen = false;
        }
    }
});

export const selectIsModalOpen = (state) => state.submitRecipe.isOpen;

export const { openSRModal, closeSRModal } = submitRecipeModalSlice.actions;

export default submitRecipeModalSlice.reducer;
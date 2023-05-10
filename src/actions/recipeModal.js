

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clickRecipeModal: {
    recipeModalName: '',
    recipeModalImage: null,
    recipeModalIngredients: [],
    recipeModalRecipe: '',
    recipeID: null
    }
 }

 export const recipeModal = createSlice({
    name: "RECIPEMODAL",
    initialState,
    reducers: {
        alterRecipe: (state, action)=> {
            state.clickRecipeModal.recipeModalName = action.payload.recipeModalName
            state.clickRecipeModal.recipeModalImage = action.payload.recipeModalImage
            state.clickRecipeModal.recipeModalIngredients = action.payload.recipeModalIngredients
            state.clickRecipeModal.recipeModalRecipe= action.payload.recipeModalRecipe
            state.clickRecipeModal.recipeID = action.payload.recipeID
            state.clickRecipeModal.owner = action.payload.owner
           
        }

    }

 })

 export const {alterRecipe} = recipeModal.actions;
 export const recipeModalSelector = (state) => state.recipeModal;
 
 
 export default recipeModal.reducer;
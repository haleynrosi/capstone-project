import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ALTERUSERReducer from "../actions/alterUser";
import RECIPEMODALReducer from '../actions/recipeModal'
import submitRecipeModalReducer from "../actions/SubmitRecipeModalSlice"
import ingredientListReducers from '../actions/IngredientsSlice'
import dropzoneReducer from '../actions/dropzoneSlice'

const reducer = combineReducers({
    alterUser:ALTERUSERReducer,

    submitRecipe: submitRecipeModalReducer,

    dropzone: dropzoneReducer,
    
    ingredientList: ingredientListReducers[0],
    selectedIngredients: ingredientListReducers[1],
    resetSelectedIngredients: ingredientListReducers[2],
    recipeModal: RECIPEMODALReducer
})

export const store = configureStore({
    reducer
})
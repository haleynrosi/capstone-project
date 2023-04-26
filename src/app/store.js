import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ALTERUSERReducer from "../actions/alterUser";
import submitRecipeModalReducer from "../actions/SubmitRecipeModalSlice"
import ingredientListReducers from '../actions/IngredientsSlice'

const reducer = combineReducers({
    alterUser:ALTERUSERReducer,

    submitRecipe: submitRecipeModalReducer,
    
    ingredientList: ingredientListReducers[0],
    selectedIngredients: ingredientListReducers[1]
})

export const store = configureStore({
    reducer
})
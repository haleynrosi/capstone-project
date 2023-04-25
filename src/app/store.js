import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ALTERUSERReducer from "../actions/alterUser";
import submitRecipeModalReducer from "../actions/SubmitRecipeModalSlice"

const reducer = combineReducers({
    alterUser:ALTERUSERReducer,
    submitRecipe: submitRecipeModalReducer
})

export const store = configureStore({
    reducer
})
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ALTERUSERReducer from "../actions/alterUser";

const reducer = combineReducers({
    alterUser:ALTERUSERReducer 
})

export const store = configureStore({
    reducer
})
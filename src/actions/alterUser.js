

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogin: {
    userID: null,
    loggedIn: false,
    username: null,
    firstName: null,
    lastName: null,
    email: null
    }
 }

 export const alterUser = createSlice({
    name: "ALTERUSER",
    initialState,
    reducers: {
        alterLogin: (state, action)=> {
            state.userLogin.userID = action.payload.userID
            state.userLogin.loggedIn = action.payload.loggedIn
            state.userLogin.username = action.payload.username;
            state.userLogin.email = action.payload.email;
            state.userLogin.firstName = action.payload.firstName;
            state.userLogin.lastName = action.payload.lastName;
        }, 
        resetLogin: (state) =>{
            state.userLogin.userID = null
            state.userLogin.loggedIn = false
            state.userLogin.username = null;
            state.userLogin.email = null;
            state.userLogin.firstName = null;
            state.userLogin.lastName = null;
        }

    }

 })

 export const {
    alterLogin, 
    resetLogin, 
    alterUsername, 
    resetUsername, 
    alterFirstName, 
    resetFirstName, 
    alterEmail, 
    resetEmail, 
    alterLastName, 
    resetLastName} = alterUser.actions;
 export const userLoginSelector = (state) => state.userLogin;
 export const usernameSelector = (state) => state.userLogin.username;
 export const emailSelector = (state) => state.userLogin.email;
 export const firstNameSelector = (state) => state.userLogin.firstName;
 export const lastNameSelector = (state) => state.userLogin.lastName;
 
 export default alterUser.reducer;


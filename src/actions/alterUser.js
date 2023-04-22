

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogin: {
    userID: null,
    loggedIn: false
    }
 }

 export const alterUser = createSlice({
    name: "ALTERUSER",
    initialState,
    reducers: {
        alterLogin: (state, action)=> {
            state.userLogin.userID = action.payload.userID
            state.userLogin.loggedIn = action.payload.loggedIn
        }, 
        resetLogin: (state) =>{
            state.userLogin.userID = null
            state.userLogin.loggedIn = false
        }
    }

 })

 export const {alterLogin, resetLogin} = alterUser.actions;
 export const userLoginSelector = (state) => state.userLogin 
 
 export default alterUser.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipeOfTheDay: {
    recipeOfTheDayName: '',
    recipeOfTheDayImage: null,
    recipeOfTheDayIngredients: [],
    recipeOfTheDayRecipe: '',
    recipeID: null
    }
 }

 export const recipeOfDay = createSlice({
    name: "RECIPEOFDAY",
    initialState,
    reducers: {
        alterRecipeOfDay: (state, action)=> {
            state.recipeOfTheDay.recipeOfTheDayName = action.payload.recipeOfTheDayName
            state.recipeOfTheDay.recipeOfTheDayImage = action.payload.recipeOfTheDayImage
            state.recipeOfTheDay.recipeOfTheDayIngredients = action.payload.recipeOfTheDayIngredients
            state.recipeOfTheDay.recipeOfTheDayRecipe= action.payload.recipeOfTheDayRecipe
            state.recipeOfTheDay.recipeID = action.payload.recipeID
           
        }

    }

 })

 export const {alterRecipeOfDay} = recipeOfDay.actions;
 export const recipeOfDaySelector = (state) => state.recipeOfDay;
 
 
 export default recipeOfDay.reducer;
import { createSlice } from '@reduxjs/toolkit';

const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: [],
    reducers: {
        setIngredientList: (state, action) => {
            return action.payload;
        }
    }
});

const selectedIngredientsSlice = createSlice({
    name: 'selectedIngredients',
    initialState: [],
    reducers: {
        setSelectedIngredients: (state, action) => {
            return [...state, ...action.payload]
        },
        deleteSelectedIngredient: (state, action) => {
            return state.filter(ingredient => ingredient.ingredientId !== action.payload.ingredientId)
          },
          resetSelectedIngredients: () => {
            return []
       },
    }
    
});

export const ingredientListSelector = (state) => state.ingredientList;
export const selectedIngredientsSelector = (state) => state.selectedIngredients;

export const { setIngredientList } = ingredientListSlice.actions;
export const { setSelectedIngredients, deleteSelectedIngredient, resetSelectedIngredients } = selectedIngredientsSlice.actions;

export default [ingredientListSlice.reducer, selectedIngredientsSlice.reducer]
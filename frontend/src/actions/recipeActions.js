import Axios from "axios";
import {
    RECIPE_CREATE_FAIL,
    RECIPE_CREATE_REQUEST,
    RECIPE_CREATE_SUCCESS,
    RECIPE_DELETE_FAIL,
    RECIPE_DELETE_REQUEST,
    RECIPE_DELETE_SUCCESS,
    RECIPE_DETAILS_FAIL,
    RECIPE_DETAILS_REQUEST,
    RECIPE_DETAILS_SUCCESS,
    RECIPE_LIST_FAIL,
    RECIPE_LIST_REQUEST,
    RECIPE_LIST_SUCCESS } from "../constants/recipeConstants";

// fetch recipes
export const listRecipes = () => async(dispatch) => {
    dispatch({
        type: RECIPE_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('http://localhost:9002/api/recipes');
        dispatch({
            type: RECIPE_LIST_SUCCESS,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: RECIPE_LIST_FAIL,
            payload: err.message
        });
    }
};

//get a recipe by its id from backend  
export const detailsRecipe = recipeId => async(dispatch) => {
    dispatch({
        type: RECIPE_DETAILS_REQUEST,
        payload: recipeId
    });
    try {
        const { data } = await Axios.get(`http://localhost:9002/api/recipes/${recipeId}`);
        dispatch({
            type: RECIPE_DETAILS_SUCCESS,
            payload: data.recipe
        });
        
    } catch(err) {
        dispatch({
            type: RECIPE_DETAILS_FAIL,
            payload: err.message
        });
    }
}

// create recipe
export const createRecipe = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPE_CREATE_REQUEST,
    });

    const {
        userLogin: { userInfo } 
    } = getState();
    try {
        const { data } = await Axios.post('http://localhost:9002/api/recipes', {},
        {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: RECIPE_CREATE_SUCCESS,
            payload: data
        });

    } catch(err) {
        dispatch({
            type: RECIPE_CREATE_FAIL,
            payload: err.message
        });
    }
};

//delete a recipe by its id  
export const deleteRecipe = recipeId => async(dispatch, getState) => {
    dispatch({
        type: RECIPE_DELETE_REQUEST,
        payload: recipeId
    });

    const {
        userLogin: { userInfo } 
    } = getState();
    try {
        await Axios.delete(`http://localhost:9002/api/recipes/${recipeId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: RECIPE_DELETE_SUCCESS
        });
        
    } catch(err) {
        dispatch({
            type: RECIPE_DELETE_FAIL,
            payload: err.message
        });
    }
}
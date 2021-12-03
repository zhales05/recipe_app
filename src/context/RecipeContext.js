import createDataContext from "./createDataContext";

const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'delete_recipe':
            return state.filter((recipe)=> recipe.id !== action.payload);
        case 'add_recipe':
            console.log(action.payload)
            return[...state, action.payload];
        default:
            return state;
    }
};

const addRecipe = dispatch => {
    return (recipe) => {
    dispatch({type: 'add_recipe', payload: recipe});
    }
};

const deleteRecipe = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_recipe', payload: id})
    }
}

export const { Context, Provider } = createDataContext(recipeReducer, {addRecipe, deleteRecipe}, []);
import createDataContext from "./createDataContext";

const listReducer = (state, action) => {
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

const addListRecipe = dispatch => {
    return (recipe) => {
    dispatch({type: 'add_recipe', payload: recipe.ingredients});
    }
};

const deleteListRecipe = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_recipe', payload: id})
    }
}

export const { Context, Provider } = createDataContext(listReducer, {addListRecipe, deleteListRecipe}, []);
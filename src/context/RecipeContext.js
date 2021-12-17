import createDataContext from "./createDataContext";

const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'delete_recipe':
            return state.filter((recipe) => recipe.id !== action.payload);
        case 'add_recipe':
            console.log(action.payload)
            return [...state, action.payload];
        default:
            return state;
    }
};

const addRecipe = dispatch => {
    return (recipe) => {
        dispatch({ type: 'add_recipe', payload: recipe });
    }
};

const deleteRecipe = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_recipe', payload: id })
    }
}



export const { Context, Provider } = createDataContext(recipeReducer, { addRecipe, deleteRecipe }, [
    {
        id: Math.floor(Math.random() * 99999),
        title: "French Toast",
        ingredients: [
            {
                id: Math.floor(Math.random() * 99999),
                title: "milk",
                quantity: "2 cups"
            },
            {
                id: Math.floor(Math.random() * 99999),
                title: "bread",
                quantity: "4 slices"
            },
            {
                id: Math.floor(Math.random() * 99999),
                title: "eggs",
                quantity: "4 eggs"
            },
            {
                id: Math.floor(Math.random() * 99999),
                title: "cinnamon",
                quantity: "2 tsp"
            },
        ],
        servings: 4,
        prepTime: '20 minutes'
    },

    {
        id: Math.floor(Math.random() * 99999),
        title: "Instant Oatmeal",
        ingredients: [
            {
                id: Math.floor(Math.random() * 99999),
                title: "milk",
                quantity: "1 cup"
            },
            {
                id: Math.floor(Math.random() * 99999),
                title: "Instant Oats",
                quantity: "1 packet"
            },
        ],
        servings: 1,
        prepTime: '45 seconds'
    },
])
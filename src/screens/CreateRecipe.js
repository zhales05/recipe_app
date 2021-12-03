import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from 'react-native';
import Header from "../navigation/header";
import { Context } from "../context/RecipeContext";
import { Feather } from '@expo/vector-icons';


const CreateScreen = ({ navigation }) => {
    const { state, addRecipe, deleteRecipe } = useContext(Context);
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientVisible, setNewIngredientVisible] = useState(false);


    const addIngredient = () => {
        setIngredients([...ingredients,
        {
            id: Math.floor(Math.random() * 99999),
            title: ingredientName,
            quantity: quantity
        }])
        setIngredientName('');
        setQuantity('');
        addNewIngredient();
    }

    const addNewIngredient = () => {
        setNewIngredientVisible(!newIngredientVisible);
    }

    const addRecipeAndExit = () => {
        addRecipe(
            {
                id: Math.floor(Math.random() * 99999),
                title: recipeName,
                ingredients: ingredients,
                servings: servings,
                prepTime: prepTime
            });
        navigation.navigate('Browse')
    }




return <View>
    <Header title='Add Recipe' />
    <View style={styles.contentContainer}>
        <View style={styles.recipes}>
            <View style={[styles.rowContainer]}>
                <TextInput placeholder="Recipe Name" style={styles.input} value={recipeName} onChangeText={(text) => { setRecipeName(text) }} />
            </View>
            <View style={[styles.rowContainer, styles.lowerGap]}>
                <TextInput placeholder="Servings" style={styles.halfInput} value={servings} onChangeText={(text) => { setServings(text) }} />
                <TextInput placeholder="Prep Time" style={styles.halfInput} value={prepTime} onChangeText={(text) => { setPrepTime(text) }} />
            </View>


            {newIngredientVisible && <View>
                <View style={styles.rowContainer}>
                    <TextInput placeholder="Ingredient Name" style={styles.input} value={ingredientName} onChangeText={(text) => { setIngredientName(text) }} />
                </View>
                <View style={styles.rowContainer}>
                    <TextInput placeholder="Quantity" style={styles.halfInput} value={quantity} onChangeText={(text) => { setQuantity(text) }} />
                </View>
                <View style={[styles.rowContainer, styles.center]}>
                    <Pressable onPress={() => addIngredient()}>
                        <Feather style={[styles.center, styles.buttonSpace]} name="check" size={30} color="black" />
                    </Pressable>
                    <Pressable onPress={() => addNewIngredient()}>
                        <Feather style={[styles.center, styles.buttonSpace]} name="x" size={30} color="red" />
                    </Pressable>
                </View>
            </View>}

            <View style={[styles.subTitleWithButtonContainer]}>
                <Text style={[styles.subTitle, styles.center]}>Ingredients</Text>
                <Pressable
                    style={[styles.ingredientContainer, styles.buttonAdd]}
                    onPress={() => addNewIngredient()}>
                    <Feather style={styles.center} name="plus" size={15} color="white" />
                    <Text style={[styles.buttonText, styles.center]}>Add Ingredient</Text>
                </Pressable>
            </View>

            <FlatList
                data={ingredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <View style={styles.ingredientContainer}>
                        <View style={styles.ingredientContainer}>
                            <Text style={styles.textStyle}>{item.quantity} </Text>
                            <Text style={styles.textStyle}>{item.title}</Text>
                        </View>
                        <View style={styles.ingredientContainer}>
                            <Feather style={styles.center} name="edit" size={20} color="black" />
                            <Pressable onPress={() => setIngredients(ingredients.filter((ingredients) => ingredients.id !== item.id))}>
                                <Feather style={styles.center} name="trash" size={20} color="red" />
                            </Pressable>
                        </View>
                    </View>
                }} />
        </View>
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={() => addRecipeAndExit()}>
                <Text style={styles.buttonText}>Add Recipe</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.cancel]}
                onPress={() => navigation.navigate('Browse')}>
                <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
        </View>
    </View>
</View>
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 5,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        height: 50
    },
    buttonContainer: {
        justifyContent: 'space-between',
        paddingLeft: '15%',
        paddingRight: '15%',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonAdd: {
        backgroundColor: '#071274',
        borderRadius: 10,
        padding: 5
    },
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between'
    },
    subTitleWithButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#071274',
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        width: "45%",
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    center: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    cancel: {
        backgroundColor: 'red',
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        width: "95%",
        marginLeft: 10,
        marginRight: 100,
        borderRadius: 5
    },
    halfInput: {
        fontSize: 18,
        borderWidth: 1,
        width: "40%",
        marginLeft: 10,
        marginRight: 46,
        borderRadius: 5
    },
    lowerGap: {
        marginBottom: 50
    },
    recipes: {
        height: "82%"
    },
    buttonTextStyle: {
        fontSize: 18,
        color: "white",
    },
    subTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    textStyle: {
        fontSize: 18,
    },
    buttonSpace: {
        padding: 10
    },
    spaceBetween: {
        justifyContent: 'space-between'
    }
});

export default CreateScreen;
import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Context } from "../context/RecipeContext";
import { Context as ListContext } from "../context/ListContext";
import Header from "../navigation/header";
import { AntDesign } from '@expo/vector-icons';


const data = () => {
    Produce: {
        items: ["carrots", "apples"]
    }
    Candy: {
        items: ["Hersheys", "ButterFinger"]
    }
}
const ListScreen = ({navigation }) => {
    const { state, addRecipe, deleteRecipe } = useContext(Context);
    const { state: listState, addListRecipe, deleteListRecipe } = useContext(ListContext);

    const [items, setItems] = useState([]);
    const [activeMeal, setActiveMeal] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [recipeModalVisible, setRecipeModalVisible] = useState(false);
    const [ingredient, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [mealName, setMealName] = useState('');

    const addItem = (name, quantity) => {
        console.log(name)
        setItems([...items, {
            title: name,
            quantity: quantity,
            id: Math.floor(Math.random() * 99999),
        }])
        setRecipeModalVisible(!recipeModalVisible);
        setMealName('');
    }

    const addToItems = () => {
        listState.map((recipe) => (
            console.log(recipe)
        ));
        //console.log(listState[1]);
    }

    const addRecipeToMeal = (recipe) => {
        activeMeal.recipe.push(recipe);
        setRecipeModalVisible(!recipeModalVisible);
    }


    return <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={recipeModalVisible}
            onRequestClose={() => {
                Alert.alert("recipeModal has been closed.");
                setModalVisible(!recipeModalVisible);
            }}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.exitIcon}>
                        <TouchableOpacity onPress={() => setRecipeModalVisible(!recipeModalVisible)}>
                            <AntDesign name="close" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modelStructure}>
                
                        <View style={styles.modelStructure}>
                        <Text style={styles.modalText}>Enter Name:</Text>
                        <TextInput style={styles.input} value={ingredient} onChangeText={(text) => { setIngredientName(text) }} />
                        <Text style={styles.modalText}>Enter Quantity:</Text>
                        <TextInput style={styles.input} value={quantity} onChangeText={(text) => { setQuantity(text) }} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addItem(ingredient, quantity)}>
                            <Text style={styles.textStyle}>Add Ingredient</Text>
                        </Pressable>
                    </View>
                    </View>
                </View>
            </View>
        </Modal>

        <Header title='Shopping List' />

        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <View>
                    <View style={styles.alignMeal}>
                    <Text style={styles.subtitle}>{item.quantity} {item.title}</Text>
                    </View>
                </View>
            }}
        />
        
        <TouchableOpacity style={styles.addMeal} onPress={() => addToItems()}>
            <Text style={styles.buttonText}>Auto Generate List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addMeal} onPress={() => setRecipeModalVisible(!recipeModalVisible)}>
            <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    addMeal: {
        backgroundColor: '#071274',
        padding: 20,
        marginRight: '20%',
        marginLeft: '20%',
        borderRadius: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#071274",
    },
    buttonClose: {
        backgroundColor: "#071274",
    },
    buttonRecipe: {
        backgroundColor: '#071274',
        borderRadius: 10,
        padding: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        width: "100%",
        marginBottom: 20,
        width: 120
    },
    alignMeal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        padding: 5
    },
    exitIcon: {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    modelStructure: {
        padding: 20
    },
    subtitle: {
        fontSize: 18,
    },
    date: {
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    recipeList: {
        backgroundColor: '#FFC062',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5
    }
});
export default ListScreen;
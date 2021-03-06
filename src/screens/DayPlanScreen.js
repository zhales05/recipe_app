import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Context } from "../context/RecipeContext";
import { Context as ListContext } from "../context/ListContext";
import Header from "../navigation/header";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const DayPlanScreen = ({ navigation }) => {

    const { state, addRecipe, deleteRecipe } = useContext(Context);
    const { state: listState, addListRecipe, deleteListRecipe } = useContext(ListContext);
    const oneDay = 1000 * 60 * 60 * 24;
    const date = navigation.getParam('date');
    const [meals, setMeals] = useState([
        {
            mealName: "Breakfast",
            recipe: [],
            id: 1
        },
        {
            mealName: "Lunch",
            recipe: [],
            id: 2
        },
        {
            mealName: "Dinner",
            recipe: [],
            id: 3
        },

    ]);
    const [activeMeal, setActiveMeal] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [recipeModalVisible, setRecipeModalVisible] = useState(false);
    const [mealName, setMealName] = useState('');
    const currentDay = new Date(date);


    const yesterday = () => {
        const yesterdayDateinMilli = currentDay.getTime() - oneDay;
        navigation.navigate('DayPlan', { date: (yesterdayDateinMilli) })
    }

    const tomorrow = () => {
        const tomorrowDateinMilli = currentDay.getTime() + oneDay;
        navigation.navigate('DayPlan', { date: (tomorrowDateinMilli) })
    }

    const addMeal = (name) => {
        console.log(name)
        setMeals([...meals, {
            mealName: name,
            recipe: [],
            id: Math.floor(Math.random() * 99999),
        }])
        setModalVisible(!modalVisible);
        setMealName('');
    }

    const addRecipeToMeal = (recipe) => {
        activeMeal.recipe.push(recipe);
        setRecipeModalVisible(!recipeModalVisible);
        addListRecipe(recipe);
        console.log("is this right", listState);
    }

    return <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.exitIcon}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign name="close" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modelStructure}>
                        <Text style={styles.modalText}>Enter Meal Name:</Text>
                        <TextInput style={styles.input} value={mealName} onChangeText={(text) => { setMealName(text) }} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addMeal(mealName)}>
                            <Text style={styles.textStyle}>Add Meal</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

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
                        <Text style={styles.modalText}>Select Recipe</Text>
                        <FlatList
                            data={state}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return <View style={styles.date}>
                                    <TouchableOpacity onPress={() => addRecipeToMeal(item)} style={styles.date}>
                                        <Text style={styles.title}>{item.title}    +</Text>
                                    </TouchableOpacity>
                                </View>
                            }} />
                    </View>
                </View>
            </View>
        </Modal>

        <Header title='Plan Meals' back='true' navigation={navigation} destination='Plan' />

        <View style={styles.date}>
            <Pressable onPress={() => yesterday()}>
                <Ionicons name="chevron-back" size={26} color="black" />
            </Pressable>
            <Text style={styles.title}>{currentDay.getMonth() + 1}-{currentDay.getDate()}-{currentDay.getFullYear()} </Text>
            <Pressable onPress={() => tomorrow()}>
                <Ionicons name="chevron-forward" size={26} color="black" />
            </Pressable>
        </View>

        <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <View>
                    <View style={styles.alignMeal}>
                        <Text style={styles.subtitle}>{item.mealName}</Text>
                        <TouchableOpacity style={styles.buttonRecipe} onPress={() => {
                            setActiveMeal(item);
                            setRecipeModalVisible(true);
                        }}>
                            <Text style={styles.buttonText}>+Add recipe</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {item.recipe.map((recipe, index) => (
                            <View key={index} style={styles.recipeList}>
                                <Text>{recipe.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            }}
        />

        <TouchableOpacity style={styles.addMeal} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>+Add meal</Text>
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
        elevation: 5,
        height: "25%",
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
        padding: 10
    },
    subtitle: {
        fontSize: 18,
    },
    date: {
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recipeList: {
        backgroundColor: '#FFC062',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5
    }
});
export default DayPlanScreen;
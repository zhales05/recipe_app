import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Touchable } from 'react-native';
import Header from "../navigation/header";
import { Context } from "../context/RecipeContext";
import { Ionicons } from '@expo/vector-icons';



const RecipeShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const recipe = state.find((recipe) => recipe.id === navigation.getParam('id'));


    return <View>
        <Header title={recipe.title} />
        <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
                    <Ionicons name="chevron-back" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{recipe.title}</Text>
            </View>

            <Image
                source={require('../img/french_toast.jpg')}
                style={styles.image}
            />
            <View style={styles.console}>
                <View style={[styles.infoBox, styles.line]}>
                    <Text style={[styles.center, styles.subtitle]}>{recipe.prepTime}</Text>
                    <Text style={styles.center}>Estimated Time</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={[styles.center, styles.subtitle]}>{recipe.servings}</Text>
                    <Text style={styles.center}>Servings</Text>
                </View>
            </View>
            <View style={styles.pageBreak}>
                <Text style={[styles.subtitle, styles.centerRight]}>Ingredients</Text>
            </View>
            <FlatList
                data={recipe.ingredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <View style={styles.row}>
                        <Text style={[styles.center, styles.text]}>{item.quantity} </Text>
                        <Text style={[styles.center, styles.text]}>{item.title}</Text>
                    </View>
                }} />

        </View>

    </View>
}

const styles = StyleSheet.create({
    center: {
        textAlign: 'center',
        alignItems: 'center'
    },
    centerRight: {
        padding: 20,
        paddingBottom: 10

    },
    contentContainer: {
        padding: 5,
    },
    console: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFC062',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: "20%",
        marginLeft: "20%",

    },
    image: {
        height: "45%",
        width: "100%",
        marginBottom: -20
    },
    infoBox: {
        flex: 1,
    },
    line: {
        borderRightWidth: 2,
    },
    pageBreak: {
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'center'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18
    },
    titleContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },


});

export default RecipeShowScreen;
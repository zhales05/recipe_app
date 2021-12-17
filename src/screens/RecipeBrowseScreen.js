import React, { useContext, useState} from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import {Context} from "../context/RecipeContext";
import { Feather } from '@expo/vector-icons'; 
import Header from "../navigation/header";
import { SearchBar } from 'react-native-elements';




const RecipeBrowseScreen = ({ navigation }) => {
    const {state, addRecipe, deleteRecipe } = useContext(Context);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(state);

    const updateSearch = (query) => {
        if (query == ""){
            setResults(state)
        } else {
            setSearch({query});
            setResults(state.filter((recipe)=> recipe.title == query))
        }
    }

    return (
    <View >
        <Header title="Browse"/>
        <SearchBar
        lightTheme="true"
        round="true"
        containerStyle={styles.searchBar}
        placeholder="Type Here..."
        value={search}
        onChangeText={updateSearch}
        
      />
        <Button title= "Add Recipe" onPress={() => navigation.navigate('Create')}/>
        
        <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('Recipe', {id: item.id})}>
                        <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
                            <Feather name="trash" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
              }}/>
              
    </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },

    title: {
        fontSize: 18
    },

    buffer: {
        paddingVertical: 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        width: "100%",
        marginBottom: 20,
        width: 120
    },
    buttonOpen: {
        backgroundColor: "#071274",
    },
    buttonClose: {
        backgroundColor: "#071274",
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
    exitIcon: {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    modelStructure: {
        padding: 20
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    searchBar:{
        backgroundColor: 'white'
    }
});
export default RecipeBrowseScreen;
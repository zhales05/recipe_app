import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import Header from "../navigation/header";

const IndexScreen = ({navigation }) => {

    return <View>
        
        <Header title='Home'/>
        <View>
            <Image
            source={require('../img/healthy_food.jpg')}
            style={styles.image}
            />
        </View>
        <View style={styles.view}>
            <Text style={styles.title}>Start your meal plan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Plan') }style={styles.button}>
            <View >
                <Text style={styles.subheading}>Plan your week</Text>
                
            </View>
        </TouchableOpacity>
        </View>
        <View style={styles.view}>
            <Text style={styles.title}>Find new meals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Browse') }style={styles.button}>
            <View >
                <Text style={styles.subheading}>Browse recipes</Text>
                
            </View>
        </TouchableOpacity>
        </View>

        <View style={styles.view}>
            <Text style={styles.title}>Organize your shopping trip</Text>
        <TouchableOpacity onPress={() => navigation.navigate('List') }style={styles.button}>
            <View >
                <Text style={styles.subheading}>Create shopping list</Text>
                
            </View>
        </TouchableOpacity>
        </View>
        
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    subheading: {
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        marginLeft: '10%',
        marginRight: '10%'
    },
    image: {
        width: '100%'
    },
    view: {
        backgroundColor: '#FFC062',
        borderRadius: 10,
        margin: 10,
        padding: 20,
    
    }
});
export default IndexScreen;
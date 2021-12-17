import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

export default function Header ({title, back, navigation, destination}) {
    const navigate = () => {
        navigation.navigate(destination);
    }
    const prev = back;

    return (
    <View style= {styles.header}>
        <View style={styles.backButton}>
             {back && 
                <Pressable onPress={() => navigate()}>
                    <View>
                        <Ionicons name="chevron-back" size={35} color="black" />
                    </View>
                </Pressable>
           }
        </View>
        <View style={styles.titleContainer}>
            <Pressable onPress={() => console.log("this")}>
            <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
        <View style={styles.backButton}>
        </View>
    </View>
    );
}

const styles = StyleSheet.create( {
    header: {
        width: '100%',
        backgroundColor: '#85A7FF',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20
    
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex:1
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})

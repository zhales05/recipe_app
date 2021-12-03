import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function Header ({title}) {
    return (
    <View style= {styles.header}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );
}

const styles = StyleSheet.create( {
    header: {
        width: '100%',
        backgroundColor: '#85A7FF',
        height: 100,
        paddingVertical: 30,
    },
    title: {
        textAlign: 'center',
        paddingVertical: 20,
        
    }
})

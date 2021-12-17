import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Header from "../navigation/header";

const MealPlan = ({ navigation }) => {
    const sendToDate = (date) => {
    const oneDay = 1000 * 60 *60 *24;
    milliDate = new Date(date.timestamp).getTime() + oneDay;
    navigation.navigate('DayPlan', {date: (milliDate)})
   }
    return <View>
        <Header title='Plan Meals' />
        <View style={styles.titleContainer}>
            <Text style={styles.title}> Select a Day </Text>
        </View>
        <View style={styles.calendarBorder}>
            <Calendar
            onDayPress={(date) => sendToDate(date)}
            theme={{
                calendarBackground: '#E5E4E2'
            }}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleContainer: {
        padding: 20,

    },
    calendarBorder: {
        borderRadius: 10
       
    }
});
export default MealPlan;
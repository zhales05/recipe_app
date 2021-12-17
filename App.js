import React from "react";
import { View } from "react-native";
import {createAppContainer, NavigationContainer, createSwitchNavigator } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/RecipeContext";
import { Provider as ListProvider } from "./src/context/ListContext";
import RecipeShowScreen from "./src/screens/RecipeShowScreen";
import RecipeBrowseScreen from "./src/screens/RecipeBrowseScreen";
import DayPlanScreen from "./src/screens/DayPlanScreen";
import CreateScreen from "./src/screens/CreateRecipe";
import MealPlan from "./src/screens/MealPlan";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ListScreen from "./src/screens/ListScreen";
import { Entypo } from '@expo/vector-icons'; 

const navigator = createStackNavigator({
  Index:  {
    screen: IndexScreen,
  },
  Recipe: RecipeShowScreen,
  RecipeBrowse: {
    screen: RecipeBrowseScreen,
    navigationOptions: {
      title: 'Browse'
    }
  },
  Create: CreateScreen,
  MealPlan: MealPlan
},
 {
  defaultNavigationOptions: {
    title: 'Home'
  }
});

const AppTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: IndexScreen,
      navigationOptions: {
        tabBarIcon: (
          <View>
            <Entypo name="home" size={24} color="black" />
          </View>
        )
      }
    },
    Plan: {
      screen: MealPlan,
      navigationOptions: {
        tabBarIcon: (
          <View>
            <Entypo name="calendar" size={24} color="black" />
          </View>
        )
      }
    },
    List: {
      screen: ListScreen,
      navigationOptions: {
        tabBarIcon: (
          <View>
            <Entypo name="list" size={24} color="black" />
          </View>
        )
      }
    },
    Browse: {
      screen: RecipeBrowseScreen,
      navigationOptions: {
        tabBarIcon: (
          <View>
            <Entypo name="book" size={24} color="black" />
          </View>
        )
      }
    }
  },
  {
    showLabel: 'false',
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#85A7FF' },
    
  }
)

const MainNavigator = createSwitchNavigator({
  dashboard: {
    screen: AppTabNavigator
},
  Create: CreateScreen,
  Recipe: RecipeShowScreen,
  DayPlan: DayPlanScreen
}, 
{
  initialRouteName: 'dashboard'
});


const App =  createAppContainer(MainNavigator);
 export default () => {
   return (
   <Provider>
     <ListProvider>
      <App/>
      </ListProvider>
    </Provider>
   )
 };



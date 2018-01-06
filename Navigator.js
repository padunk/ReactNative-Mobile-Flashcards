import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import AddNewDeck from './components/AddNewDeck';
import AddNewCard from './components/AddNewCard';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { orange, black } from './utils/colors';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-box' size={30} color={tintColor} />
    },
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? orange : black,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? black : orange,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: orange,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },  
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: {
      headerTintColor: orange,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: orange,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      headerTintColor: orange,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },  
});

export default MainNavigation;
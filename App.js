import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, TabNavigator, createBottomTabNavigator} from 'react-navigation';
import {LoginPage} from "./component/LoginPage";
import {HomePage} from "./component/HomePage";
import {SignUpPage} from "./component/SignUpPage";
import {Icon} from 'react-native-elements'

export const HomeStack = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: 'Discover'
        }
    }
});

export const Tabs = createBottomTabNavigator({
    Create: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: 'Your post',
            tabBarIcon: ({tintColor}) => (
                <Icon name="book-plus" size={22} color={tintColor} type='material-community'/>

            )
        }
    },
    WishList: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: 'Wish List',
            tabBarIcon: ({tintColor}) => (
                <Icon name="heart-outline" size={22} color={tintColor} type='material-community'/>
            )
        }
    },
    Discover: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Discover',
            title: 'Discover',
            tabBarIcon: ({tintColor}) => (
                <Icon name="lightbulb-on-outline" size={24} color={tintColor} type='material-community'/>
            )
        }
    },
    Chat: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) => (
                <Icon name="comment-text-multiple-outline" size={22} color={tintColor} type='material-community'/>
            )
        }
    },
    Profile: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: 'Me',
            tabBarIcon: ({tintColor}) => (
                <Icon name='account-outline' type='material-community' color={tintColor} size={25}/>
            )
        }
    }
}, {
    initialRouteName: 'Discover',
    lazyLoad: true,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#f88523',
        inactiveTintColor: 'gray',
        // style: {
        //     backgroundColor: 'rgba(186, 220, 88, 0.5)',
        // }
    },
});


export default class App extends Component {
    render () {
        return <Tabs/>;
    }
}

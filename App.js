import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import {LoginPage} from "./component/LoginPage";
import {HomePage} from "./component/HomePage";
import {SignUpPage} from "./component/SignUpPage";
import { Icon } from 'react-native-elements'


// export default Tabs = TabNavigator({
//     Create: {
//         screen: HomePage,
//         navigationOptions:{
//             tabBarLabel: 'Create',
//             tabBarIcon: ({tintColor}) => (
//                 <Icon name="plus" size={24} type='evilicon'/>
//             )
//         }
//     },
//     Search: {
//         screen: HomePage,
//         navigationOptions:{
//             tabBarLabel: 'Create',
//             tabBarIcon: ({tintColor}) => (
//                 <Icon name="search" size={24} type='evilicon'/>
//             )
//         }
//     },
//     WishList: {
//         screen: HomePage,
//         navigationOptions:{
//             tabBarLabel: 'Create',
//             tabBarIcon: ({tintColor}) => (
//                 <Icon name="heart" size={24} type='evilicon'/>
//             )
//         }
//     },
//     Chat: {
//         screen: HomePage,
//         navigationOptions:{
//             tabBarLabel: 'Create',
//             tabBarIcon: ({tintColor}) => (
//                 <Icon name="comment" size={24} type='evilicon'/>
//             )
//         }
//     },
//     Profile: {
//         screen: HomePage,
//         navigationOptions:{
//             tabBarLabel: 'Create',
//             tabBarIcon: ({tintColor}) => (
//                 <Icon
//                     name='user'
//                     type='evilicon'
//                     size={24}
//                 />
//             )
//         }
//     }
// });

export default createStackNavigator({
    Login: {
        screen: LoginPage,
    },
    Home: {
        screen: HomePage,
    },
    SignUp: {
        screen: SignUpPage
    }
    // Tab:{
    //     screen: Tabs
    // }
});


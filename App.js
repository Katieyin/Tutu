import React, {Component} from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {LoginPage} from "./component/LoginPage";
import {HomePage} from "./component/HomePage";
import {SignUpPage} from "./component/SignUpPage";
import {Icon} from 'react-native-elements'
import {PostStack} from "./component/PostPage/PostPage";
import {AddNewPostStack} from "./component/PostPage/AddNewPostPage";
import {DiscoverStack} from "./component/Discover/DiscoverPage";
import {ProfileStack} from "./component/Profile/ProfilePage";
import {EditProfilePage, EditProfileStack} from "./component/Profile/EditProfilePage";

export const Tabs = createBottomTabNavigator({
    Discover: {
        screen: DiscoverStack,
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
    Post: {
        screen: PostStack,
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
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Me',
            tabBarIcon: ({tintColor}) => (
                <Icon name='account-outline' type='material-community' color={tintColor} size={25}/>
            )
        }
    }
}, {
    initialRouteName: 'Profile',
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

export const Root = createStackNavigator({
    Login:{
        screen: LoginPage
    },
    SignUp: {
        screen: SignUpPage
    },
    Tabs: {
        screen: Tabs,
    },
    AddNewPost: {
        screen: AddNewPostStack,
    },
    EditProfile: {
        screen: EditProfileStack
    }
}, {
    headerMode: 'none'
});

export default class App extends Component {
    render() {
        return <Root/>;
    }
}

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import Search from 'react-native-search-box';

export class ChatPage extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Chat</Text>
            </View>
        );
    }
}

export const ChatStack = createStackNavigator({
    Chat: {
        screen: ChatPage,
        navigationOptions: {
            title: 'Chat',
            headerStyle: {
                backgroundColor: '#f1c002',
                borderBottomWidth: 0,
            },
        }
    }
});

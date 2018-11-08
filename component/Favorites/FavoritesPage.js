import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import Search from 'react-native-search-box';

export class FavoritesPage extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Favorites</Text>
            </View>
        );
    }
}

export const FavoritesStack = createStackNavigator({
    Favorites: {
        screen: FavoritesPage,
        navigationOptions: {
            title: 'Favorites'
        }
    }
});

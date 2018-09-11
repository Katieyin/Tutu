import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import Search from 'react-native-search-box';

export class DiscoverPage extends Component {

    state = {
        type: 'found',
        loading: true,
        list: []
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Search
                    ref="search_box"
                    backgroundColor='#f88523'
                />
            </View>
        );
    }
}

export const DiscoverStack = createStackNavigator({
    Discover: {
        screen: DiscoverPage,
        navigationOptions: {
            title: 'Discover'
        }
    }
});

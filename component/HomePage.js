import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';

export class HomePage extends Component {

    state = {
        type: 'found',
        loading: true,
        list: []
    }


    refreshPostlist = () => {

    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <SearchBar
                    lightTheme
                    placeholder='Type Here...' />
            </View>
        );
    }
}


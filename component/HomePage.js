import React, {Component} from 'react';
import {FormLabel, FormInput, Button, Text, SearchBar} from 'react-native-elements';
import {View, Button as ButtonText, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
const FB_APP_ID = '1376485632449872';

export class HomePage extends Component {

    static navigationOptions =
        {
            title: 'Home',
        };

    constructor(props) {
        super(props);
        this.search = React.createRef();
    }


    render() {

        return (
            <View>
                <Text> This is SecondActivity </Text>

            </View>
        );
    }
    clearSearch = () => {
        this.search.clear();
    }
}


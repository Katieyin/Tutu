import React, {Component} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {Icon} from 'react-native-elements';

export class DetailPage extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Detail',
            headerLeft:
                (<View style={{marginRight: 10}}>
                    <Icon name="chevron-left" size={35} type='material-community' color='#88959F'
                          onPress={() => params.goBack()}/>
                </View>)

        }
    }

    state = {
        title: '',
        selectedCategory: '',
        isOnlineChecked: false,
        isFTFChecked: false,
        price: null,
        img: null,
        description: '',
        location: '',
        address: '',
        requiredError: '',
        requiredCheckboxError: ''
    };

    componentDidMount() {
        this.props.navigation.setParams({
            goBack: this.goBack
        })
    }

    goBack = () => {
        this.props.navigation.navigate('Discover');
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>detail</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});


export const DetailStack = createStackNavigator({
    Detail: {
        screen: DetailPage
    }
});
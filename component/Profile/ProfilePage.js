import React, {Component} from 'react';
import {Text, Avatar, List, ListItem, Icon} from 'react-native-elements';
import {View, Button as ButtonText, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import firebase from 'react-native-firebase';
import {createStackNavigator} from "react-navigation";

export class ProfilePage extends Component {
    // static navigationOptions = ({navigation}) => {
    //     const {params = {}} = navigation.state;
    //     return {
    //         title: 'Profile',
    //         headerRight: (
    //             <View style={{marginRight: 10}}>
    //                 <Icon name="square-edit-outline" size={25} type='material-community' color='#88959F'/>
    //             </View>
    //         ),
    //         tabBarLabel: 'Me',
    //         tabBarIcon: ({tintColor}) => (
    //             <Icon name='account-outline' type='material-community' color={tintColor} size={25}/>
    //         )
    //     }
    // }

    render() {
        const list = [
            {
                title: 'Username',
                rightTitle: 'Katie',
                icon: 'account',
                iconType: 'material-community'
            },
            {
                title: 'Email',
                rightTitle: 'ttt@tt.com',
                icon: 'email',
                iconType: 'material-community'

            },
            {
                title: 'School',
                rightTitle: 'Carleton U',
                icon: 'school',
                iconType: 'material-community'
            },
            {
                title: 'LinkedIn',
                rightTitle: 'http://123.com',
                icon: 'linkedin-box',
                iconType: 'material-community'
            },
            {
                title: 'Phone',
                rightTitle: '123-123-1234',
                icon: 'phone',
                iconType: 'material-community'
            },
            {
                title: 'Gender',
                rightTitle: 'female',
                icon: 'gender-male-female',
                iconType: 'material-community'
            },

        ];


        return (
            <KeyboardAvoidingView behavior={'padding'}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        xlarge
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                    />
                </View>
                <List>
                    {
                        list.map((item) => (
                            <ListItem
                                key={item.title}
                                title={item.title}
                                rightTitle={item.rightTitle}
                                hideChevron={true}
                                leftIcon={{name: item.icon, type: item.iconType}}
                                containerStyle={{height: 50}}
                            />
                        ))
                    }
                </List>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 180
    },
})

export const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfilePage,
        navigationOptions: {
            title: 'Profile',
            headerRight: (
                <View style={{marginRight: 10}}>
                    <Icon name="square-edit-outline" size={25} type='material-community' color='#88959F'/>
                </View>
            ),
        }
    }
});
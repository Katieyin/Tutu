import React, {Component} from 'react';
import {Button, Avatar, List, ListItem, Icon, Tile} from 'react-native-elements';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import {ProfilePage} from "./ProfilePage";
import {createStackNavigator} from "react-navigation";

export class EditProfilePage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Edit Profile',
            headerLeft: (
                <View style={{marginLeft: 10}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Profile')
                    }}>
                        <Text style={{fontSize: 16}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: (
                <View style={{marginRight: 10}}>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16}}>Done</Text>
                    </TouchableOpacity>
                </View>
            ),
        }
    }

    render() {
        const list = [
            {
                title: 'Username',
                rightTitle: 'Katie',
                icon: 'account',
                iconType: 'material-community',
            },
            {
                title: 'Email',
                rightTitle: 'ttt@tt.com',
                icon: 'email',
                iconType: 'material-community',
            },
            {
                title: 'School',
                rightTitle: 'Carleton U',
                icon: 'school',
                iconType: 'material-community',
            },
            {
                title: 'LinkedIn',
                rightTitle: 'http://123.com',
                icon: 'linkedin-box',
                iconType: 'material-community',
            },
            {
                title: 'Phone',
                rightTitle: '123-123-1234',
                icon: 'phone',
                iconType: 'material-community',
            },

        ];

        return (
            <ScrollView behavior={'padding'}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        xlarge
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                    />
                    <TouchableOpacity style={{marginTop: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#f88523'}}>Change Profile Photo</Text>
                    </TouchableOpacity>
                </View>

                <List style={{marginTop: 5}}>
                    {
                        list.map((item) => (
                            <ListItem
                                key={item.title}
                                title={item.title}
                                rightTitle={item.rightTitle ? item.rightTitle : null}
                                hideChevron={true}
                                leftIcon={{name: item.icon, type: item.iconType}}
                                containerStyle={{height: 50}}
                                textInput={true}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        marginTop: 5
    }
})

export const EditProfileStack = createStackNavigator({
    EditProfile: {
        screen: EditProfilePage
    }
});
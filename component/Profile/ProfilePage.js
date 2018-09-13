import React, {Component} from 'react';
import {Avatar, List, ListItem, Icon} from 'react-native-elements';
import {View, StyleSheet, ScrollView, AlertIOS} from 'react-native';
import {createStackNavigator} from "react-navigation";
import firebase from 'react-native-firebase';
import {NavigationActions, StackActions} from 'react-navigation';

export class ProfilePage extends Component {
    static navigationOptions = ({navigation}) => {
        console.log(navigation.state);
        return {
            title: 'Profile',
            headerRight: (
                <View style={{marginRight: 10}}>
                    <Icon name="square-edit-outline" size={25} type='material-community' color='#88959F'
                          onPress={() => {
                              navigation.navigate('EditProfile')
                          }}/>
                </View>
            ),
        }
    }

    resetNavigation = () => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: 'Login'}),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleSignout = () => {
        AlertIOS.alert('Signing out', 'Are you sure you want to sign out?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    // firebase.auth().signOut().then(() => {
                    this.resetNavigation()
                    // })
                },
            }
        ])
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
                            />
                        ))
                    }
                </List>
                <List>
                    <ListItem
                        key={'Sign out'}
                        title={'Sign out'}
                        hideChevron={true}
                        leftIcon={{name: 'logout', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        onPress={this.handleSignout}
                    />
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
    },
    signOutButton: {
        backgroundColor: '#f88523',
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: 150,
    },
})

export const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfilePage
    }
});
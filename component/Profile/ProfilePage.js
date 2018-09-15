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

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            school: '',
            linkedIn: '',
            phone: '',
            email: ''
        };
        this.setUserProfileState();

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('in shouldComponentUpdate');
        return nextState.username != this.state.username ||
            nextState.school != this.state.school ||
            nextState.linkedIn != this.state.linkedIn ||
            nextState.phone != this.state.phone;
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
                    firebase.auth().signOut().then(() => {
                        this.resetNavigation()
                    })
                },
            }
        ])
    }

    setUserProfileState = () => {
        const user = firebase.auth().currentUser;
        firebase.firestore().collection('users').doc(user.uid).get().then((user) => {
            const userProfile = user.data();
            this.setState({
                username: userProfile.username,
                school: userProfile.school,
                linkedIn: userProfile.linkedIn,
                phone: userProfile.phone,
                email: userProfile.email
            });
        });
    }

    render() {
        const list = [
            {
                title: 'Username',
                rightTitle: this.state.username,
                icon: 'account',
                iconType: 'material-community',
            },
            {
                title: 'School',
                rightTitle: this.state.school,
                icon: 'school',
                iconType: 'material-community',
            },
            {
                title: 'LinkedIn',
                rightTitle: this.state.linkedIn,
                icon: 'linkedin-box',
                iconType: 'material-community',
            },
            {
                title: 'Phone',
                rightTitle: this.state.phone,
                icon: 'phone',
                iconType: 'material-community',
            },
            {
                title: 'Email',
                rightTitle: this.state.email,
                icon: 'email',
                iconType: 'material-community',
            }

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
                                rightTitle={item.rightTitle ? item.rightTitle : '--'}
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
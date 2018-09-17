import React, {Component} from 'react';
import {Button, Avatar, List, ListItem, Icon, Tile} from 'react-native-elements';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, AlertIOS} from 'react-native';
import {createStackNavigator} from "react-navigation";
import firebase from 'react-native-firebase';

export class EditProfilePage extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

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
                    <TouchableOpacity onPress={() => params.handleDone()}>
                        <Text style={{fontSize: 16}}>Done</Text>
                    </TouchableOpacity>
                </View>
            ),
        }
    }

    componentWillMount() {
        const user = this.props.navigation.state.params.user;
        this.setState({
            username: user.username,
            school: user.school,
            linkedIn: user.linkedIn,
            phone: user.phone,
            email: user.email
        });

    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleDone: this.handleDone
        })
    }

    handleDone = () => {
        if (!this.state.username) {
            AlertIOS.alert('Username cannot be empty', '', [
                {
                    text: 'Confirm',
                },
            ])
        } else {
            const user = firebase.auth().currentUser;
            const db = firebase.firestore().collection('users').doc(user.uid);
            db.set({
                username: this.state.username,
                school: this.state.school,
                linkedIn: this.state.linkedIn,
                phone: this.state.phone,
                email: this.state.email
            }).then(() => {
                this.props.navigation.state.params.setProfile();
                this.props.navigation.navigate('Profile', this.state.username);
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    render() {
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
                    <ListItem
                        key={'Username'}
                        title={'Username'}
                        rightTitle={this.state.username ? this.state.username : null}
                        hideChevron={true}
                        leftIcon={{name: 'account', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        textInput={true}
                        textInputOnChangeText={username => this.setState({username})}
                    />
                    <ListItem
                        key={'School'}
                        title={'School'}
                        rightTitle={this.state.school ? this.state.school : null}
                        hideChevron={true}
                        leftIcon={{name: 'school', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        textInput={true}
                        textInputOnChangeText={school => this.setState({school})}
                    />
                    <ListItem
                        key={'LinkedIn'}
                        title={'LinkedIn'}
                        rightTitle={this.state.linkedIn ? this.state.linkedIn : null}
                        hideChevron={true}
                        leftIcon={{name: 'linkedin-box', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        textInput={true}
                        textInputOnChangeText={linkedIn => this.setState({linkedIn})}
                    />
                    <ListItem
                        key={'Phone'}
                        title={'Phone'}
                        rightTitle={this.state.phone ? this.state.phone : null}
                        hideChevron={true}
                        leftIcon={{name: 'phone', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        textInput={true}
                        textInputOnChangeText={phone => this.setState({phone})}
                        textInputKeyboardType={'phone-pad'}
                    />
                    <ListItem
                        key={'Email'}
                        title={'Email'}
                        rightTitle={this.state.email}
                        rightTitleStyle={{color: '#808080'}}
                        hideChevron={true}
                        leftIcon={{name: 'email', type: 'material-community'}}
                        containerStyle={{height: 50}}
                        textInput={false}
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
    }
})

export const EditProfileStack = createStackNavigator({
    EditProfile: {
        screen: EditProfilePage
    }
});
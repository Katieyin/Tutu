import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormLabel, FormInput, Button, Text, FormValidationMessage} from 'react-native-elements';
import {View, Button as ButtonText} from 'react-native';
import firebase from 'react-native-firebase';


export class SignUpPage extends Component {
    static navigationOptions =
        {
            title: 'Sign up',
        };

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        emailError: '',
        passwordError: '',
        requiredError: ''
    };


    render() {
        return (
            <KeyboardAwareScrollView>
                <FormLabel>User name</FormLabel>
                <FormInput placeholder='Username'
                           value={this.state.username}
                           onChangeText={name => this.setState({name, requiredError: ''})}/>

                <FormLabel>Email address</FormLabel>
                <FormInput placeholder='Email address'
                           value={this.state.email}
                           onChangeText={email => this.setState({email, requiredError: ''})}/>

                <FormLabel>Password</FormLabel>
                <FormInput placeholder='Password'
                           value={this.state.password}
                           onChangeText={password => this.setState({password, requiredError: ''})}/>

                <FormLabel>Confirm password</FormLabel>
                <FormInput placeholder='Confirm password'
                           value={this.state.confirmPassword}
                           onChangeText={confirmPassword => this.setState({confirmPassword, requiredError: ''})}/>
                <View>
                    <Button
                        title="Sign up"
                        backgroundColor='#aad1ed'
                        fontWeight='bold'
                        large
                        borderRadius={10}
                        onPress={this.handleSignup}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }

    handleSignup = () => {
        const {email, password, name} = this.state;
        const {navigation} = this.props;

        this.setState({
            emailError: '',
            passwordError: '',
            requiredError: ''
        });

        if (!name) {
            const requiredError = 'This field is required';
            this.setState({requiredError});
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error);
            });
    }


}


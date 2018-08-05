import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormLabel, FormInput, Button, Text, FormValidationMessage} from 'react-native-elements';
import {View, Button as ButtonText, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import firebase from 'react-native-firebase';


export class SignUpPage extends Component {
    static navigationOptions = {header: null};

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
        const {requiredError, passwordError, emailError} = this.state;

        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.signUpContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../asset/icons/png/002-student-1.png")}/>
                    <Text style={styles.title}>
                        Sign up to TUTU
                    </Text>
                </View>
                <View>
                    <FormLabel>User name</FormLabel>
                    <FormInput
                        containerStyle={styles.formContainer}
                        returnKeyType={'next'}
                        onSubmitEditing={() => this.emailInput.focus()}
                        value={this.state.username}
                        autoCorrect={false}
                        onChangeText={username => this.setState({username, requiredError: ''})}/>
                    {requiredError && !this.state.username ?
                        <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                </View>
                <FormLabel>Email address</FormLabel>
                <FormInput
                    value={this.state.email}
                    containerStyle={styles.formContainer}
                    autoCapitalize='none'
                    returnKeyType={'next'}
                    keyboardType="email-address"
                    ref={(input) => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    onChangeText={email => this.setState({email, requiredError: '', emailError: ''})}/>
                {requiredError && !this.state.email ?
                    <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                {emailError && this.state.email ?
                    <FormValidationMessage>{emailError}</FormValidationMessage> : null}

                <FormLabel>Password</FormLabel>
                <FormInput
                    value={this.state.password}
                    containerStyle={styles.formContainer}
                    autoCapitalize='none'
                    returnKeyType={'next'}
                    secureTextEntry={true}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.confirmPasswordInput.focus()}
                    onChangeText={password => this.setState({password, requiredError: ''})}/>
                {requiredError && !this.state.password ?
                    <FormValidationMessage>{requiredError}</FormValidationMessage> : null}

                <FormLabel>Confirm password</FormLabel>
                <FormInput
                    value={this.state.confirmPassword}
                    containerStyle={styles.formContainer}
                    autoCapitalize='none'
                    returnKeyType={'done'}
                    secureTextEntry={true}
                    ref={(input) => this.confirmPasswordInput = input}
                    onChangeText={confirmPassword => this.setState({
                        confirmPassword,
                        requiredError: '',
                        passwordError: ''
                    })}/>
                {requiredError && !this.state.confirmPassword ?
                    <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                {passwordError && this.state.confirmPassword && this.state.password ?
                    <FormValidationMessage>{passwordError}</FormValidationMessage> : null}

                <Button
                    title="Sign up"
                    textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)'}}
                    buttonStyle={styles.signUpButton}
                    onPress={this.handleSignup}
                />
            </KeyboardAvoidingView>
        );
    }

    handleSignup = () => {
        const {email, password, confirmPassword, username} = this.state;
        const {navigation} = this.props;

        this.setState({
            emailError: '',
            passwordError: '',
            requiredError: ''
        });

        if (!username || !email || !password || !confirmPassword) {
            const requiredError = 'Required';
            this.setState({requiredError});
        }

        if (password !== confirmPassword) {
            const passwordError = 'Password does not match';
            this.setState({passwordError});
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({uid}) => {
                // const user = firebase.auth().currentUser();
                // user.updateProfile({
                //     displayName: name,
                // }).then(() => {
                //     firebase.getUsersRef().child(uid).set({
                //         email,
                //         displayName: name
                //     })
                // }).catch((error) => {
                //     console.log(error);
                // })
                console.log(uid);
                this.props.navigation.navigate('Login');
            })
            .catch((error) => {
                const {code, message} = error;
                console.log(message);
                console.log(code);
                if (code === 'auth/weak-password') {
                    this.setState({passwordError: message});
                } else if (code === 'auth/email-already-in-use') {
                    this.setState({emailError: message});
                } else if (code === 'auth/invalid-email') {
                    this.setState({emailError: message});
                } else {
                    this.setState({passwordError: message});
                }
            });
    }


}

const styles = StyleSheet.create({
    signUpContainer: {
        flex: 1,
        backgroundColor: '#badc58',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomColor: 'transparent',
        marginTop: 3,
        borderColor: 'black',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    signUpButtonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    signUpButton: {
        backgroundColor: '#f88523',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20

    }

});
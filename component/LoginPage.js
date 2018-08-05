import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormInput, Button, Text, FormValidationMessage, Input} from 'react-native-elements';
import {View, Button as ButtonText, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class LoginPage extends Component {
    static navigationOptions =
        {
            header: null,
        };
    state = {
        loading: true,
        email: '',
        password: '',
        errorMessage: '',
    }

    render() {
        const {errorMessage, loading} = this.state;

        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.loginContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../asset/icons/png/002-student-1.png")}/>
                    <Text style={styles.title}>
                        Welcome to TUTU
                    </Text>
                </View>

                <View style={{flex: 1}}>
                    <FormInput
                        containerStyle={styles.formContainer}
                        placeholder='Email'
                        autoCapitalize='none'
                        value={this.state.email}
                        returnKeyType={'next'}
                        inputStyle={{marginTop: 5}}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={email => this.setState({email})}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}

                    />
                    <FormInput
                        containerStyle={styles.formContainer}
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        returnKeyType={'done'}
                        value={this.state.password}
                        inputStyle={{marginTop: 5}}
                        onChangeText={password => this.setState({password})}
                        ref={(input) => this.passwordInput = input}
                    />
                    <FormValidationMessage>{errorMessage}</FormValidationMessage>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Button
                            title='Sign up'
                            buttonStyle={styles.loginButton}
                            textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)'}}
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        />
                        <Button
                            title='Login'
                            buttonStyle={styles.loginButton}
                            textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)'}}
                            onPress={this.handleLogin}
                        />
                    </View>

                    <View style={styles.forgetPasswordContainer}>
                        <TouchableOpacity onPress={this.handleLogin}>
                            <Text style={styles.forgetPasswordText}
                            >Forget password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }


    handleLogin = () => {
        const {email, password} = this.state;
        const {navigation} = this.props;
        if (!email || !password) {
            return;
        }
        this.setState({loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.navigation.navigate('Home')
        }).catch((error) => {
            // Handle Errors here.
            this.setState({loading: false});
            const errorMessage = 'Wrong email or password';
            console.log(errorMessage);
            this.setState({errorMessage});
        });
    }

}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#badc58'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
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
        marginTop: 10,
        borderColor: 'black',
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 45
    },
    loginButton: {
        backgroundColor: '#f88523',
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: 150,
    },
    forgetPasswordContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1
    },
    forgetPasswordText: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)'
    }

});
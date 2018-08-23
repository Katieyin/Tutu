import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, AlertIOS, CameraRoll, Text, Keyboard} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {FormInput, Icon, Button, FormLabel, FormValidationMessage, CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import {Location} from "../map/Location";
import {CATEGORY} from "./CategoryList";

export class AddNewPostPage extends Component {
    state = {
        title: '',
        selectedCategory: '',
        isCheckedOnline: false,
        isCheckedFTF: false,
        price: null,
        description: '',
        location: '',
        address: '',
        requiredError: '',
        requiredCheckboxError: ''

    };

    static navigationOptions = {
        title: 'Add New Course'

    };

    handlePressOnlineCheckedBox = () => {
        this.setState({
            isCheckedOnline: !this.state.isCheckedOnline,
        });
    };

    handlePressFTFCheckedBox = () => {
        this.setState({
            isCheckedFTF: !this.state.isCheckedFTF,
        });
    };

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({photos: r.edges});
            })
            .catch((err) => {
                //Error Loading Images
            });
    };

    handlePost = () => {
        console.log('in handle post');
        const {
            title,
            selectedCategory,
            isCheckedOnline,
            isCheckedFTF,
            price,
            description,
            location,
            address,
            requiredError,
            requiredCheckboxError
        } = this.state;

        if (!title || !selectedCategory || !price || !description) {
            const requiredError = 'Required';
            this.setState({requiredError});
        }

        if (!isCheckedOnline && !isCheckedFTF) {
            const requiredCheckboxError = 'Please select at least one';
            this.setState({requiredCheckboxError});
        }

        console.log(this.state);
    };

    render() {
        const {requiredError, requiredCheckboxError} = this.state;


        return (
            <View style={{flex: 1}}>
                <FormLabel>Title</FormLabel>
                <FormInput placeholder='Please enter your title here'
                           inputStyle={{fontSize: 14}}
                           autoCapitalize='sentences'
                           autoCorrect={true}
                           returnKeyType={'done'}
                           value={this.state.title}
                           onSubmitEditing={() => {
                               Keyboard.dismiss()
                           }}
                           onChangeText={title => this.setState({title, requiredError: ''})}/>
                {requiredError && !this.state.title ?
                    <FormValidationMessage>{requiredError}</FormValidationMessage> : null}

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: "50%"}}>
                        <FormLabel>Category</FormLabel>
                        <View style={{width: '80%', marginLeft: 20, marginTop: 5}}>
                            <Dropdown
                                data={CATEGORY}
                                dropdownPosition={-5}
                                labelHeight={0}
                                dropdownOffset={{top: 5, left: 0}}
                                value={'None'}
                                onChangeText={(selectedCategory) => this.setState({selectedCategory})}
                            />
                        </View>
                        {requiredError && !this.state.selectedCategory ?
                            <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                    </View>
                    <View style={{flexDirection: 'column', width: "50%"}}>
                        <FormLabel>Price ($/hr)</FormLabel>
                        <View style={{flexDirection: 'row'}}>
                            <FormInput placeholder='Please enter the price'
                                       keyboardType="numeric"
                                       inputStyle={{fontSize: 14}}
                                       onChangeText={price => this.setState({price, requiredError: ''})}
                                       containerStyle={{width: "80%"}}/>
                        </View>
                        {requiredError && !this.state.price ?
                            <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                    </View>
                </View>

                <FormLabel>Description</FormLabel>
                <View style={{marginLeft: 20, marginRight: 20, height: 150, marginTop: 5}}>
                    <TextInput
                        editable={true}
                        style={{height: '100%', borderColor: '#bdc6cf', borderWidth: 1, color: 'black'}}
                        multiline={true}
                        returnKeyType={'done'}
                        onChangeText={description => this.setState({description, requiredError: ''})}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                    />

                </View>
                {requiredError && !this.state.description ?
                    <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
                <View style={{height: 65}}>
                    <FormLabel>Location</FormLabel>
                    <View style={{flexDirection: 'row'}}>
                        <CheckBox title='Online'
                                  checkedColor={'#f88523'}
                                  checked={this.state.isCheckedOnline}
                                  containerStyle={{backgroundColor: 'white', borderWidth: 0}}
                                  iconType='material-community'
                                  size={20}
                                  checkedIcon='check-circle'
                                  uncheckedIcon='checkbox-blank-circle-outline'
                                  onPress={this.handlePressOnlineCheckedBox}
                        />
                        <CheckBox title='Face to face'
                                  checked={this.state.isCheckedFTF}
                                  checkedColor={'#f88523'}
                                  onPress={this.handlePressFTFCheckedBox}
                                  size={20}
                                  iconType='material-community'
                                  checkedIcon='check-circle'
                                  uncheckedIcon='checkbox-blank-circle-outline'
                                  containerStyle={{backgroundColor: 'white', borderWidth: 0}}/>
                    </View>

                </View>
                {requiredCheckboxError && !this.state.isCheckedOnline && !this.state.isCheckedFTF ?
                    <FormValidationMessage>{requiredCheckboxError}</FormValidationMessage> : null}
                <Location/>

                <View style={styles.bottomView}>
                    <Button
                        title="Post"
                        containerStyle={styles.addButton}
                        textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)'}}
                        onPress={this.handlePost}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        bottomView: {
            width: '100%',
            // height: '6%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
        },

        addButton: {
            borderRadius: 25,
            shadowColor: 'grey',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 2,
            backgroundColor: '#f7f7f7',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        }
    });

export const AddNewPostStack = createStackNavigator({
    AddNewPostStack: {
        screen: AddNewPostPage,
    }
});

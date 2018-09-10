import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, AlertIOS, Modal} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import {AddNewPostPage} from "./AddNewPostPage";

export class PostPage extends Component {

    state = {
        type: 'found',
        loading: true,
        list: [],
        modalVisible: false,

    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    handelCloseButtonPress = () => {
        AlertIOS.alert(
            'Are you sure you want to leave this page?',
            'The detail may not be saved',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => this.setModalVisible(!this.state.modalVisible),
                },
            ]
        );
    };

    closeModal = () => {
        this.setModalVisible(!this.state.modalVisible);
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1}}>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        this.setModalVisible(true);
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 11, marginTop: 1, color: '#808080', fontWeight: 'bold'}}>Add
                                Course </Text>
                            <Icon name="plus" size={15} type='material-community' color='#808080'/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <Header backgroundColor={'white'}
                                leftComponent={<Icon name="close" size={20} type='material-community' color='#88959F'
                                                     onPress={this.handelCloseButtonPress}/>}
                                centerComponent={{text: 'Add New Course',}}
                        />
                        <AddNewPostPage closeModal={this.closeModal}/>
                    </Modal>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create(
    {
        bottomView: {
            width: '100%',
            height: '6%',
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
            width: '27%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        },
        closeButton: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 25,
            marginLeft: 10
        },
        addNewTitle: {
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

export const PostStack = createStackNavigator({
    Post: {
        screen: PostPage,
        navigationOptions: {
            title: 'Your post',
        }
    }
});
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AlertIOS,
    Modal,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import {Icon, Header, CheckBox, Button} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import {AddNewPostPage} from "./AddNewPostPage";
import firebase from 'react-native-firebase';
import _ from 'lodash';
import Swipeout from 'react-native-swipeout';

export class PostPage extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            modalVisible: false,
            isLoading: true,
            dataSource: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.fetchingCourse();
    }

    fetchingCourse = () => {
        firebase.firestore().collection('courses').get()
            .then(snapshot => {
                const data = snapshot._docs;
                const currentUser = firebase.auth().currentUser;
                const courses = _.filter(data, item => {
                    const listItem = item.data();

                    return listItem.userId === currentUser.uid;
                });

                this.setState({
                    dataSource: courses,
                    isLoading: false,
                    refreshing: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    refreshing: false
                })
            });
    };

    renderItem = ({item}) => {
        const listItem = item.data();
        const categoryImage = this.findImage(listItem.selectedCategory);
        const swipeoutBtns = [
            {
                backgroundColor: '#dbddde',
                underlayColor: '#dbddde',
                component: (<Button
                    title='Delete'
                    buttonStyle={styles.swipeButton}
                    textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)', marginLeft: -30}}
                />)
            }
        ];
        return (
            <Swipeout right={swipeoutBtns}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white'}}
                                  onPress={() => {
                                      this.props.navigation.navigate('Detail', {
                                          course: listItem,
                                          categoryImage: categoryImage,
                                          courseId: item.id,
                                          previousScreen: 'Post'
                                      })
                                  }}>
                    {categoryImage}
                    <View>
                        <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                            <Text style={{fontSize: 18, marginTop: 10}}>
                                {listItem.title}
                            </Text>
                            <Text style={{marginTop: 5, fontSize: 15, color: '#800000', fontWeight: 'bold'}}>
                                $ {listItem.price} / hr
                            </Text>
                            <View style={{marginLeft: -20, marginTop: -10}}>
                                <CheckBox title='Online'
                                          checkedColor={'#e6b800'}
                                          checked={listItem.online}
                                          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                                          iconType='material-community'
                                          size={15}
                                          fontFamily={'system font'}
                                          checkedIcon='check-circle'
                                          uncheckedIcon='checkbox-blank-circle-outline'
                                          disabled={true}
                                />
                                <CheckBox title='Face to face'
                                          checked={listItem.faceToFace}
                                          checkedColor={'#e6b800'}
                                          size={15}
                                          fontFamily={'system font'}
                                          iconType='material-community'
                                          checkedIcon='check-circle'
                                          uncheckedIcon='checkbox-blank-circle-outline'
                                          disabled={true}
                                          containerStyle={{
                                              backgroundColor: 'transparent',
                                              borderWidth: 0,
                                              marginTop: -20
                                          }}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>)
    };

    findImage = (category) => {
        if (category === 'ARTH') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/ARTH.png")}/>)
        } else if (category === 'BIOL') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/BIOL.png")}/>)
        } else if (category === 'BUSI') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/BUSI.png")}/>)
        } else if (category === 'CHEM') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/CHEM.png")}/>)
        } else if (category === 'COMP') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/COMP.png")}/>)
        } else if (category === 'ECON') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/ECON.png")}/>)
        } else if (category === 'ENGI') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/ENGI.png")}/>)
        } else if (category === 'ENGL') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/ENGL.png")}/>)
        } else if (category === 'HIST') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/HIST.png")}/>)
        } else if (category === 'JOUR') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/JOUR.png")}/>)
        } else if (category === 'LAW') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/LAW.png")}/>)
        } else if (category === 'MATH') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/MATH.png")}/>)
        } else if (category === 'PHYS') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/PHYS.png")}/>)
        } else if (category === 'PSYC') {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/PSYC.png")}/>)
        } else {
            return (<Image style={styles.categoryImage} source={require("../../asset/categories/OTHER.png")}/>)
        }
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

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.fetchingCourse();
        })
    }

    closeModal = () => {
        this.setModalVisible(!this.state.modalVisible);
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            this.state.isLoading ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'} color={'black'} animating/>
                </View>
                :
                <View style={{flex: 1}}>
                    <View style={{height: '100%'}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            this.setModalVisible(true);
                        }}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 11, marginTop: 1, color: '#808080', fontWeight: 'bold'}}>
                                    Add Course </Text>
                                <Icon name="plus" size={15} type='material-community' color='#808080'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}>
                            <Header backgroundColor={'#f1c002'}
                                    leftComponent={{
                                        icon: 'close',
                                        color: 'black',
                                        containerStyle: {
                                            marginLeft: -5,
                                            marginBottom: -10,
                                        },
                                        onPress: this.handelCloseButtonPress,
                                    }}

                                    centerComponent={{
                                        text: 'Add New Course',
                                        style: {
                                            fontSize: 17,
                                            marginHorizontal: 16,
                                            marginBottom: -10,
                                            fontWeight: '600',
                                        }
                                    }}
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
            shadowOpacity: 1,
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
        },
        categoryImage: {
            width: 80,
            height: 80,
            marginLeft: 15,
            marginTop: 15,
            marginBottom: 10
        },
        swipeButton: {
            backgroundColor: '#e6b800',
            height: 114,
            width: 100,
            marginLeft: -8
        },
    });

export const PostStack = createStackNavigator({
    Post: {
        screen: PostPage,
        navigationOptions: {
            title: 'Add New Course',
            headerStyle: {
                backgroundColor: '#f1c002',
                borderBottomWidth: 0,
            },
        }
    }
});
import React, {Component} from 'react';
import {View, StyleSheet, Text, Modal, ScrollView, TouchableOpacity, AlertIOS, RefreshControl} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {Icon} from 'react-native-elements';
import {CATEGORY} from "../PostPage/CategoryList";
import firebase from 'react-native-firebase';
import {Avatar, CheckBox, Header, Button} from 'react-native-elements';
import _ from 'lodash';
import ViewMoreText from 'react-native-view-more-text';
import {EditPostPage} from "../PostPage/EditPostPage";

export class DetailPage extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        const canEditCourse = params.previousScreen === 'Post';
        const headerRight = canEditCourse ? (<View style={{marginRight: 10}}>
            <Icon name="square-edit-outline" size={28} type='material-community' color='black'
                  onPress={() => params.handleEditCourse()}/>
        </View>) : null;
        return {
            title: 'Detail',
            headerStyle: {
                backgroundColor: '#f1c002',
                borderBottomWidth: 0,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                // fontSize: 23
            },
            headerRight: headerRight,
            headerLeft:
                (<View style={{marginRight: 10}}>
                    <Icon name="chevron-left" size={35} type='material-community' color='black'
                          onPress={() => params.goBack()}/>
                </View>)

        }
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }


    componentWillMount() {
        const course = this.props.navigation.state.params.course;
        const categoryImage = this.props.navigation.state.params.categoryImage;
        const courseId = this.props.navigation.state.params.courseId;
        const previousScreen = this.props.navigation.state.params.previousScreen;
        this.setState({
            previousScreen: previousScreen,
            courseId: courseId,
            title: course.title,
            selectedCategory: course.selectedCategory,
            online: course.online,
            faceToFace: course.faceToFace,
            price: course.price,
            description: course.description,
            location: course.location,
            userId: course.userId,
            categoryImage: categoryImage,
            modalVisible: false,
        });
        const user = firebase.auth().currentUser;
        firebase.firestore().collection('users').doc(user.uid).get().then((user) => {
            const userProfile = user.data();
            this.setState({
                favourList: userProfile.favourList ? userProfile.favourList : []
            });
        });
        this.findUser(course.userId);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack: this.goBack,
            handleEditCourse: this.handleEditCourse
        })
    }

    handleEditCourse = () => {
        this.setModalVisible(!this.state.modalVisible);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    closeModal = () => {
        this.setModalVisible(!this.state.modalVisible);
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.refreshingCourse();
    }

    refreshingCourse = () => {
        firebase.firestore().collection('courses').doc(this.state.courseId).get()
            .then(snapshot => {
                const course = snapshot._data;

                this.setState({
                    title: course.title,
                    selectedCategory: course.selectedCategory,
                    online: course.online,
                    faceToFace: course.faceToFace,
                    price: course.price,
                    description: course.description,
                    location: course.location,
                    isLoading: false,
                    refreshing: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            });
    };


    findUser = (userId) => {
        firebase.firestore().collection('users').doc(userId).get().then((user) => {
            const userProfile = user.data();
            this.setState({
                username: userProfile.username,
                school: userProfile.school,
                linkedIn: userProfile.linkedIn,
                phone: userProfile.phone,
                email: userProfile.email,
            });

            const isFavour = _.some(this.state.favourList, (course) => {
                return course === this.state.courseId;
            });
            this.setState({
                isFavour: isFavour
            })
            const storage = firebase.storage().refFromURL('gs://tutu-project.appspot.com/avatar/' + this.state.userId);
            storage.getDownloadURL().then((result) => {
                console.log('avatar loaded');
                this.setState({avatar: result})
            }).catch((error) => {
                const userDefaultAvatarRef = firebase.storage().refFromURL('gs://tutu-project.appspot.com/avatar/user_avatar.png');
                userDefaultAvatarRef.getDownloadURL().then((result) => {
                    this.setState({avatar: result})
                })
            });
        });


    };

    goBack = () => {
        this.props.navigation.navigate(this.state.previousScreen);
    }

    findCategory = (shortCut) => {
        const category = _.find(CATEGORY, (item) => {
            return item.value === shortCut;
        });
        return category.label;
    };

    renderViewMore(onPress) {
        return (
            <Text style={{color: '#e6b800', marginTop: 5}} onPress={onPress}>Read more</Text>
        )
    }

    renderViewLess(onPress) {
        return (
            <Text style={{color: '#e6b800', marginTop: 5}} onPress={onPress}>Read less</Text>
        )
    }

    handlePressFavour = () => {
        this.setState({
            isFavour: !this.state.isFavour,
        }, () => {
            const user = firebase.auth().currentUser;
            const db = firebase.firestore().collection('users').doc(user.uid);
            if (this.state.isFavour) {
                this.setState({favourList: this.state.favourList.concat(this.state.courseId)}, () => {
                    db.update({
                        favourList: this.state.favourList,
                    }).then((user) => {
                        console.log('added to favourite');
                        // console.log(user);
                    }).catch((error) => {
                        console.log(error)
                    });
                });
            } else {
                this.setState({
                    favourList: _.filter(this.state.favourList, (favour) => {
                        return favour !== this.state.courseId;
                    })
                }, () => {
                    db.update({
                        favourList: this.state.favourList,
                    }).then((user) => {
                        console.log('removed from favourite');
                        // console.log(user);
                    }).catch((error) => {
                        console.log(error)
                    });
                });
            }


        });

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


    render() {
        const category = this.findCategory(this.state.selectedCategory);

        return (
            <View style={styles.detailContainer}>
                <ScrollView behavior={'padding'}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginLeft: 15, marginTop: 20, width: '81%'}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                {category}
                            </Text>
                        </View>
                        {/*<View>*/}
                        {/*<CheckBox title=''*/}
                        {/*checkedColor={'#e6b800'}*/}
                        {/*checked={this.state.isFavour}*/}
                        {/*containerStyle={{backgroundColor: 'white', borderWidth: 0}}*/}
                        {/*iconType='material-community'*/}
                        {/*size={25}*/}
                        {/*checkedIcon='heart'*/}
                        {/*uncheckedIcon='heart-outline'*/}
                        {/*onPress={this.handlePressFavour}*/}

                        {/*/>*/}
                        {/*</View>*/}
                    </View>

                    <View style={{width: '70%', marginLeft: 15,}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {this.state.title}
                        </Text>
                    </View>


                    {/*avatar*/}
                    <View style={{flexDirection: 'row', marginLeft: 15, marginTop: 5}}>
                        <View style={{width: '75%', justifyContent: 'center'}}>
                            <Text style={{fontSize: 15}}>
                                Posted by {this.state.username}
                            </Text>
                            <View style={{marginLeft: -5}}>
                                <CheckBox title='Online'
                                          checkedColor={'#e6b800'}
                                          checked={this.state.online}
                                          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                                          iconType='material-community'
                                          size={15}
                                          fontFamily={'system font'}
                                          checkedIcon='check-circle'
                                          uncheckedIcon='checkbox-blank-circle-outline'
                                          disabled={true}
                                />
                                <CheckBox title='Face to face'
                                          checked={this.state.faceToFace}
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
                                              marginTop: -20,
                                          }}/>
                            </View>
                        </View>
                        <View>
                            <Avatar
                                large
                                rounded
                                source={{uri: this.state.avatar}}
                                activeOpacity={0.7}
                            />
                        </View>
                    </View>

                    {/* Course Description*/}
                    <View
                        style={{
                            borderBottomColor: '#fff5cc',
                            borderBottomWidth: 1,
                            width: '90%',
                            marginLeft: 15
                        }}
                    />
                    <View style={{marginLeft: 15, marginTop: 10,}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                            Course Description
                        </Text>
                    </View>
                    <View style={{marginTop: 3, marginLeft: 15, marginRight: 15}}>
                        <ViewMoreText
                            numberOfLines={3}
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                        >
                            <Text style={{fontSize: 15, color: '#43484d'}}>
                                {this.state.description}
                            </Text>
                        </ViewMoreText>
                    </View>
                    {/* User detail*/}
                    <View
                        style={{
                            borderBottomColor: '#fff5cc',
                            borderBottomWidth: 1,
                            width: '90%',
                            marginLeft: 15,
                            marginTop: 15
                        }}
                    />
                    <View style={{marginLeft: 15, marginTop: 10,}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                            About {this.state.username}
                        </Text>
                    </View>
                    <View style={{marginLeft: 15}}>
                        <View style={styles.userDetailContainer}>
                            <View><Icon name="school" size={16} color={'#e6b800'} type='material-community'/></View>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.userDetailText}>
                                    {this.state.school ? this.state.school : '--'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userDetailContainer}>
                            <View><Icon name="linkedin-box" size={16} color={'#e6b800'}
                                        type='material-community'/></View>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.userDetailText}>
                                    {this.state.linkedIn ? this.state.linkedIn : '--'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userDetailContainer}>
                            <View><Icon name="phone" size={16} color={'#e6b800'} type='material-community'/></View>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.userDetailText}>
                                    {this.state.phone ? this.state.phone : '--'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userDetailContainer}>
                            <View><Icon name="email" size={16} color={'#e6b800'} type='material-community'/></View>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.userDetailText}>
                                    {this.state.email ? this.state.email : '--'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userDetailContainer}>
                            <View><Icon name="map-marker" size={16} color={'#e6b800'} type='material-community'/></View>
                            <View style={{
                                marginLeft: 10, marginRight: 15
                            }}>
                                <Text style={styles.userDetailText}>
                                    {this.state.location ? this.state.location : '--'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.bottomBar} disabled={true}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: '40%', justifyContent: 'center', marginLeft: 20}}>
                                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#43484d'}}>
                                    $ {this.state.price} / hour
                                </Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                {/*<Button*/}
                                {/*buttonStyle={styles.chatButton}*/}
                                {/*icon={{name: 'heart', type: 'material-community', size: 22}}*/}
                                {/*textStyle={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)'}}*/}
                                {/*title={'Chat'}*/}
                                {/*onPress={this.handlePressFavour}*/}
                                {/*/>*/}
                                <TouchableOpacity style={styles.chatButton} onPress={this.handlePressFavour}>
                                    <CheckBox title='Favourite'
                                              checkedColor={'white'}
                                              uncheckedColor={'white'}
                                              checked={this.state.isFavour}
                                              containerStyle={{backgroundColor: 'transparent', borderWidth: 0, marginLeft: 25}}
                                              textStyle={{color: 'white', fontSize: 17}}
                                              iconType='material-community'
                                              size={25}
                                              checkedIcon='heart'
                                              uncheckedIcon='heart-outline'
                                              disabled={true}
                                              wrapperStyle={{marginLeft: 25}}
                                        // onPress={this.handlePressFavour}

                                    />
                                </TouchableOpacity>
                            </View>
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
                                    text: 'Edit Course',
                                    style: {
                                        fontSize: 17,
                                        marginHorizontal: 16,
                                        marginBottom: -10,
                                        fontWeight: '600',
                                    }
                                }}
                        />
                        <EditPostPage closeModal={this.closeModal} courseDetail={this.state}
                                      courseId={this.state.courseId}/>
                    </Modal>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        marginTop: 5
    },
    userDetailContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 5,
    },
    userDetailText: {
        fontSize: 14,
        color: '#43484d',
    },
    bottomView: {
        width: '100%',
        height: '11%',
        position: 'absolute',
        bottom: 0,
    },
    bottomBar: {
        shadowColor: 'grey',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.2,
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatButton: {
        backgroundColor: '#e6b800',
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 150,
        height: 55
    }
});

export const DetailStack = createStackNavigator({
    Detail: {
        screen: DetailPage
    }
});
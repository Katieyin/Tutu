import React, {Component} from 'react';
import {View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import firebase from 'react-native-firebase';
import _ from "lodash";

export class FavoritesPage extends Component {
    constructor() {
        super();
        const user = firebase.auth().currentUser;
        firebase.firestore().collection('users').doc(user.uid).get().then((user) => {
            const userProfile = user.data();
            this.setState({
                favourList: userProfile.favourList
            });
        });
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false,
            fullDataSource: [],
            query: ''
        }
    }

    componentDidMount() {
        this.fetchingCourse();
    }

    renderItem = ({item}) => {
        const listItem = item.data();
        const categoryImage = this.findImage(listItem.selectedCategory);

        return (
                <TouchableOpacity
                    style={{flex: 1, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white'}}
                    onPress={() => {
                        this.props.navigation.navigate('Detail', {
                            course: listItem,
                            categoryImage: categoryImage,
                            courseId: item.id,
                            previousScreen: 'Favorites'
                        })
                    }}
                >
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
                </TouchableOpacity>)
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

    handleRefresh = () => {
        console.log('in refresh');
        const user = firebase.auth().currentUser;
        firebase.firestore().collection('users').doc(user.uid).get().then((user) => {
            const userProfile = user.data();
            this.setState({
                favourList: userProfile.favourList,
                refreshing: true
            }, () => {
                this.fetchingCourse();
            });
        });

    }

    fetchingCourse = () => {
        console.log('in fetching')
        firebase.firestore().collection('courses').get()
            .then(snapshot => {
                const data = snapshot._docs;
                const courses = _.filter(data, item => {
                    return _.some(this.state.favourList, (course) => {
                        return course === item.id;
                    });
                });

                console.log(courses);
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

    render() {
        return (
            this.state.isLoading ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'} color={'black'} animating/>
                </View>
                :
                <View style={styles.favouriteContainer}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View>

        );
    }
}

export const FavoritesStack = createStackNavigator({
    Favorites: {
        screen: FavoritesPage,
        navigationOptions: {
            title: 'Favorites',
            headerStyle: {
                backgroundColor: '#f1c002',
                borderBottomWidth: 0,
            },
        }
    }
});


const styles = StyleSheet.create({
    favouriteContainer: {
        flex: 1,
        height: '100%'
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
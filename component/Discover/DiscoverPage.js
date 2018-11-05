import React, {Component} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import {createStackNavigator} from "react-navigation";
import Search from 'react-native-search-box';
import firebase from 'react-native-firebase';

export class DiscoverPage extends Component {
    constructor() {
        super();
        this.state = {
            type: 'found',
            loading: true,
            list: [],
            dataSource: [],
        }
    }


    renderItem = ({item}) => {
        const listItem = item.data();
        console.log(listItem);
        const categoryImage = this.findImage(listItem.selectedCategory);
        return (
            <View>
                {categoryImage}
                <View>
                    <Text>
                        {listItem.title}
                    </Text>
                </View>
            </View>)
    };

    findImage = (category) => {
        if (category === 'ARTH') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/ARTH.png")}/>)
        } else if (category === 'BIOL') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/BIOL.png")}/>)
        } else if (category === 'BUSI') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/BUSI.png")}/>)
        } else if (category === 'CHEM') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/CHEM.png")}/>)
        } else if (category === 'COMP') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/COMP.png")}/>)
        } else if (category === 'ECON') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/ECON.png")}/>)
        } else if (category === 'ENGI') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/ENGI.png")}/>)
        } else if (category === 'ENGL') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/ENGL.png")}/>)
        } else if (category === 'HIST') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/HIST.png")}/>)
        } else if (category === 'JOUR') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/JOUR.png")}/>)
        } else if (category === 'LAW') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/LAW.png")}/>)
        } else if (category === 'MATH') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/MATH.png")}/>)
        } else if (category === 'PHYS') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/PHYS.png")}/>)
        } else if (category === 'PSYC') {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/PSYC.png")}/>)
        } else {
            return (<Image style={{width: 100, height: 100}} source={require("../../asset/categories/OTHER.png")}/>)
        }
    }

    componentDidMount() {
        console.log("in componentDidMount");
        firebase.firestore().collection('courses').get()
            .then(snapshot => {
                this.setState({
                    dataSource: snapshot._docs
                })
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.discoverContainer}>
                {/*<Search*/}
                {/*ref="search_box"*/}
                {/*backgroundColor='#f88523'*/}
                {/*/>*/}
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    discoverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export const DiscoverStack = createStackNavigator({
    Discover: {
        screen: DiscoverPage,
        navigationOptions: {
            title: 'Discover'
        }
    }
});

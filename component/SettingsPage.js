// import React, {Component} from 'react';
// import {Button, Avatar, List, ListItem, Icon, Tile} from 'react-native-elements';
// import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
// import firebase from 'react-native-firebase';
// import {createStackNavigator} from "react-navigation";
// import {ProfilePage} from "./Profile/ProfilePage";
//
// export class SettingsPage extends Component {
//     static navigationOptions = ({navigation}) => {
//         return{
//             title: 'Settings',
//             headerLeft: (
//                 <View style={{marginRight: 10}}>
//                     <Icon name="square-edit-outline" size={25} type='material-community' color='#88959F'
//                           onPress={()=>{navigation.navigate('Profile')}}/>
//                 </View>
//             ),
//         }
//     }
//     render() {
//
//         const list = [
//             {
//                 title: 'Edit Profile',
//                 icon: 'edit',
//                 iconType: 'material-community',
//                 hideChevron: false
//             },
//             {
//                 title: 'Change Password',
//                 rightTitle: 'ttt@tt.com',
//                 icon: 'email',
//                 iconType: 'material-community',
//                 hideChevron: false
//             },
//             {
//                 title: 'Sign out',
//                 rightTitle: 'ttt@tt.com',
//                 icon: 'email',
//                 iconType: 'material-community',
//                 hideChevron: false
//             },
//
//
//         ];
//
//
//         return (
//             <ScrollView>
//                 <List style={{marginTop: 5}}>
//                     {
//                         list.map((item) => (
//                             <ListItem
//                                 key={item.title}
//                                 title={item.title}
//                                 rightTitle={item.rightTitle ? item.rightTitle : null}
//                                 hideChevron={item.hideChevron}
//                                 leftIcon={{name: item.icon, type: item.iconType}}
//                                 containerStyle={{height: 50}}
//                                 onPress={item.onPress}
//                             />
//                         ))
//                     }
//                 </List>
//             </ScrollView>
//         );
//     }
// }
//
// export const SettingsStack = createStackNavigator({
//     Settings: {
//         screen: SettingsPage,
//         navigationOptions: {
//
//         }
//     }
// });
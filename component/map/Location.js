import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

export class Location extends Component {
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder={'Please enter your address here'}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                // enablePoweredByContainer={false}
                renderDescription={(row) => row.description} // custom description render
                getDefaultValue={() => ''} // text input default value
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyAlW2usBD_RoDPDjToE4V8heYNWiPmIhUI',
                    language: 'en'
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                styles={styles}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        )
    }
}

const styles =  StyleSheet.create({
    description: {
        fontWeight: 'bold',
        borderWidth: 0
    },
    container: {
        paddingHorizontal: 20
    },
    textInputContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 1
    },
    textInput: {
        marginLeft: -10,
        marginRight: 0,
        color: '#dbdbde'
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
    }
})
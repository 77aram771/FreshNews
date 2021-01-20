import React from 'react';
import {GOOGLE_MAPS_APIKEY, size20, WINDOW_WIDTH} from '../../../../share/consts';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {imagesPaths} from '../../../../share/info';
import {MontserratRegular, MontserratSemiBold} from '../../../../share/fonts';
import {NavigationProps} from '../../../../share/interfaces';
import {observer} from 'mobx-react';
import shopsStore from '../../../../stores/ShopsStore';
import {AntDesign} from "@expo/vector-icons";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from "react-native-vector-icons/Fontisto";

interface HeaderContentInterface {
    getGeocodeAsync: any,
    navigation: any,
    items: any
}

@observer
export default // @ts-ignore
class HeaderContent extends React.Component<HeaderContentInterface, NavigationProps> {
    render() {
        const {
            clientAddress,
            onChangeClientAddress
        } = shopsStore;
        // console.log('clientAddress', clientAddress);
        return (
            <View
                style={{
                    flexDirection: "column"
                }}
            >
                {
                    this.props.items.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('MapPage', {
                                    order_id: item.id
                                })}
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    width: '100%',
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    backgroundColor: '#8CC83F',
                                }}
                            >
                                <View
                                    style={{
                                        width: WINDOW_WIDTH - 40,
                                        justifyContent: 'space-around',
                                        alignItems: "center",
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            fontFamily: MontserratSemiBold
                                        }}
                                    >
                                        В пути заказ {item.id}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 15,
                                            fontFamily: MontserratSemiBold
                                        }}
                                    >
                                        {item.delivery_time} мин.
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <AntDesign name="right" size={18} color="#fff"/>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                <ImageBackground
                    style={{
                        width: WINDOW_WIDTH,
                        height: WINDOW_WIDTH / 1.5,
                    }}
                    source={imagesPaths.backgroundListImage}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            paddingTop: 80,
                            paddingBottom: 25,
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: 15,
                                fontFamily: MontserratRegular,
                                textAlign: 'center',
                            }}
                        >
                            Быстрая доставка свежих{'\n'} овощей и фруктов на дом 24/7{' '}
                            {'\n'}
                            Москва
                        </Text>
                        <View
                            style={{
                                width: WINDOW_WIDTH - 40,
                                height: 50,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                            }}
                        >
                            <GooglePlacesAutocomplete
                                placeholder='Куда доставляем?'
                                fetchDetails={true}
                                onPress={data => {
                                    if (data.description !== undefined) {
                                        // console.log('data', data.structured_formatting.main_text);
                                        onChangeClientAddress(data.structured_formatting.main_text)
                                    } else {
                                        // console.log(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                        onChangeClientAddress(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                    }
                                }}
                                textInputProps={{
                                    value: clientAddress,
                                    onChangeText: (text) => {
                                        onChangeClientAddress(text)
                                    }
                                }}
                                query={{
                                    key: GOOGLE_MAPS_APIKEY,
                                    language: 'ru', // language of the results
                                    components: "country:ru",
                                    types: ['address'], // default: 'geocode'
                                    region: "RU", //It removes the country name from the suggestion list
                                    location: '55.751244, 37.618423',
                                    radius: '55000', //100 km
                                }}
                                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI={'GoogleReverseGeocoding'} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                    language: 'ru',
                                }}
                                enablePoweredByContainer={false}
                                renderDescription={row => row.description || row.formatted_address || row.name}
                                styles={{
                                    container: {
                                        height: 50,
                                    },
                                    textInput: {
                                        height: 50,
                                        textAlign: "center"
                                    },
                                    textInputContainer: {
                                        flexDirection: 'row',
                                        height: 50,
                                    },
                                    poweredContainer: {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderColor: '#c8c7cc',
                                    },
                                    powered: {},
                                    description: {
                                        fontWeight: 'bold',
                                    },
                                    listView: {
                                        marginTop: 50,
                                        elevation: 1,
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        zIndex: 500,
                                    },
                                    row: {
                                        backgroundColor: '#fff',
                                        height: 50,
                                        flexDirection: 'row',
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                    },
                                }}
                                renderLeftButton={() => (<TouchableOpacity
                                    style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        backgroundColor: '#EBEBEB',
                                        width: 45,
                                        height: 50,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    onPress={() => this.props.getGeocodeAsync()}
                                >
                                    <Icon name={'map-marker'} size={size20} color={'#8CC83F'}/>
                                </TouchableOpacity>)}
                                debounce={300}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

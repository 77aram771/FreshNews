import React, {Component} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {observer} from 'mobx-react';
import Header from '../../../../../share/components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomInput} from '../../../../../share/components/CustomInput';
import {
    GOOGLE_MAPS_APIKEY,
    size12,
    size16,
    size20,
    size34,
    size44,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from '../../../../../share/consts';
import {MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import userInfo from "../../../../../stores/UserInfo";
import {toJS} from 'mobx';
import RNPickerSelect from 'react-native-picker-select';
import paymentStore from "../../../../../stores/PaymentStore";
import {LogoAndTitle} from "../../../../../share/components/LogoAndTitle";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const placeholder = {
    label: 'Выберите один из адресов',
    value: null,
    color: '#9EA0A4',
};
const placeholder2 = {
    label: 'Выберите один из времини',
    value: null,
    color: '#9EA0A4',
};

@observer
export default // @ts-ignore
class PaymentPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            porch: '',
            level: '',
            apartment: '',
            intercom: '',
            messageToCourier: '',
            addressInput: false,
            porchInput: false,
            levelInput: false,
            apartmentInput: false,
            intercomInput: false,
            disabledBool: true,
            selectAddress: '',
            selectTime: '',
            addressArray: [],
            timeArray: []
        };
    };

    async componentDidMount() {
        await paymentStore.orderUserTime();
        await userInfo.getUserData();
        const {time} = paymentStore;
        for (let key in toJS(time)) {
            if (toJS(time).hasOwnProperty(key)) {
                this.state.timeArray.push(({
                    label: toJS(time)[key],
                    value: toJS(time)[key],
                }))
            }
        }
    }

    handleValidationAddress(value: string) {
        if (value.length === 0) {
            this.setState({
                addressInput: false,
                address: value,
                disabledBool: true
            })
        } else {
            this.setState({
                address: value,
                addressInput: true,
            })
        }

        if (this.state.addressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.apartmentInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                disabledBool: false
                            })
                        }
                    }
                }
            }
        }
    };

    handleValidationPorch(value: string) {
        if (value.length === 0) {
            this.setState({
                porchInput: false,
                porch: value,
                disabledBool: true
            })
        } else {
            this.setState({
                porch: value,
                porchInput: true,
            })
        }

        if (this.state.addressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.apartmentInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                disabledBool: false
                            })
                        }
                    }
                }
            }
        }
    };

    handleValidationLevel(value: string) {
        if (value.length === 0) {
            this.setState({
                levelInput: false,
                level: value,
                disabledBool: true
            })
        } else {
            this.setState({
                level: value,
                levelInput: true,
            })
        }

        if (this.state.addressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.apartmentInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                disabledBool: false
                            })
                        }
                    }
                }
            }
        }
    };

    handleValidationApartment(value: string) {
        if (value.length === 0) {
            this.setState({
                apartmentInput: false,
                apartment: value,
            })
        } else {
            this.setState({
                apartment: value,
                apartmentInput: true,
            })
        }

        if (this.state.addressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.apartmentInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                disabledBool: false
                            })
                        }
                    }
                }
            }
        }
    };

    handleValidationIntercom(value: string) {
        if (value.length === 0) {
            this.setState({
                intercomInput: false,
                intercom: value,
            })
        } else {
            this.setState({
                intercom: value,
                intercomInput: true,
            })
        }

        if (this.state.addressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.apartmentInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                disabledBool: false
                            })
                        }
                    }
                }
            }
        }
    };

    handleComment(value: string) {
        this.setState({messageToCourier: value});
        paymentStore.handleComment(value);
    };

    async handleSelectAddress(value: string) {
        if (value) {
            this.setState({
                selectAddress: value,
            }, () => {
                if (this.state.selectAddress.length > 0) {
                    if (this.state.selectTime.length > 0) {
                        this.setState({
                            disabledBool: false
                        })
                    }
                }
            });
        } else {
            this.setState({
                selectAddress: '',
            })
        }
        await paymentStore.getSelectAddress(value);
    };

    async handleSelectTime(value: any) {
        if (value) {
            this.setState({
                selectTime: value,
            }, () => {
                if (this.state.selectAddress.length > 0) {
                    if (this.state.selectTime.length > 0) {
                        this.setState({
                            disabledBool: false
                        })
                    }
                }
            });
        } else {
            this.setState({
                selectTime: '',
            })
        }
        await paymentStore.getSelectTime(value);
    };

    handleClick() {
        let addressObj = {
            address: this.state.address,
            porch: this.state.porch,
            level: this.state.level,
            apartment: this.state.apartment,
            intercom: this.state.intercom,
            messageToCourier: this.state.messageToCourier,
        }
        this.props.navigation.navigate('AssemblyPage', {
            navAddress: addressObj
        });
    };

    render() {
        const {
            address,
            porch,
            level,
            apartment,
            intercom,
            messageToCourier,
            disabledBool,
            timeArray,
            selectTime,
            selectAddress
        } = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <Header
                    style={styles.header}
                    headerLeft={
                        <AntDesign
                            onPress={() => this.props.navigation.goBack()}
                            style={{paddingLeft: 8}}
                            name={'left'}
                            size={18}
                            color={'#464646'}
                        />
                    }
                    headerMid={<LogoAndTitle/>}
                />
                <ScrollView style={{paddingHorizontal: 26}} keyboardShouldPersistTaps={'always'}>
                    <Text
                        style={{
                            color: '#BABABA',
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            paddingTop: size34,
                            marginBottom: 20
                        }}
                    >
                        Адрес доставки
                    </Text>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={toJS(userInfo.userDataArray)}
                        onValueChange={value => this.handleSelectAddress(value)}
                        style={pickerSelectStyles}
                        value={selectAddress}
                        useNativeAndroidPickerStyle={false}
                    />
                    <Text
                        style={{
                            color: '#BABABA',
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            paddingTop: size34,
                            marginBottom: 20
                        }}
                    >
                        Время доставки
                    </Text>
                    <RNPickerSelect
                        placeholder={placeholder2}
                        items={timeArray}
                        onValueChange={value => this.handleSelectTime(value)}
                        style={pickerSelectStyles}
                        value={selectTime}
                        useNativeAndroidPickerStyle={false}
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        {
                            selectAddress
                                ? <View/>
                                : <>
                                    <Text
                                        style={{
                                            fontSize: size12,
                                            fontFamily: MontserratRegular,
                                            paddingTop: 36,
                                            color: '#000000',
                                        }}
                                    >
                                        Адрес
                                    </Text>
                                    {/*<CustomInput*/}
                                    {/*    value={address}*/}
                                    {/*    onChangeText={value => this.handleValidationAddress(value)}*/}
                                    {/*    textInputStyle={{flex: 1}}*/}
                                    {/*    style={{*/}
                                    {/*        justifyContent: 'flex-start',*/}
                                    {/*        marginTop: 16,*/}
                                    {/*        height: 40*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <View style={{zIndex: 1}}>
                                        <GooglePlacesAutocomplete
                                            placeholder=''
                                            fetchDetails={true}
                                            onPress={data => {
                                                if (data.description !== undefined) {
                                                    // console.log('data', data.structured_formatting.main_text);
                                                    this.handleValidationAddress(data.structured_formatting.main_text)
                                                } else {
                                                    // console.log(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                                    // @ts-ignore
                                                    this.handleValidationAddress(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                                }
                                            }}
                                            textInputProps={{
                                                value: address,
                                                onChangeText: (text) => {
                                                    this.handleValidationAddress(text)
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
                                                    textAlign: "center",
                                                    backgroundColor: '#F5F4F4',
                                                    marginTop: 16,
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
                                            debounce={300}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingTop: size44,
                                        }}
                                    >
                                        <View>
                                            <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>
                                                Подъезд{'    '}
                                            </Text>
                                            <CustomInput
                                                keyboardType={'numeric'}
                                                maxLength={2}
                                                value={porch}
                                                onChangeText={value => this.handleValidationPorch(value)}
                                                textInputStyle={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    fontFamily: MontserratRegular,
                                                    fontSize: size16,
                                                    paddingHorizontal: 6,
                                                }}
                                                style={{
                                                    justifyContent: 'flex-start',
                                                    marginTop: 16,
                                                    height: 40
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>
                                                Этаж{'          '}
                                            </Text>
                                            <CustomInput
                                                keyboardType={'numeric'}
                                                maxLength={2}
                                                value={level}
                                                onChangeText={value => this.handleValidationLevel(value)}
                                                textInputStyle={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    fontFamily: MontserratRegular,
                                                    fontSize: size16,
                                                    paddingHorizontal: 8,
                                                }}
                                                style={{
                                                    justifyContent: 'flex-start',
                                                    marginTop: 16,
                                                    height: 40
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>
                                                Квартира{'     '}
                                            </Text>
                                            <CustomInput
                                                keyboardType={'numeric'}
                                                maxLength={4}
                                                value={apartment}
                                                onChangeText={value => this.handleValidationApartment(value)}
                                                textInputStyle={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    fontFamily: MontserratRegular,
                                                    fontSize: size16,
                                                    paddingHorizontal: 8,
                                                }}
                                                style={{
                                                    justifyContent: 'flex-start',
                                                    marginTop: 16,
                                                    height: 40
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>
                                                Домофон{'     '}
                                            </Text>
                                            <CustomInput
                                                //keyboardType={'numeric'}
                                                maxLength={4}
                                                value={intercom}
                                                onChangeText={value => this.handleValidationIntercom(value)}
                                                textInputStyle={{
                                                    flex: 1,
                                                    paddingHorizontal: 4,
                                                    textAlign: 'center',
                                                    fontFamily: MontserratRegular,
                                                    fontSize: size16,
                                                }}
                                                style={{
                                                    justifyContent: 'flex-start',
                                                    marginTop: 16,
                                                    height: 40
                                                }}
                                            />
                                        </View>
                                    </View>
                                </>
                        }
                        <Text
                            style={{
                                fontSize: size16,
                                fontFamily: MontserratRegular,
                                paddingTop: size44,
                                paddingBottom: 20
                            }}
                        >
                            Сообщение для курьера
                        </Text>
                        <CustomInput
                            multiline={true}
                            numberOfLines={3}
                            value={messageToCourier}
                            onChangeText={value => this.handleComment(value)}
                            textInputStyle={{
                                flex: 1,
                                fontFamily: MontserratRegular,
                                fontSize: size12,
                                padding: 20,
                                textAlign: "left",
                            }}
                            style={{
                                justifyContent: 'flex-start',
                                maxHeight: WINDOW_WIDTH / 4,
                                height: WINDOW_HEIGHT / 3,
                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.handleClick()}
                    disabled={disabledBool}
                    style={{
                        backgroundColor: disabledBool ? 'grey' : '#8CC83F',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 27,
                    }}
                >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontFamily: MontserratRegular,
                            fontSize: size20,
                        }}
                    >
                        Оформить заказ
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: size16,
    },
    headerMiddleTitle: {
        fontFamily: MontserratRegular,
        fontSize: size20,
        color: '#000000',
        paddingBottom: 4,
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,  // to ensure the text is never behind the icon
    },
});

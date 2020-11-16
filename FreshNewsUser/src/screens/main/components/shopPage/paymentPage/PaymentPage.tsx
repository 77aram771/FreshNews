import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {observer} from 'mobx-react';
import Header from '../../../../../share/components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomInput} from '../../../../../share/components/CustomInput';
import {
    size12,
    size16,
    size20,
    size34,
    size44, WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../../share/consts';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import {NavigationProps} from '../../../../../share/interfaces';
import userInfo from "../../../../../stores/UserInfo";
import {toJS} from 'mobx';
import RNPickerSelect from 'react-native-picker-select';
import paymentStore from "../../../../../stores/PaymentStore";

@observer
export default // @ts-ignore
class PaymentPage extends Component<NavigationProps> {

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

    componentDidMount() {
        paymentStore.orderUserTime();
        userInfo.getUserData();
        const {userData} = userInfo;
        const {addresses} = userData;
        addresses.map((item: any) => {
            this.state.addressArray.push({
                label: toJS(item.address),
                value: toJS(item.address),
            })
        });
        const {time} = paymentStore;
        for (let key in toJS(time)) {
            if (toJS(time).hasOwnProperty(key)) {
                this.state.timeArray.push(({
                    label: toJS(time)[key],
                    value: toJS(time)[key],
                }))
            }
        }
        ;
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

    handleSelectAddress(value: string) {
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
        paymentStore.getSelectAddress(value);
    };

    handleSelectTime(value: any) {
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
        paymentStore.getSelectTime(value);
    }

    render() {
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

        const {
            address,
            porch,
            level,
            apartment,
            intercom,
            messageToCourier,
            addressInput,
            porchInput,
            levelInput,
            apartmentInput,
            intercomInput,
            disabledBool
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
                            size={size16}
                            color={'#464646'}
                        />
                    }
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>
                            Заказы в{' '}
                            <Text style={{fontFamily: MontserratSemiBold, color: '#8CC83F'}}>
                                Supermango
                            </Text>
                        </Text>
                    }
                />
                <ScrollView style={{paddingHorizontal: 26}}>
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
                        items={this.state.addressArray}
                        onValueChange={value => this.handleSelectAddress(value)}
                        style={pickerSelectStyles}
                        value={this.state.selectAddress}
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
                        items={this.state.timeArray}
                        onValueChange={value => this.handleSelectTime(value)}
                        style={pickerSelectStyles}
                        value={this.state.selectTime}
                        useNativeAndroidPickerStyle={false}
                    />
                    {
                        this.state.selectAddress
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
                                <CustomInput
                                    value={address}
                                    onChangeText={value => this.handleValidationAddress(value)}
                                    textInputStyle={{flex: 1}}
                                    style={{
                                        justifyContent: 'flex-start',
                                        marginTop: 16,
                                        height: 40
                                    }}
                                />
                                <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
                                    <Text
                                        style={{
                                            fontFamily: MontserratBold
                                        }}
                                    >
                                        Пример: {' '}
                                        <Text
                                            style={{
                                                fontFamily: MontserratSemiBold
                                            }}
                                        >Москва ул. Тверская 11</Text></Text>
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
                        }}
                        style={{
                            justifyContent: 'flex-start',
                            marginTop: 16,
                            maxHeight: WINDOW_WIDTH / 4,
                            height: WINDOW_HEIGHT / 3
                        }}
                    />
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AssemblyPage')}
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
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

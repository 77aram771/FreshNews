import React, {Component} from 'react';
import {
    KeyboardAvoidingView, Platform,
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
    size14,
    size16,
    size20,
    size32,
    size44, WINDOW_WIDTH,
} from '../../../../../share/consts';
import {MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import {NavigationProps} from '../../../../../share/interfaces';
import {PaymentElement} from './PaymentElement';
import paymentStore from "../../../../../stores/PaymentStore";
import RNPickerSelect from "react-native-picker-select";
import userInfo from "../../../../../stores/UserInfo";
import {toJS} from "mobx";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import {TextInput} from 'react-native-gesture-handler';

let moment = require('moment');

@observer
export default // @ts-ignore
class FinishPaymentPage extends Component<NavigationProps> {

    state = {
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
        promotionalCode: '',
        selectAddress: '',
        selectTime: '',
        addressArray: [],
        timeArray: [],
        card: null,
        cardNumber: '',
        cardName: '',
        cardDate: '',
        cardCVC: '',
    };

    componentDidMount() {
        const NewDate = moment().format('YYYY-MM-DD');
        const NewTime = moment().format('HH:mm');
        this.setState({
            date: NewDate,
            time: NewTime
        });
        // userInfo.getUserData();
        // const {userData} = userInfo;
        // const {addresses} = userData;
        // addresses.map((item: any) => {
        //     this.state.addressArray.push({
        //         label: toJS(item.address),
        //         value: toJS(item.address),
        //     })
        // });
        // addresses.find((item: any) => {
        //     if (item.address === paymentStore.selectAddress) {
        //         this.setState({
        //             selectAddress: item.address
        //         })
        //     }
        // });
        // const {orderUserTime} = paymentStore;
        // orderUserTime();
    };

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

    handleSelectAddress(value: string) {
        if (value) {
            this.setState({
                selectAddress: value,
            }, () => {
                if (this.state.selectAddress.length > 0) {
                    this.setState({
                        disabledBool: false
                    })
                }
            });
        } else {
            this.setState({
                selectAddress: '',
            })
        }
    };

    handlePayment() {
        paymentStore.finishPayment(this.props.navigation.state.params.id, paymentStore.isSelectedPayment)
        this.props.navigation.navigate('FinishPaymentScreen')
    };

    handleChangeMethods(value: string) {
        paymentStore.onSelectPayment(value);
        if (paymentStore.isSelectedPayment === 'cardToCourier') {
            this.setState({
                disabledBool: false,
                card: null
            })
        } else if (paymentStore.isSelectedPayment === 'cash') {
            this.setState({
                disabledBool: false,
                card: null
            })
        } else if (paymentStore.isSelectedPayment === 'online') {
            this.setState({
                disabledBool: true,
                card: null
            })
        }
    };

    handleGetCard(item: any) {
        this.setState({
            card: item.value,
            disabledBool: false
        })
    };

    handleValidationCardNumber(value: any) {
        console.log('Number value', value);
        this.setState({
            cardNumber: value
        })
    };

    handleValidationCardName(value: any) {
        console.log('Name value', value);
        this.setState({
            cardName: value
        })
    };

    handleValidationCardDate(value: any) {
        let reg = /(0[1-9]|1[0-2])\/[0-9]{2}/;
        if (value.indexOf('.') >= 0 || value.length > 5) {
            return;
        }

        if (value.length === 2 && this.state.cardDate.length === 1) {
            value += '/'
        }
        this.setState({
            cardDate: value
        });

    };

    handleValidationCardCVC(value: any) {
        console.log('CVC value', value);
        this.setState({
            cardCVC: value
        });
    };

    render() {
        const placeholder = {
            label: 'Выберите один из адресов',
            value: null,
            color: '#9EA0A4',
        };
        const cards = [
            {
                label: '41111111111111',
                value: '41111111111111',
                icon: () => <Icon name="visa" size={18} color="grey"/>,
                hidden: false
            },
            {
                label: '51111111111111',
                value: '51111111111111',
                icon: () => <Icon name="mastercard" size={18} color="grey"/>,
                hidden: false
            },
        ];
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
            disabledBool,
            promotionalCode,
            card,
            cardNumber,
            cardName,
            cardDate,
            cardCVC,
        } = this.state;

        const {isSelectedPayment} = paymentStore;

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
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>
                            Заказы в{' '}
                            <Text style={{fontFamily: MontserratSemiBold, color: '#8CC83F'}}>
                                {this.props.navigation.state.params.shopName}
                            </Text>
                        </Text>
                    }
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{
                        flex: 1
                    }}
                >
                    <ScrollView
                        style={{
                            paddingHorizontal: 26,
                            paddingBottom: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#BABABA',
                                fontFamily: MontserratSemiBold,
                                fontSize: size20,
                                paddingTop: 14,
                                marginBottom: 20
                            }}
                        >
                            Способ отплаты
                        </Text>
                        <>
                            <View style={{flexDirection: 'row', paddingTop: 24}}>
                                <PaymentElement
                                    title={'Онлайн'}
                                    paymentKey={'online'}
                                    isSelectedPayment={isSelectedPayment}
                                    onSelectPayment={(payment: string) => this.handleChangeMethods(payment)}
                                />
                                <PaymentElement
                                    style={{marginLeft: 16}}
                                    title={'Картой курьеру'}
                                    paymentKey={'cardToCourier'}
                                    isSelectedPayment={isSelectedPayment}
                                    onSelectPayment={(payment: string) => this.handleChangeMethods(payment)}
                                />
                            </View>
                            <View style={{flexDirection: 'row', paddingTop: 11}}>
                                <PaymentElement
                                    title={'Наличные'}
                                    paymentKey={'cash'}
                                    isSelectedPayment={isSelectedPayment}
                                    onSelectPayment={(payment: string) => this.handleChangeMethods(payment)}
                                />
                                {/*<PaymentElement*/}
                                {/*    style={{marginLeft: 16}}*/}
                                {/*    paymentKey={'applePay'}*/}
                                {/*    isSelectedPayment={isSelectedPayment}*/}
                                {/*    onSelectPayment={() => this.handleApplePay()}*/}
                                {/*/>*/}
                            </View>
                            {
                                isSelectedPayment === 'online'
                                    ? (
                                        <View
                                            style={{
                                                marginTop: 20,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#BABABA',
                                                    fontFamily: MontserratSemiBold,
                                                    fontSize: size20,
                                                    paddingTop: 14,
                                                    marginBottom: 20
                                                }}
                                            >
                                                Кредитные карты
                                            </Text>
                                            <DropDownPicker
                                                placeholder={'Выберите один из кредитных карт'}
                                                items={cards}
                                                containerStyle={{
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderColor: 'gray',
                                                    borderRadius: 5,
                                                }}
                                                itemStyle={{justifyContent: 'flex-start', height: 50}}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => this.handleGetCard(item)}
                                                placeholderStyle={{color: '#9EA0A4', fontSize: 16}}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: size16,
                                                    fontFamily: MontserratRegular,
                                                    paddingTop: 20,
                                                    marginBottom: 10,
                                                    color: '#000000',
                                                }}
                                            >
                                                Способы оплаты кредитной картой
                                            </Text>
                                            <View
                                                style={{
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    width: '100%',
                                                    height: 30
                                                }}
                                            >
                                                <Icon name="visa" size={20} color="grey" style={{marginRight: 5}}/>
                                                <Icon name="mastercard" size={20} color="grey" style={{marginRight: 5}}/>
                                                <Icon name="jcb" size={20} color="grey" style={{marginRight: 5}}/>
                                                <Icon name="discover" size={20} color="grey" style={{marginRight: 5}}/>
                                                <Icon name="american-express" size={20} color="grey"
                                                      style={{marginRight: 5}}/>
                                            </View>
                                            {
                                                card === null
                                                    ? (
                                                        <>
                                                            <Text
                                                                style={{
                                                                    fontSize: size16,
                                                                    fontFamily: MontserratRegular,
                                                                    paddingTop: 14,
                                                                    color: '#000000',
                                                                }}
                                                            >
                                                                Номер карты
                                                            </Text>
                                                            <CustomInput
                                                                maxLength={12}
                                                                keyboardType={'numeric'}
                                                                value={cardNumber}
                                                                onChangeText={value => this.handleValidationCardNumber(value)}
                                                                textInputStyle={{flex: 1}}
                                                                style={{
                                                                    justifyContent: 'flex-start',
                                                                    marginTop: 12,
                                                                    height: 48
                                                                }}
                                                            />
                                                            <Text
                                                                style={{
                                                                    fontSize: size16,
                                                                    fontFamily: MontserratRegular,
                                                                    paddingTop: 14,
                                                                    color: '#000000',
                                                                }}
                                                            >
                                                                Имя владельца карты
                                                            </Text>
                                                            <CustomInput
                                                                value={cardName}
                                                                onChangeText={value => this.handleValidationCardName(value)}
                                                                textInputStyle={{flex: 1}}
                                                                style={{
                                                                    justifyContent: 'flex-start',
                                                                    marginTop: 12,
                                                                    height: 48
                                                                }}
                                                            />
                                                            <View
                                                                style={{
                                                                    flexDirection: "row",
                                                                    justifyContent: "space-between",
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection: "column",
                                                                        width: '40%'
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: size16,
                                                                            fontFamily: MontserratRegular,
                                                                            marginTop: 14,
                                                                            marginBottom: 14,
                                                                            color: '#000000',
                                                                        }}
                                                                    >
                                                                        Дата
                                                                    </Text>
                                                                    <CustomInput
                                                                        maxLength={5}
                                                                        keyboardType={'numeric'}
                                                                        value={cardDate}
                                                                        onChangeText={value => this.handleValidationCardDate(value)}
                                                                        textInputStyle={{flex: 1}}
                                                                        style={{
                                                                            justifyContent: 'flex-start',
                                                                            width: '100%',
                                                                            height: 48,
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        flexDirection: "column",
                                                                        width: '40%'
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: size16,
                                                                            fontFamily: MontserratRegular,
                                                                            marginTop: 14,
                                                                            marginBottom: 14,
                                                                            color: '#000000',
                                                                        }}
                                                                    >
                                                                        CVC/CVV
                                                                    </Text>
                                                                    <CustomInput
                                                                        maxLength={3}
                                                                        keyboardType={'numeric'}
                                                                        value={cardCVC}
                                                                        onChangeText={value => this.handleValidationCardCVC(value)}
                                                                        textInputStyle={{flex: 1}}
                                                                        style={{
                                                                            justifyContent: 'flex-start',
                                                                            width: '100%',
                                                                            height: 48,
                                                                        }}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </>
                                                    )
                                                    : <View/>
                                            }
                                        </View>
                                    )
                                    : (
                                        <View/>
                                    )
                            }
                            <View
                                style={{
                                    borderColor: 'grey',
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    width: '100%',
                                    marginTop: 25
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: size16,
                                    fontFamily: MontserratRegular,
                                    marginTop: 20,
                                    color: '#000000',
                                }}
                            >
                                Промо-код
                            </Text>
                            <CustomInput
                                maxLength={10}
                                value={promotionalCode}
                                onChangeText={value => this.setState({promotionalCode: value})}
                                textInputStyle={{flex: 1}}
                                style={{
                                    justifyContent: 'flex-start',
                                    marginTop: 16,
                                    marginBottom: size44,
                                    height: 48
                                }}
                            />
                        </>
                        {/*<Text*/}
                        {/*    style={{*/}
                        {/*        color: '#BABABA',*/}
                        {/*        fontFamily: MontserratSemiBold,*/}
                        {/*        fontSize: size20,*/}
                        {/*        marginBottom: 20*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Адрес доставки*/}
                        {/*</Text>*/}
                        {/*<RNPickerSelect*/}
                        {/*    placeholder={placeholder}*/}
                        {/*    items={this.state.addressArray}*/}
                        {/*    onValueChange={value => this.handleSelectAddress(value)}*/}
                        {/*    style={pickerSelectStyles}*/}
                        {/*    value={this.state.selectAddress}*/}
                        {/*    useNativeAndroidPickerStyle={false}*/}
                        {/*/>*/}
                        {/*{*/}
                        {/*    this.state.selectAddress*/}
                        {/*        ? <View/>*/}
                        {/*        : (*/}
                        {/*            <>*/}
                        {/*                <Text*/}
                        {/*                    style={{*/}
                        {/*                        fontSize: size12,*/}
                        {/*                        fontFamily: MontserratRegular,*/}
                        {/*                        paddingTop: 36,*/}
                        {/*                        color: '#000000',*/}
                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    Адрес*/}
                        {/*                </Text>*/}
                        {/*                <CustomInput*/}
                        {/*                    value={address}*/}
                        {/*                    onChangeText={value => this.handleValidationAddress(value)}*/}
                        {/*                    textInputStyle={{flex: 1}}*/}
                        {/*                    style={{*/}
                        {/*                        justifyContent: 'flex-start',*/}
                        {/*                        marginTop: 16,*/}
                        {/*                        height: 48*/}
                        {/*                    }}*/}
                        {/*                />*/}
                        {/*                <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>*/}
                        {/*                    <Text*/}
                        {/*                        style={{*/}
                        {/*                            fontFamily: MontserratBold*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        Пример: {' '}*/}
                        {/*                        <Text*/}
                        {/*                            style={{*/}
                        {/*                                fontFamily: MontserratSemiBold*/}
                        {/*                            }}*/}
                        {/*                        >Москва ул. Тверская 11</Text></Text>*/}
                        {/*                </View>*/}
                        {/*                <View*/}
                        {/*                    style={{*/}
                        {/*                        flexDirection: 'row',*/}
                        {/*                        justifyContent: 'space-between',*/}
                        {/*                        paddingTop: size44,*/}
                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>*/}
                        {/*                            Подъезд{'    '}*/}
                        {/*                        </Text>*/}
                        {/*                        <CustomInput*/}
                        {/*                            keyboardType={'numeric'}*/}
                        {/*                            maxLength={3}*/}
                        {/*                            value={porch}*/}
                        {/*                            onChangeText={value => this.handleValidationPorch(value)}*/}
                        {/*                            textInputStyle={{*/}
                        {/*                                flex: 1,*/}
                        {/*                                textAlign: 'center',*/}
                        {/*                                fontFamily: MontserratRegular,*/}
                        {/*                                fontSize: size16,*/}
                        {/*                                paddingHorizontal: 6,*/}
                        {/*                            }}*/}
                        {/*                            style={{*/}
                        {/*                                justifyContent: 'flex-start',*/}
                        {/*                                marginTop: 16,*/}
                        {/*                                height: 48*/}
                        {/*                            }}*/}
                        {/*                        />*/}
                        {/*                    </View>*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>*/}
                        {/*                            Этаж{'          '}*/}
                        {/*                        </Text>*/}
                        {/*                        <CustomInput*/}
                        {/*                            keyboardType={'numeric'}*/}
                        {/*                            maxLength={3}*/}
                        {/*                            value={level}*/}
                        {/*                            onChangeText={value => this.handleValidationLevel(value)}*/}
                        {/*                            textInputStyle={{*/}
                        {/*                                flex: 1,*/}
                        {/*                                textAlign: 'center',*/}
                        {/*                                fontFamily: MontserratRegular,*/}
                        {/*                                fontSize: size16,*/}
                        {/*                                paddingHorizontal: 8,*/}
                        {/*                            }}*/}
                        {/*                            style={{*/}
                        {/*                                justifyContent: 'flex-start',*/}
                        {/*                                marginTop: 16,*/}
                        {/*                                height: 48*/}
                        {/*                            }}*/}
                        {/*                        />*/}
                        {/*                    </View>*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>*/}
                        {/*                            Квартира{'     '}*/}
                        {/*                        </Text>*/}
                        {/*                        <CustomInput*/}
                        {/*                            keyboardType={'numeric'}*/}
                        {/*                            maxLength={4}*/}
                        {/*                            value={apartment}*/}
                        {/*                            onChangeText={value => this.handleValidationApartment(value)}*/}
                        {/*                            textInputStyle={{*/}
                        {/*                                flex: 1,*/}
                        {/*                                textAlign: 'center',*/}
                        {/*                                fontFamily: MontserratRegular,*/}
                        {/*                                fontSize: size16,*/}
                        {/*                                paddingHorizontal: 8,*/}
                        {/*                            }}*/}
                        {/*                            style={{*/}
                        {/*                                justifyContent: 'flex-start',*/}
                        {/*                                marginTop: 16,*/}
                        {/*                                height: 48*/}
                        {/*                            }}*/}
                        {/*                        />*/}
                        {/*                    </View>*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{fontSize: size12, fontFamily: MontserratRegular}}>*/}
                        {/*                            Домофон{'     '}*/}
                        {/*                        </Text>*/}
                        {/*                        <CustomInput*/}
                        {/*                            //keyboardType={'numeric'}*/}
                        {/*                            maxLength={4}*/}
                        {/*                            value={intercom}*/}
                        {/*                            onChangeText={value => this.handleValidationIntercom(value)}*/}
                        {/*                            textInputStyle={{*/}
                        {/*                                flex: 1,*/}
                        {/*                                paddingHorizontal: 4,*/}
                        {/*                                textAlign: 'center',*/}
                        {/*                                fontFamily: MontserratRegular,*/}
                        {/*                                fontSize: size16,*/}
                        {/*                            }}*/}
                        {/*                            style={{*/}
                        {/*                                justifyContent: 'flex-start',*/}
                        {/*                                marginTop: 16,*/}
                        {/*                                height: 48*/}
                        {/*                            }}*/}
                        {/*                        />*/}
                        {/*                    </View>*/}
                        {/*                </View>*/}
                        {/*            </>*/}
                        {/*        )*/}
                        {/*}*/}
                        {/*<Text*/}
                        {/*    style={{*/}
                        {/*        fontSize: size16,*/}
                        {/*        fontFamily: MontserratRegular,*/}
                        {/*        paddingTop: size44,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Сообщение для курьера*/}
                        {/*</Text>*/}
                        {/*<CustomInput*/}
                        {/*    multiline={true}*/}
                        {/*    numberOfLines={3}*/}
                        {/*    value={messageToCourier}*/}
                        {/*    onChangeText={value => this.setState({messageToCourier: value})}*/}
                        {/*    textInputStyle={{*/}
                        {/*        flex: 1,*/}
                        {/*        fontFamily: MontserratRegular,*/}
                        {/*        fontSize: size12,*/}
                        {/*    }}*/}
                        {/*    style={{*/}
                        {/*        justifyContent: 'flex-start',*/}
                        {/*        marginTop: 16,*/}
                        {/*        height: WINDOW_WIDTH / 4,*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </ScrollView>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: 'center',
                            width: WINDOW_WIDTH,
                            height: 60,
                            backgroundColor: '#eceaea',
                        }}
                    >
                        <View
                            style={{
                                width: WINDOW_WIDTH - 40,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{fontFamily: MontserratRegular, fontSize: 16}}>
                                Итого
                            </Text>
                            <Text
                                style={{fontFamily: MontserratSemiBold, fontSize: size20}}
                            >
                                {this.props.navigation.state.params.finishPayment}
                                <Text style={{color: '#8CC83F', fontSize: size16}}> ₽</Text>
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.handlePayment()}
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
                            Оплатить заказ
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    };
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
// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });


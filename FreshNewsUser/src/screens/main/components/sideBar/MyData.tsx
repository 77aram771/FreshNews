import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Switch, Platform} from 'react-native';
import {observer} from 'mobx-react';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../share/fonts';
import {
    GOOGLE_MAPS_APIKEY,
    size12,
    size14,
    size20,
    size28,
    size34,
    size44,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from '../../../../share/consts';
import {CustomInput} from '../../../../share/components/CustomInput';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from "react-native-modal";
import {toJS} from "mobx";
import userInfo from '../../../../stores/UserInfo';
import modalsStore from '../../../../stores/ModalsStore';
import shopsStore from "../../../../stores/ShopsStore";
import Header from "../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import {CreditCardInput} from "react-native-credit-card-input";
import {ErrorModal} from "../modals/ErrorModal";
import Modals, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

@observer
export default // @ts-ignore
class MyData extends Component <any, any> {

    state = {
        name: '',
        email: '',
        surname: '',
        phone: '',
        alertsIsOn: true,
        address: [],
        addAddress: '',
        porch: '',
        floor: '',
        intercom: '',
        level: '',
        addAddressInput: true,
        porchInput: false,
        floorInput: false,
        intercomInput: false,
        levelInput: false,
        saveButton: false,
        creditCart: [],
        enterCart: null,
        saveButtonCart: false,
        errorModal: false,
        errorData: [],
    };

    async componentDidMount() {
        await userInfo.getUserData();
        const {userData} = userInfo;
        const {name, email, surname, phone, addresses, cards} = userData;
        this.setState({
            name: name,
            email: email,
            surname: surname,
            phone: phone,
            address: toJS(addresses),
            creditCart: toJS(cards),
        }, () => {
            console.log('creditCart', this.state.creditCart);
        })
    };

    alertsToggleHandle() {
        this.setState({alertsIsOn: !this.state.alertsIsOn})
    };

    async handleSave(name: string, email: string, surname: string) {
        await modalsStore.onShowMyDataModal()
        await userInfo.getUserDataUpdate(name, email, surname, this.state.alertsIsOn);
        setTimeout(() => {
            if (userInfo.errorData !== null) {
                let errorData = {
                    status_code: toJS(userInfo.errorData).status,
                    message: 'Network Error',
                };
                this.setState({
                    errorData: errorData,
                    errorModal: true
                });
            } else {
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 300)
            }
        }, 1000);
    };

    handleName(value: string) {
        this.setState({
            name: value
        })
    };

    handleSurname(value: string) {
        this.setState({
            surname: value
        })
    };

    handleEmail(value: string) {
        this.setState({
            email: value
        })
    };

    handleSandAddress(value: string) {
        // console.log('Address', value);
        // @ts-ignore
        if (this.state.addAddress === 0) {
            this.setState({
                addressInput: false,
                addAddress: value,
                saveButton: false
            })
        }
        else {
            this.setState({
                addAddress: value,
                addressInput: true,
            })
        }
        console.log('Address', this.state.addAddress);
        console.log('addAddressInput', this.state.addAddressInput);
        if (this.state.addAddressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.floorInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                saveButton: true
                            }, () => console.log('saveButton', this.state.saveButton))
                        }
                    }
                }
            }
        }
    };

    handleSandPorch(value: string) {
        // console.log('Porch', value);
        if (value.length === 0) {
            this.setState({
                porchInput: false,
                porch: value,
                saveButton: false
            })
        } else {
            this.setState({
                porch: value,
                porchInput: true,
            })
        }
        console.log('Porch', value);
        console.log('porchInput', this.state.porchInput);
        if (this.state.addAddressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.floorInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                saveButton: true
                            }, () => console.log('saveButton', this.state.saveButton))
                        }
                    }
                }
            }
        }
    };

    handleSandLevel(value: string) {
        if (value.length === 0) {
            this.setState({
                levelInput: false,
                level: value,
                saveButton: false
            })
        } else {
            this.setState({
                level: value,
                levelInput: true,
            })
        }
        console.log('Level', value);
        console.log('levelInput', this.state.levelInput);
        if (this.state.addAddressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.floorInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                saveButton: true
                            }, () => console.log('saveButton', this.state.saveButton))
                        }
                    }
                }
            }
        }
    };

    handleSandFloor(value: string) {
        // console.log('Floor', value);
        if (value.length === 0) {
            this.setState({
                floorInput: false,
                floor: value,
                saveButton: false
            })
        } else {
            this.setState({
                floor: value,
                floorInput: true,
            })
        }
        console.log('Floor', value);
        console.log('floorInput', this.state.floorInput);
        if (this.state.addAddressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.floorInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                saveButton: true
                            }, () => console.log('saveButton', this.state.saveButton))
                        }
                    }
                }
            }
        }
    };

    handleSandIntercom(value: string) {
        if (value.length === 0) {
            this.setState({
                intercomInput: false,
                intercom: value,
                saveButton: false
            })
        } else {
            this.setState({
                intercom: value,
                intercomInput: true,
            })
        }
        console.log('Intercom', value);
        console.log('intercomInput', this.state.intercomInput);
        if (this.state.addAddressInput) {
            if (this.state.porchInput) {
                if (this.state.levelInput) {
                    if (this.state.floorInput) {
                        if (this.state.intercomInput) {
                            this.setState({
                                saveButton: true
                            }, () => console.log('saveButton', this.state.saveButton))
                        }
                    }
                }
            }
        }
    };

    async handleAddAddress() {
        let obj = {
            id: new Date().getUTCMilliseconds(),
            address: this.state.addAddress,
            porch: this.state.porch,
            floor: this.state.floor,
            intercom: this.state.intercom,
        }

        this.setState({
            address: [...this.state.address, obj]
        });

        await userInfo.getUserDataAddAddress(this.state.addAddress, this.state.porch, this.state.floor, this.state.intercom)
        shopsStore.onShowAddAddressModal()
    };

    async handleDeleteAddress(id: number) {
        await userInfo.getUserDataDeleteAddress(id)
        let obj = this.state.address.filter(item => item.id !== id)
        this.setState({
            address: obj
        })
    };

    handleOpenModalAddAddress() {
        this.setState({
            addAddress: '',
            porch: '',
            floor: '',
            intercom: '',
            level: '',
        })
        shopsStore.onShowAddAddressModal()
    };

    async handleOpenModalCreditCart() {
        await shopsStore.onShowAddCreditCart()
    };

    renderAddressItem(item: any) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10
                }}
                key={item.id}
            >
                <View
                    style={{
                        justifyContent: "flex-start"
                    }}
                >
                    <Text
                        style={{
                            fontFamily: MontserratRegular,
                            fontSize: size14,
                            marginBottom: 5
                        }}
                    >
                        {item.address}
                    </Text>
                    <View
                        style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Text style={{marginRight: 10}}>{item.porch} кв.</Text>
                        <Text style={{marginRight: 10}}>{item.floor} пад.</Text>
                        <Text style={{marginRight: 10}}>{item.intercom} эт.</Text>
                    </View>
                </View>
                <EvilIcons
                    onPress={() => this.handleDeleteAddress(item.id)}
                    name={'close'}
                    size={size28}
                    color={'#707070'}
                    style={{paddingLeft: 16}}
                />
            </View>
        )
    };

    _onChange = (formData: any) => {
        this.setState({
            enterCart: formData.values
        }, () => {
            if (formData.values.number.length > 0) {
                if (formData.values.expiry.length > 0) {
                    if (formData.values.cvc.length > 0) {
                        if (formData.values.name.length > 0) {
                            this.setState({
                                saveButtonCart: true
                            })
                        } else {
                            this.setState({
                                saveButtonCart: false
                            })
                        }
                    } else {
                        this.setState({
                            saveButtonCart: false
                        })
                    }
                } else {
                    this.setState({
                        saveButtonCart: false
                    })
                }
            } else {
                this.setState({
                    saveButtonCart: false
                })
            }
        })
    };

    async handleAddCart() {
        let obj = {
            code: this.state.enterCart.cvc,
            holder: this.state.enterCart.name,
            month: this.state.enterCart.expiry.slice(0, 2),
            number: String(this.state.enterCart.number).replace(/\s/g, ''),
            year: this.state.enterCart.expiry.slice(3, 5),
        }
        obj.id = new Date().getUTCMilliseconds();
        this.setState({
                creditCart: [...this.state.creditCart, obj]
            },
            async () => {
                let lastItem = this.state.creditCart[this.state.creditCart.length - 1]
                await userInfo.getUserAddCreditCard(
                    lastItem.number,
                    lastItem.month,
                    lastItem.year,
                    lastItem.holder,
                    lastItem.code,
                );
                await shopsStore.onShowAddCreditCart();
            });
    };

    async handleDeleteCart(id: number) {
        await userInfo.getUserDataDeleteCard(id);
        let obj = this.state.creditCart.filter(item => item.id !== id)
        this.setState({
            creditCart: obj
        })
    };

    renderCartItem(item: any) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10
                }}
                key={item.id}
            >
                <View
                    style={{
                        justifyContent: "flex-start"
                    }}
                >
                    <Text
                        style={{
                            fontFamily: MontserratBold,
                            fontSize: 14,
                            marginBottom: 5
                        }}
                    >
                        Имя: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.holder}</Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratBold,
                            fontSize: 14,
                            marginBottom: 5
                        }}
                    >
                        Номер: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.number}</Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratBold,
                            fontSize: 14,
                            marginBottom: 5
                        }}
                    >
                        CVC: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.code}</Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratBold,
                            fontSize: 14,
                            marginBottom: 5
                        }}
                    >
                        Дата: <Text
                        style={{fontFamily: MontserratRegular, fontSize: 13}}>{`${item.month}/${item.year}`}</Text>
                    </Text>
                </View>
                <EvilIcons
                    onPress={() => this.handleDeleteCart(item.id)}
                    name={'close'}
                    size={size28}
                    color={'#707070'}
                    style={{paddingLeft: 16}}
                />
            </View>
        )
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    render() {
        const {isShowAddAddressModal, isShowAddCreditCart, onShowAddAddressModal, onShowAddCreditCart} = shopsStore;
        const {
            name,
            surname,
            phone,
            email,
            address,
            addAddress,
            porch,
            level,
            floor,
            intercom,
            creditCart,
            saveButton,
            saveButtonCart,
            alertsIsOn
        } = this.state;

        return (
            <>
                <Modal
                    animationInTiming={200}
                    animationOutTiming={100}
                    onBackButtonPress={onShowAddAddressModal}
                    hideModalContentWhileAnimating={true}
                    backdropOpacity={0}
                    onBackdropPress={onShowAddAddressModal}
                    style={{
                        margin: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                    isVisible={isShowAddAddressModal}
                >
                    <View
                        style={{
                            width: WINDOW_WIDTH * 0.9,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#dbdbdb',
                                width: WINDOW_WIDTH * 0.9,
                                alignItems: 'center',
                                paddingBottom: 50,
                                paddingTop: 50,
                                borderRadius: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: MontserratSemiBold,
                                    fontSize: 16,
                                    color: '#000'
                                }}
                            >
                                Добавить новый адрес
                            </Text>
                            <View
                                style={{
                                    width: WINDOW_WIDTH - 75,
                                    marginTop: 15,
                                    height: 40,
                                    marginBottom: 30,
                                    zIndex: 1
                                }}
                            >
                                <GooglePlacesAutocomplete
                                    placeholder=''
                                    fetchDetails={true}
                                    onPress={data => {
                                        if (data.description !== undefined) {
                                            // console.log('data', data.structured_formatting.main_text);
                                            this.handleSandAddress(data.structured_formatting.main_text)
                                        } else {
                                            // console.log(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                            this.handleSandAddress(`${data.address_components[1].long_name} ${data.address_components[0].long_name}`)
                                        }
                                    }}
                                    textInputProps={{
                                        value: addAddress,
                                        onChangeText: (text) => {
                                            this.handleSandAddress(text)
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
                                            borderRadius: 10
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
                                    width: '90%',
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        width: '25%',
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>Подъезд</Text>
                                    <CustomInput
                                        value={porch}
                                        onChangeText={value => this.handleSandPorch(value)}
                                        keyboardType={"number-pad"}
                                        textInputStyle={{
                                            fontFamily: MontserratRegular,
                                            fontSize: size14,
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                            width: '100%',
                                        }}
                                        style={{
                                            width: '80%',
                                            marginTop: 15,
                                            height: 40,
                                            marginBottom: 10
                                        }}
                                        headerStyleWidth={WINDOW_WIDTH - 40}
                                        headerStyleText={WINDOW_WIDTH / 1.6}
                                        maxLength={3}
                                    />
                                </View>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: '25%',
                                    }}
                                >
                                    <Text>Этаж</Text>
                                    <CustomInput
                                        value={level}
                                        onChangeText={value => this.handleSandLevel(value)}
                                        keyboardType={"number-pad"}
                                        textInputStyle={{
                                            fontFamily: MontserratRegular,
                                            fontSize: size14,
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                            width: '100%',
                                        }}
                                        style={{
                                            width: '80%',
                                            marginTop: 15,
                                            height: 40,
                                            marginBottom: 10,
                                        }}
                                        headerStyleWidth={WINDOW_WIDTH - 40}
                                        headerStyleText={WINDOW_WIDTH / 1.6}
                                        maxLength={3}
                                    />
                                </View>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: '25%',
                                    }}
                                >
                                    <Text>Квартира</Text>
                                    <CustomInput
                                        value={floor}
                                        onChangeText={value => this.handleSandFloor(value)}
                                        textInputStyle={{
                                            width: '100%',
                                            fontFamily: MontserratRegular,
                                            fontSize: size14,
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                        style={{
                                            width: '80%',
                                            marginTop: 15,
                                            height: 40,
                                            marginBottom: 10
                                        }}
                                        headerStyleWidth={WINDOW_WIDTH - 40}
                                        headerStyleText={WINDOW_WIDTH / 1.6}
                                        maxLength={3}
                                        keyboardType={"number-pad"}
                                    />
                                </View>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: '25%',
                                    }}
                                >
                                    <Text>Домофон</Text>
                                    <CustomInput
                                        value={intercom}
                                        onChangeText={value => this.handleSandIntercom(value)}
                                        textInputStyle={{
                                            width: '100%',
                                            fontFamily: MontserratRegular,
                                            fontSize: size14,
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                        style={{
                                            width: '80%',
                                            marginTop: 15,
                                            height: 40,
                                            marginBottom: 10
                                        }}
                                        headerStyleWidth={WINDOW_WIDTH - 40}
                                        headerStyleText={WINDOW_WIDTH / 1.6}
                                        maxLength={4}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.handleAddAddress()}
                                style={
                                    !saveButton
                                        ? {
                                            borderRadius: 10,
                                            backgroundColor: 'grey',
                                            marginTop: 20,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            paddingLeft: 25,
                                            paddingRight: 25
                                        }
                                        : {
                                            borderRadius: 10,
                                            backgroundColor: '#8CC83F',
                                            marginTop: 20,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            paddingLeft: 25,
                                            paddingRight: 25
                                        }}
                                disabled={!saveButton}
                            >
                                <Text
                                    style={{
                                        fontFamily: MontserratSemiBold,
                                        fontSize: 18,
                                        color: '#fff'
                                    }}
                                >
                                    Добавит
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationInTiming={200}
                    animationOutTiming={100}
                    onBackButtonPress={onShowAddCreditCart}
                    hideModalContentWhileAnimating={true}
                    backdropOpacity={0}
                    onBackdropPress={onShowAddCreditCart}
                    style={{
                        margin: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                    isVisible={isShowAddCreditCart}
                >
                    <View
                        style={{
                            width: WINDOW_WIDTH * 0.9,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#dbdbdb',
                                width: WINDOW_WIDTH * 0.9,
                                height: WINDOW_HEIGHT / 1.8,
                                alignItems: 'center',
                                paddingBottom: 120,
                                paddingTop: 30,
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: MontserratSemiBold,
                                    fontSize: 16,
                                    color: '#000',
                                    marginBottom: 10
                                }}
                            >
                                Добавить Карту
                            </Text>
                            <CreditCardInput
                                autoFocus
                                requiresName
                                requiresCVC
                                requiresPostalCode
                                labelStyle={{
                                    color: "black",
                                    fontSize: 12,
                                }}
                                inputStyle={{
                                    fontSize: 16,
                                    color: "black",
                                }}
                                // inputContainerStyle={{
                                //     borderWidth: 0.4,
                                //     borderStyle: "solid",
                                //     borderColor: '#000'
                                // }}
                                validColor={"black"}
                                invalidColor={"red"}
                                placeholderColor={"darkgray"}
                                onChange={this._onChange}
                            />
                            <TouchableOpacity
                                onPress={() => this.handleAddCart()}
                                style={
                                    saveButtonCart
                                        ? {
                                            borderRadius: 10,
                                            backgroundColor: '#8CC83F',
                                            marginTop: 20,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            paddingLeft: 25,
                                            paddingRight: 25
                                        }
                                        : {
                                            borderRadius: 10,
                                            backgroundColor: 'grey',
                                            marginTop: 20,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                            paddingLeft: 25,
                                            paddingRight: 25
                                        }}
                                disabled={!saveButtonCart}
                            >
                                <Text
                                    style={{
                                        fontFamily: MontserratSemiBold,
                                        fontSize: 18,
                                        color: '#fff'
                                    }}
                                >
                                    Добавит
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modals
                    visible={this.state.errorModal}
                    useNativeDriver={false}
                    footer={
                        <ModalFooter
                            style={{
                                backgroundColor: 'red'
                            }}
                        >
                            <ModalButton
                                text="Закрыть"
                                textStyle={{
                                    color: '#fff'
                                }}
                                onPress={() => this.handleCloseErrorModal()}
                            />
                        </ModalFooter>
                    }
                    onTouchOutside={() => {
                        this.setState({errorModal: false})
                    }}
                >
                    <ModalContent>
                        <ErrorModal
                            data={this.state.errorData}
                            // handleOpenErrorModal={this.handleOpenErrorModal}
                            handleCloseErrorModal={this.handleCloseErrorModal}
                        />
                    </ModalContent>
                </Modals>
                <Header
                    style={{
                        borderBottomWidth: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : 50
                    }}
                    headerLeft={
                        <AntDesign
                            style={{paddingLeft: 8}}
                            onPress={() => this.props.navigation.goBack()}
                            name={'left'}
                            size={18}
                            color={'#464646'}
                        />
                    }
                    headerMid={
                        <Text
                            style={{
                                fontFamily: MontserratBold,
                                fontSize: 20,
                                color: '#8cc83f',
                            }}
                        >
                            Даные ползевателя
                        </Text>
                    }
                    headerRight={
                        <View/>
                    }
                />
                <View
                    style={{
                        backgroundColor: '#ffffff',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ScrollView style={{width: WINDOW_WIDTH - 40}}>
                        <Text
                            style={{
                                color: '#BABABA',
                                fontFamily: MontserratSemiBold,
                                fontSize: size20,
                                paddingTop: size34,
                                paddingBottom: size28,
                            }}
                        >
                            Мои данные
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    fontSize: size14,
                                    flex: 1,
                                }}
                            >
                                Имя
                            </Text>
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    fontSize: size14,
                                    flex: 1,
                                }}
                            >
                                Фамилия
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <CustomInput
                                value={name}
                                onChangeText={value => this.handleName(value)}
                                textInputStyle={{
                                    flex: 1,
                                    fontFamily: MontserratRegular,
                                    fontSize: size14,
                                    backgroundColor: '#F5F4F4',
                                    borderRadius: 10,
                                }}
                                style={{
                                    marginTop: 16,
                                    flex: 1,
                                    marginRight: 14,
                                    height: 40
                                }}
                                headerStyleWidth={WINDOW_WIDTH - 40}
                                headerStyleText={WINDOW_WIDTH / 1.6}
                            />
                            <CustomInput
                                value={surname}
                                onChangeText={value => this.handleSurname(value)}
                                textInputStyle={{
                                    flex: 1,
                                    fontFamily: MontserratRegular,
                                    fontSize: size14,
                                    backgroundColor: '#F5F4F4',
                                    borderRadius: 10,
                                }}
                                style={{
                                    marginTop: 16,
                                    flex: 1,
                                    marginRight: 14,
                                    height: 40
                                }}
                                headerStyleWidth={WINDOW_WIDTH - 40}
                                headerStyleText={WINDOW_WIDTH / 1.6}
                            />
                        </View>
                        <Text
                            style={{
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                paddingTop: 15,
                            }}
                        >
                            Телефон
                        </Text>
                        <CustomInput
                            value={`+${phone}`}
                            onChangeText={value => console.log(value)}
                            textInputStyle={{
                                flex: 1,
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#F5F4F4',
                                borderRadius: 10,
                            }}
                            style={{
                                marginTop: 15,
                                height: 40
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 40}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                            editable={false}
                        />
                        <Text
                            style={{
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                paddingTop: 15,
                            }}
                        >
                            E-mail
                        </Text>
                        <CustomInput
                            value={email}
                            onChangeText={value => this.handleEmail(value)}
                            textInputStyle={{
                                flex: 1,
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#F5F4F4',
                                borderRadius: 10,
                            }}
                            style={{
                                marginTop: 15,
                                height: 40
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 40}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                        />
                        <Text
                            style={{
                                color: '#BABABA',
                                fontFamily: MontserratSemiBold,
                                fontSize: size20,
                                paddingTop: size34,
                                paddingBottom: 10,
                            }}
                        >
                            Адреса
                        </Text>
                        {
                            address.map(item => {
                                return this.renderAddressItem(item)
                            })
                        }
                        {
                            address.length === 5
                                ? (
                                    <View/>
                                )
                                : (
                                    <TouchableOpacity onPress={() => this.handleOpenModalAddAddress()}>
                                        <Text
                                            style={{
                                                fontFamily: MontserratSemiBold,
                                                fontSize: size14,
                                                color: '#8CC83F',
                                                paddingTop: 10,
                                            }}
                                        >
                                            Добавить адрес
                                        </Text>
                                    </TouchableOpacity>
                                )
                        }
                        <Text
                            style={{
                                color: '#BABABA',
                                fontFamily: MontserratSemiBold,
                                fontSize: size20,
                                paddingTop: size34,
                                paddingBottom: 10,
                            }}
                        >
                            Кредитные карты
                        </Text>
                        {
                            creditCart.map(item => {
                                return this.renderCartItem(item)
                            })
                        }
                        {
                            creditCart.length === 5
                                ? (
                                    <View/>
                                )
                                : (
                                    <TouchableOpacity onPress={() => this.handleOpenModalCreditCart()}>
                                        <Text
                                            style={{
                                                fontFamily: MontserratSemiBold,
                                                fontSize: size14,
                                                color: '#8CC83F',
                                                paddingTop: 10,
                                            }}
                                        >
                                            Добавить Карты
                                        </Text>
                                    </TouchableOpacity>
                                )
                        }
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: size44,
                                justifyContent: 'space-between',
                                marginBottom: 40,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size12,
                                    fontFamily: MontserratRegular,
                                    flex: 0.8,
                                }}
                            >
                                Получать информацию об акциях, скидках и новых предложениях
                            </Text>
                            <View>
                                <Switch
                                    trackColor={{false: "#767577", true: "#8CC83F"}}
                                    thumbColor={alertsIsOn ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => this.alertsToggleHandle()}
                                    value={alertsIsOn}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => this.handleSave(name, email, surname)}
                        style={{
                            height: 50,
                            backgroundColor: '#8CC83F',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: WINDOW_WIDTH * 0.9 + 1,
                            marginBottom: 30
                        }}
                    >
                        <Text style={{color: '#FFFFFF'}}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };
}

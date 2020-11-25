import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../share/fonts';
import {
    size12,
    size14,
    size16,
    size20,
    size28,
    size34,
    size44, WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import {CustomInput} from '../../../../share/components/CustomInput';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Toggle} from '../../../../share/components/Toggle';
import Modal from "react-native-modal";
import {toJS} from "mobx";
import userInfo from '../../../../stores/UserInfo';
import modalsStore from '../../../../stores/ModalsStore';
import shopsStore from "../../../../stores/ShopsStore";
import Header from "../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {AddAddressUser} from "../modals/AddAddressUser";
// @ts-ignore
import {CreditCardInput} from "react-native-credit-card-input";

@observer
export default // @ts-ignore
class MyData extends Component {

    state = {
        name: '',
        email: '',
        surname: '',
        patronymic: '',
        phone: '',
        alertsIsOn: true,
        address: [],
        addAddress: '',
        porch: '',
        floor: '',
        intercom: '',
        level: '',
        addAddressInput: false,
        porchInput: false,
        floorInput: false,
        intercomInput: false,
        levelInput: false,
        saveButton: false,
        creditCart: [],
        enterCart: null,
        saveButtonCart: false
    };

    componentDidMount() {
        userInfo.getUserData();
        const {userData} = userInfo;
        const {name, email, surname, patronymic, phone, addresses} = userData;
        this.setState({
            name: name,
            email: email,
            surname: surname,
            patronymic: patronymic,
            phone: phone,
            address: toJS(addresses),
        })
    };

    alertsToggleHandle(state: boolean) {
        this.setState({alertsIsOn: state});
    };

    handleSave(name: string, email: string, surname: string, patronymic: string) {
        modalsStore.onShowMyDataModal()
        userInfo.getUserDataUpdate(name, email, surname, patronymic);
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
        console.log('Address', value);
        this.setState({
            addAddress: value
        }, () => {
            if (this.state.addAddress.length > -1) {
                if (this.state.porch.length > -1) {
                    if (this.state.floor.length > -1) {
                        if (this.state.intercom.length > -1) {
                            this.setState({
                                addAddressInput: true,
                                saveButton: true
                            })
                        }
                    }
                }
            } else {
                this.setState({
                    saveButton: false
                })
            }
        })
    };

    handleSandPorch(value: string) {
        console.log('Porch', value);
        this.setState({
                porch: value
            }, () => {
                if (this.state.addAddress.length > -1) {
                    if (this.state.porch.length > -1) {
                        if (this.state.floor.length > -1) {
                            if (this.state.intercom.length > -1) {
                                this.setState({
                                    porchInput: true,
                                    saveButton: true
                                })
                            }
                        }
                    }
                } else {
                    this.setState({
                        saveButton: false
                    })
                }
            }
        )
    };

    handleSandFloor(value: string) {
        console.log('Floor', value);
        this.setState({
            floor: value
        }, () => {
            if (this.state.addAddress.length > -1) {
                if (this.state.porch.length > -1) {
                    if (this.state.floor.length > -1) {
                        if (this.state.intercom.length > -1) {
                            this.setState({
                                floorInput: true,
                                saveButton: true
                            })
                        }
                    }
                }
            } else {
                this.setState({
                    saveButton: false
                })
            }
        })
    };

    handleSandIntercom(value: string) {
        console.log('Intercom', value);
        this.setState({
            intercom: value
        }, () => {
            if (this.state.addAddress.length > -1) {
                if (this.state.porch.length > -1) {
                    if (this.state.floor.length > -1) {
                        if (this.state.intercom.length > -1) {
                            this.setState({
                                intercomInput: true,
                                saveButton: true
                            })
                        }
                    }
                }
            } else {
                this.setState({
                    saveButton: false
                })
            }
        })
    };

    handleSandLevel(value: string) {
        console.log('Level', value);
        this.setState({
            level: value
        }, () => {
            if (this.state.addAddress.length > -1) {
                if (this.state.porch.length > -1) {
                    if (this.state.floor.length > -1) {
                        if (this.state.intercom.length > -1) {
                            this.setState({
                                porchInput: true,
                                saveButton: true
                            })
                        }
                    }
                }
            } else {
                this.setState({
                    saveButton: false
                })
            }
        })
    };

    handleAddAddress() {
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

        userInfo.getUserDataAddAddress(this.state.addAddress, this.state.porch, this.state.floor, this.state.intercom)
        shopsStore.onShowAddAddressModal()
    };

    handleDeleteAddress(id: number) {
        userInfo.getUserDataDeleteAddress(id)
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

    handleOpenModalCreditCart() {
        shopsStore.onShowAddCreditCart()
    };

    renderAddressItem(item: any) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center"
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

    handleAddCart() {
        let obj = this.state.enterCart;
        obj.id = new Date().getUTCMilliseconds();
        let month = '';
        let year = '';
        console.log('obj', obj);
        this.setState({
            creditCart: [...this.state.creditCart, this.state.enterCart]
        }, () => {
            console.log('card', this.state.creditCart);
            month = this.state.creditCart[0].expiry.slice(0, 2);
            year = this.state.creditCart[0].expiry.slice(3, 5);
            userInfo.getUserAddCreditCard(this.state.creditCart[0].number, month, year, this.state.creditCart[0].name, this.state.creditCart[0].expiry, this.state.creditCart[0].cvc);
            shopsStore.onShowAddCreditCart();
        });
    };

    handleDeleteCart(id: number) {
        // userInfo.getUserDataDeleteAddress(id)
        let obj = this.state.creditCart.filter(item => item.id !== id)

        this.setState({
            creditCart: obj
        })
    };

    renderCartItem(item: any) {
        console.log('item', item);
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center"
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
                        Имя: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.name}</Text>
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
                        CVC: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.cvc}</Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratBold,
                            fontSize: 14,
                            marginBottom: 5
                        }}
                    >
                        Дата: <Text style={{fontFamily: MontserratRegular, fontSize: 13}}>{item.expiry}</Text>
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

    render() {

        const {isShowAddAddressModal, isShowAddCreditCart, onShowAddAddressModal, onShowAddCreditCart} = shopsStore;

        const {
            name,
            surname,
            patronymic,
            phone,
            email,
            address,
            addAddress,
            porch,
            level,
            floor,
            intercom,
            creditCart
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
                            <CustomInput
                                value={addAddress}
                                onChangeText={value => this.handleSandAddress(value)}
                                textInputStyle={{
                                    flex: 1,
                                    fontFamily: MontserratRegular,
                                    fontSize: size14,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                }}
                                style={{
                                    marginTop: 15,
                                    height: 40,
                                    marginBottom: 10
                                }}
                                headerStyleWidth={WINDOW_WIDTH - 90}
                                headerStyleText={WINDOW_WIDTH / 1.6}
                            />
                            <Text
                                style={{
                                    fontFamily: MontserratSemiBold,
                                    fontSize: 1,
                                    color: '#000',
                                    marginBottom: 20
                                }}
                            >
                                Пример: <Text style={{
                                fontFamily: MontserratSemiBold,
                                fontSize: 14,
                                color: '#000'
                            }}> Москва ул. Тверская 11</Text>
                            </Text>
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
                                        headerStyleWidth={WINDOW_WIDTH - 90}
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
                                        headerStyleWidth={WINDOW_WIDTH - 90}
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
                                        headerStyleWidth={WINDOW_WIDTH - 90}
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
                                        headerStyleWidth={WINDOW_WIDTH - 90}
                                        headerStyleText={WINDOW_WIDTH / 1.6}
                                        maxLength={4}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.handleAddAddress()}
                                style={
                                    this.state.saveButton
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
                                disabled={!this.state.saveButton}
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
                                    this.state.saveButtonCart
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
                                disabled={!this.state.saveButtonCart}
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
                <Header
                    style={{borderBottomWidth: 2,}}
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
                        borderColor: 'red',
                        borderWidth: 1,
                        borderStyle: "solid"
                    }}
                >
                    <ScrollView
                        style={{
                            borderColor: 'red',
                            borderWidth: 1,
                            borderStyle: "solid"
                        }}
                    >
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
                                headerStyleWidth={WINDOW_WIDTH - 90}
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
                                headerStyleWidth={WINDOW_WIDTH - 90}
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
                            headerStyleWidth={WINDOW_WIDTH - 90}
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
                            headerStyleWidth={WINDOW_WIDTH - 90}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                        />
                        <Text
                            style={{
                                color: '#BABABA',
                                fontFamily: MontserratSemiBold,
                                fontSize: size20,
                                paddingTop: size34,
                                paddingBottom: size34,
                            }}
                        >
                            Адреса
                        </Text>
                        <View>
                            {
                                address.map(item => {
                                    return this.renderAddressItem(item)
                                })
                            }
                        </View>
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
                                                paddingTop: 24,
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
                                paddingBottom: size34,
                            }}
                        >
                            Кредитные карты
                        </Text>
                        <View>
                            {
                                creditCart.map(item => {
                                    return this.renderCartItem(item)
                                })
                            }
                        </View>
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
                                                paddingTop: 24,
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
                                marginBottom: 16,
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
                                <Toggle
                                    isOn={this.state.alertsIsOn}
                                    onToggle={state => this.alertsToggleHandle(state)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => this.handleSave(this.state.name, this.state.email, this.state.surname, this.state.patronymic)}
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
    }
}

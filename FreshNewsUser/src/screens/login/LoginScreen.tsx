import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import {MontserratRegular} from '../../share/fonts';
import {CustomInput} from '../../share/components/CustomInput';
import {ActionButton} from '../../share/components/ActionButton';
import {size12, size16, WINDOW_HEIGHT, WINDOW_WIDTH} from '../../share/consts';
import {verify, request} from "../../services/services";
import PhoneInput from 'react-native-phone-number-input';
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import authStore from "../../stores/AuthStore";
import basketStore from "../../stores/BasketStore";
import userInfo from "../../stores/UserInfo";
import paymentStore from "../../stores/PaymentStore";
import shopsStore from "../../stores/ShopsStore";
import modalsStore from "../../stores/ModalsStore";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {ErrorModal} from "../main/components/modals/ErrorModal";
import {toJS} from "mobx";
import Header from "../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {LogoAndTitle} from "../../share/components/LogoAndTitle";

@observer
export default // @ts-ignore
class LoginScreen extends React.Component<NavigationProps> {

    constructor(props: any) {
        super(props);
        this.phoneInput = React.createRef();
        this.state = {
            value: '',
            formattedValue: '',
            confirmationPin: '',
            showConfirmScreen: false,
            isLoading: false,
            numberInput: false,
            codeInput: false,
            smsStatus: false,
            valid: false,
            showMessage: false,
            disabled: false,
            errorModal: false,
            errorData: [],
        };
    };

    componentWillUnmount() {
        this.setState({
            confirmationPin: '',
            showConfirmScreen: false,
            isLoading: false,
            numberInput: false,
            codeInput: false,
            smsStatus: false
        })
    };

    submitPhoneNumber() {
        const checkValid = this.phoneInput.current?.isValidNumber(this.state.value);
        if (checkValid) {
            this.setState({
                isLoading: true,
                numberInput: false
            })
            request(Number(this.state.formattedValue))
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            smsStatus: true
                        })
                    }
                    this.setState({
                        isLoading: false,
                        showConfirmScreen: true,
                    })
                })
                .catch(err => {
                    console.log(err);
                    let error = toJS(String(shopsStore.errorData));
                    let errorCode = error.substr(error.length - 3);
                    console.log('errorCode', errorCode);
                    let errorData = {
                        status_code: errorCode,
                        message: 'Network Error',
                    };
                    this.setState({
                        isLoading: false,
                        errorData: errorData,
                        errorModal: true
                    });
                });
        } else {
            this.setState({
                isLoading: false,
                numberInput: true
            })
        }
    };

    getCodeNumber(text: Number) {
        this.setState({
            confirmationPin: String(text)
        })
    };

    async submitPin() {
        if (String(this.state.confirmationPin).length === 4) {
            this.setState({
                isLoading: true,
                codeInput: false
            })
            await verify(Number(this.state.formattedValue), Number(this.state.confirmationPin))
                .then(res => {
                    const Token = JSON.stringify(res.data.token);
                    AsyncStorage.setItem('Token', Token);
                    if (res.status === 200) {
                        authStore.getUser(true);
                        basketStore.getCartUserInfo()
                        userInfo.getUserData();
                        paymentStore.orderUserTime();
                        shopsStore.getAllOrders();
                        modalsStore.onChangeView();
                        this.props.navigation.navigate('MainScreen');
                        this.setState({
                            smsStatus: false,
                            isLoading: false,
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    let error = toJS(String(shopsStore.errorData));
                    let errorCode = error.substr(error.length - 3);
                    let errorData = {
                        status_code: errorCode,
                        message: 'Network Error',
                    };
                    this.setState({
                        isLoading: false,
                        errorData: errorData,
                        errorModal: true
                    });
                });
        } else {
            this.setState({
                isLoading: false,
                codeInput: true
            })
        }
    };

    handleCloseErrorModal = async () => {
        // alert('test')
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    handleGetBack = async () => {
        alert('test')
        // this.props.navigation.navigate('MainScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                {/*    style={{*/}
                {/*        width: WINDOW_WIDTH,*/}
                {/*        height: 20,*/}
                {/*    }}*/}
                {/*    headerLeft={*/}
                {/*        <AntDesign*/}
                {/*            onPress={() => this.handleGetBack()}*/}
                {/*            // onPress={() => alert('test')}*/}
                {/*            style={{paddingLeft: 8}}*/}
                {/*            name={'left'}*/}
                {/*            size={18}*/}
                {/*            color={'#000'}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
                <Modal
                    visible={this.state.errorModal}
                    useNativeDriver={false}
                    footer={
                        <ModalFooter
                            style={{
                                backgroundColor: 'red'
                            }}
                        >
                            <ModalButton
                                text="Закрить"
                                textStyle={{
                                    color: '#fff'
                                }}
                                onPress={() => this.handleCloseErrorModal()}
                            />
                        </ModalFooter>
                    }
                    onTouchOutside={() => {
                        this.setState({errorModal: false});
                    }}
                >
                    <ModalContent>
                        <ErrorModal
                            data={this.state.errorData}
                            handleCloseErrorModal={this.handleCloseErrorModal}
                        />
                    </ModalContent>
                </Modal>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <Image
                        resizeMode={'contain'}
                        source={require('../../../assets/iconImages/LogoTitle.png')}
                        style={{
                            width: WINDOW_WIDTH,
                            height: WINDOW_HEIGHT / 4.5,
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <PhoneInput
                            ref={this.phoneInput}
                            defaultValue={this.state.value}
                            defaultCode="RU"
                            onChangeText={(text) => {
                                this.setState({
                                    value: text
                                })
                            }}
                            onChangeFormattedText={(text) => {
                                this.setState({
                                    formattedValue: text
                                })
                            }}
                            disabled={this.state.disabled}
                            containerStyle={this.state.numberInput ? styles.phoneInputTrue : styles.phoneInputFalse}
                        />
                        {
                            this.state.isLoading
                                ? (
                                    <View
                                        style={{
                                            marginTop: 20,
                                            height: 60
                                        }}
                                    >
                                        <PulseIndicator
                                            size={100}
                                            color='#8CC83F'
                                        />
                                    </View>
                                )
                                : null
                        }
                        {
                            this.state.smsStatus
                                ? (
                                    <>
                                        <CustomInput
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'numeric'}
                                            maxLength={4}
                                            textInputStyle={{textAlign: 'center', marginHorizontal: 24}}
                                            style={this.state.codeInput ? styles.codeInputTrue : styles.codeInputFalse}
                                            placeholder={'Код из смс'}
                                            value={String(this.state.confirmationPin)}
                                            onChangeText={item => this.getCodeNumber(Number(item))}
                                            headerStyleWidth={WINDOW_WIDTH - 90}
                                            headerStyleText={WINDOW_WIDTH / 1.6}
                                        />
                                        <ActionButton
                                            style={{marginTop: 24}}
                                            onPress={() => this.submitPin()}
                                            text={'Авторизоваться'}
                                            //disabled={this.state.isLoading}
                                        />
                                    </>
                                )
                                : null
                        }
                        <ActionButton
                            style={{marginTop: 24}}
                            onPress={() => this.submitPhoneNumber()}
                            text={'Отправить СМС'}
                            disabled={this.state.isLoading}
                        />
                        <Text style={styles.agreements}>
                            Нажимая кнопку «Далее» вы {'\n'} подтверждаете что соглашаетесь с{' '}
                            {'\n'}
                            <Text
                                onPress={() => alert('agreements')}
                                style={{textDecorationLine: 'underline'}}>
                                {' '}
                                Пользовательским соглашением
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.licenseText}>
                        Все права защищены ООО «Свежие новости» (с) 2020
                    </Text>
                </KeyboardAvoidingView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    licenseText: {
        fontFamily: MontserratRegular,
        position: 'absolute',
        bottom: 32,
        fontSize: size16 / 1.5,
    },
    agreements: {
        fontFamily: MontserratRegular,
        color: '#000000',
        textAlign: 'center',
        marginTop: 28,
        fontSize: size12,
    },
    phoneInputTrue: {
        marginTop: WINDOW_HEIGHT / 10,
        width: WINDOW_WIDTH - 90,
        backgroundColor: '#F5F4F4',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red'
    },
    phoneInputFalse: {
        marginTop: WINDOW_HEIGHT / 10,
        backgroundColor: '#F5F4F4',
        width: WINDOW_WIDTH - 95,
    },
    codeInputTrue: {
        marginTop: 14,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red',
        height: 50
    },
    codeInputFalse: {
        marginTop: 14,
        height: 50
    },
});

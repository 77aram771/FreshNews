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
import {MontserratRegular} from '../../share/fonts';
import {CustomInput} from '../../share/components/CustomInput';
import {ActionButton} from '../../share/components/ActionButton';
import {size12, size16, WINDOW_HEIGHT, WINDOW_WIDTH} from '../../share/consts';
import {verify, request} from "../../services/services";
import PhoneInput from 'react-native-phone-number-input';
import {PulseIndicator} from 'react-native-indicators';
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {toJS} from "mobx";
import {ErrorModal} from '../sellers/modals/ErrorModal';

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

    async componentDidMount() {
        let getToken = await AsyncStorage.getItem('Token');
        console.log('getToken', getToken);
        if (getToken !== undefined && getToken !== 'undefined' && getToken !== null && getToken !== 'null') {
            this.props.navigation.navigate('Home');
        }
    }

    componentWillUnmount() {
        this.setState({
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
                    console.log('err', err);
                    let error = toJS(String(err));
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
                numberInput: true
            })
        }
    };

    getCodeNumber(text: String) {
        this.setState({
            confirmationPin: text
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
                        this.props.navigation.navigate('Home');
                        this.setState({
                            smsStatus: false,
                            isLoading: false,
                        })
                    }
                })
                .catch(err => {
                    console.log('err', err);
                    let error = toJS(String(err));
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

    render() {
        return (
            <View style={styles.container}>
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
                    <View style={{alignItems: 'center'}}>
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
                                            onChangeText={item => this.getCodeNumber(String(item))}
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
        backgroundColor: '#fff'
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

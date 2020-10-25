import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
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
import {PulseIndicator} from 'react-native-indicators';

@observer
export default class LoginScreen extends React.Component<NavigationProps> {

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
            client: true,
            valid: false,
            showMessage: false,
            disabled: false,
        };
    }

    // async componentDidMount() {
    //     let getToken = await AsyncStorage.getItem('Token')
    //     if (getToken !== undefined && getToken !== 'undefined' && getToken !== null && getToken !== 'null') {
    //         console.log('this.state.client', this.state.client)
    //         this.state.client ? this.props.navigation.navigate('MainScreen') : this.props.navigation.navigate('CourierScreen');
    //     }
    // }

    componentWillUnmount() {
        this.setState({
            confirmationPin: '',
            showConfirmScreen: false,
            isLoading: false,
            numberInput: false,
            codeInput: false,
            smsStatus: false
        })
    }

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
                .catch(e => {
                    console.error(e);
                    this.setState({
                        isLoading: false
                    })
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
    }

    async submitPin() {
        if (String(this.state.confirmationPin).length === 4) {
            this.setState({
                isLoading: true,
                codeInput: false
            })
            await verify(Number(this.state.formattedValue), Number(this.state.confirmationPin))
                .then(res => {
                    const Token = JSON.stringify(res.data.token)
                    AsyncStorage.setItem('Token', Token)
                    if (res.status === 200) {
                        this.state.client
                            ? this.props.navigation.navigate('MainScreen')
                            : this.props.navigation.navigate('CourierScreen');
                        this.setState({
                            smsStatus: false,
                            isLoading: false,
                        })
                    }
                    // res.json()
                })
                .catch(e => {
                    console.error(e);
                    this.setState({
                        isLoading: false,
                    })
                });
        } else {
            this.setState({
                isLoading: false,
                codeInput: true
            })
        }
    };

    render() {
        return (
            <View style={styles.container}>
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
                        withDarkTheme
                        withShadow
                        autoFocus
                        containerStyle={this.state.numberInput ? styles.phoneInputTrue : styles.phoneInputFalse}
                    />
                    {
                        this.state.isLoading
                            ? (
                                <View
                                    style={{
                                        marginTop: 20

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
            </View>
        );
    }
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
        backgroundColor: '#F5F4F4',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red'
    },
    phoneInputFalse: {
        marginTop: WINDOW_HEIGHT / 10,
        backgroundColor: '#F5F4F4',
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

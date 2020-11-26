import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import courierStore from '../../stores/CourierStore';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import Header from '../../share/components/Header';
import {
    size12,
    size16,
    size20,
    size34,
    WINDOW_WIDTH,
} from '../../share/consts';
import {LogoAndTitle} from '../../share/components/LogoAndTitle';
import {MontserratSemiBold} from '../../share/fonts';
import {ClientAddress} from './components/ClientAddress';
import {PhoneComponent} from './components/PhoneComponent';
import {ActionButton} from '../../share/components/ActionButton';
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {ErrorModal} from "./modals/ErrorModal";
import {toJS} from "mobx";
import AsyncStorage from "@react-native-community/async-storage";

@observer
export default class ConfirmScreen extends React.Component<NavigationProps, { navigation: any }> {

    state = {
        errorModal: false,
        errorData: [],
    }

    componentDidMount() {
        if (courierStore.errorData !== null) {
            this.setState({
                errorData: toJS(courierStore.errorData),
                errorModal: true
            })
        }
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    handleFinishOrder = async (id: number) => {
        courierStore.getCourierDataFinish(id);
        setTimeout(() => {
            console.log('courierStore.errorData', courierStore.errorData);
            if (courierStore.errorData !== null) {
                this.setState({
                    errorData: toJS(courierStore.errorData),
                    errorModal: true
                })
            } else {
                this.props.navigation.goBack();
            }
        }, 1000)
    }

    render() {

        const {item} = this.props.navigation.state.params;

        const {phone} = item.client

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: Platform.OS === "ios" ? 0 : 40
                }}
            >
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
                <Header
                    headerLeft={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}>
                            <AntDesign
                                name={'left'}
                                size={18}
                                color={'#000'}
                            />
                        </TouchableOpacity>
                    }
                    headerMid={
                        <LogoAndTitle courier={true}/>
                    }
                    headerRight={
                        <View/>
                    }
                />
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            textAlign: 'center',
                        }}
                    >
                        Вы уверены что {'\n'} заказ доставлен?
                    </Text>
                    <ClientAddress
                        style={{alignItems: 'center', marginTop: size34 * 2}}
                        item={item.client}
                    />
                    <PhoneComponent phone={phone} style={{marginTop: size20}}/>
                    <ActionButton
                        style={{
                            marginTop: 50,
                        }}
                        onPress={() => this.handleFinishOrder(item.id)}
                        text={'Завершить доставку'}
                    />
                    <ActionButton
                        style={{
                            paddingVertical: 16,
                            backgroundColor: '#F5F4F4',
                            borderRadius: 10,
                            width: WINDOW_WIDTH * 0.9,
                            alignItems: 'center',
                            marginTop: size16,
                        }}
                        onPress={() => alert('Связаться с менеджером')}
                        text={'Связаться с менеджером'}
                        textStyle={{
                            color: '#000000',
                            fontFamily: MontserratSemiBold,
                            fontSize: size12,
                        }}
                    />
                </View>
            </View>
        );
    }
}

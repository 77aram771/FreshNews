import React, {Component} from 'react'
import {NavigationProps} from "../../../../../share/interfaces";
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
import {
    size12,
    size14,
    size16,
    size18,
    size20,
    WINDOW_WIDTH
} from "../../../../../share/consts";
import {MontserratBold, MontserratMedium, MontserratRegular, MontserratSemiBold} from "../../../../../share/fonts";
import basketStore from '../../../../../stores/BasketStore';
import paymentStore from "../../../../../stores/PaymentStore";
import userInfo from "../../../../../stores/UserInfo";
import {toJS} from "mobx";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {ErrorModal} from '../../modals/ErrorModal';

let moment = require('moment');

@observer
export default // @ts-ignore
class AssemblyPage extends Component<NavigationProps> {

    state = {
        delivery: 90,
        disabledBool: true,
        shopData: [],
        selectAddress: '',
        date: '',
        errorModal: false,
        errorData: [],
    };

    componentDidMount() {
        const NewDate = moment().format('YYYY-MM-DD');
        this.setState({
            date: NewDate,
        });
        const {cartUserInfo} = basketStore;
        this.setState({
            shopData: cartUserInfo
        });
        if (this.props.navigation.state.params.navAddress.address.length > 0) {
            console.log('this.props.navigation.state.params.navAddress if', this.props.navigation.state.params.navAddress.address.length);
        } else {
            console.log('this.props.navigation.state.params.navAddress else', this.props.navigation.state.params.navAddress.address.length);
        }
    };

    renderList(item: any): any {
        return (
            <View
                key={item.id}
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: '100%',
                    marginBottom: 25
                }}
            >
                <View
                    style={{
                        width: '50%',
                    }}
                >
                    <Text style={{fontFamily: MontserratSemiBold, fontSize: size14}}>
                        {item.product.name}
                    </Text>
                </View>
                <View
                    style={{
                        width: '25%',
                        alignItems: "flex-end",
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{fontFamily: MontserratMedium, fontSize: size14}}>
                        {item.quantity}
                    </Text>
                </View>
                <View
                    style={{
                        width: '25%',
                        alignItems: "flex-end",
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{fontFamily: MontserratMedium, fontSize: size14}}>
                        {Math.ceil(parseInt(item.product.price.replace(/\s/g, ''))) * Math.ceil(parseInt(item.quantity))}
                        <Text style={{color: '#8CC83F'}}>₽</Text>
                    </Text>
                </View>
            </View>
        )
    };

    handlePayment() {

        const {userData} = userInfo;
        const {addresses} = userData;
        const {address, porch, level, intercom} = this.props.navigation.state.params.navAddress;
        if (this.props.navigation.state.params.navAddress.address.length > 0) {
            paymentStore.orderUserCheckout(address, porch, level, intercom, '', this.state.date, paymentStore.selectTime);
            setTimeout(() => {
                console.log('paymentStore.Error', paymentStore.errorData);
                if (paymentStore.errorData !== null) {
                    this.setState({
                        errorData: toJS(paymentStore.errorData),
                        errorModal: true
                    })
                } else {
                    this.props.navigation.navigate('CloudPayment')
                }
            }, 1000)
        }
        else {
            toJS(addresses).find((item: any) => {
                    if (item.address === paymentStore.selectAddress) {
                        paymentStore.orderUserCheckout(item.address, item.porch, item.floor, item.intercom, '', this.state.date, paymentStore.selectTime);
                        setTimeout(() => {
                            console.log('paymentStore.Error', paymentStore.errorData);
                            if (paymentStore.errorData !== null) {
                                this.setState({
                                    errorData: toJS(paymentStore.errorData),
                                    errorModal: true
                                })
                            } else {
                                this.props.navigation.navigate('CloudPayment')
                            }
                        }, 1000)

                    }
                }
            );
        }
    }

// async handlePayment() {
//     const {userData} = userInfo;
//     const {addresses} = userData;
//     const {address, apartment, intercom, level, messageToCourier, porch} = this.props.navigation.state.params.navAddress
//     toJS(addresses).find((item: any) => {
//         if (item.address === paymentStore.selectAddress) {
//             paymentStore.orderUserCheckout(item.address, item.porch, item.floor, item.intercom, '', this.state.date, paymentStore.selectTime);
//             setTimeout(() => {
//                 console.log('paymentStore.Error', paymentStore.errorData);
//                 if (paymentStore.errorData !== null) {
//                     this.setState({
//                         errorData: toJS(paymentStore.errorData),
//                         errorModal: true
//                     })
//                 } else {
//                     this.props.navigation.navigate('CloudPayment')
//                 }
//             }, 1000)
//         } else {
//             console.log('false')
//             paymentStore.orderUserCheckout(address, item.porch, level, intercom, messageToCourier, this.state.date, paymentStore.selectTime);
//             setTimeout(() => {
//                 console.log('paymentStore.Error', paymentStore.errorData);
//                 if (paymentStore.errorData !== null) {
//                     this.setState({
//                         errorData: toJS(paymentStore.errorData),
//                         errorModal: true
//                     })
//                 } else {
//                     this.props.navigation.navigate('CloudPayment')
//                 }
//             }, 1000)
//         }
//     });
// };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    render() {

        const {allPrice} = basketStore;

        const {disabledBool, shopData, errorModal, errorData} = this.state;

        return (
            <>
                <Modal
                    visible={errorModal}
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
                            data={errorData}
                            handleCloseErrorModal={this.handleCloseErrorModal}
                        />
                    </ModalContent>
                </Modal>
                <Header
                    style={styles.headers}
                    headerLeft={
                        <AntDesign
                            onPress={() => this.props.navigation.goBack()}
                            style={{paddingLeft: 8}}
                            name={'left'}
                            size={18}
                            color={'#fff'}
                        />
                    }
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>
                            Заказ собирается
                        </Text>
                    }
                />
                <ScrollView style={{flex: 1}}>
                    <View style={styles.table}>
                        {
                            shopData.map(item => {
                                return this.renderList(item)
                            })
                        }
                    </View>
                    <View style={styles.delivery}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 10
                            }}
                        >
                            <View
                                style={{
                                    width: '50%',
                                }}
                            >
                                <Text
                                    style={{fontFamily: MontserratSemiBold, fontSize: size14,}}
                                >
                                    Доставка
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '50%',
                                    alignItems: "flex-end",
                                }}
                            >
                                <Text style={{fontFamily: MontserratRegular, fontSize: size16}}>
                                    {this.state.delivery} <Text
                                    style={{color: '#8CC83F', fontSize: size14}}>₽</Text>
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <View
                                style={{
                                    width: '50%',
                                }}
                            >
                                <Text
                                    style={{fontFamily: MontserratSemiBold, fontSize: size14,}}>
                                    из
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '50%',
                                    alignItems: "flex-end",
                                }}
                            >
                                <Text style={{fontFamily: MontserratSemiBold, fontSize: size14, color: '#8CC83F'}}>
                                    Supermango
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 15,
                            paddingBottom: 15,
                            backgroundColor: '#eceaea',
                            width: WINDOW_WIDTH,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: WINDOW_WIDTH - 40,
                            }}
                        >
                            <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                                Итого
                            </Text>
                            <Text style={{fontFamily: MontserratSemiBold, fontSize: size20}}>
                                {Math.ceil(parseInt(allPrice) + parseInt(this.state.delivery))}
                                <Text style={{color: '#8CC83F', fontSize: size16}}>₽</Text>
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingTop: 15,
                            paddingBottom: 15,
                            backgroundColor: '#8CC83F',
                            width: WINDOW_WIDTH,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: WINDOW_WIDTH - 40,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        >
                            {
                                disabledBool
                                    ? (
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: MontserratSemiBold,
                                                    fontSize: 20,
                                                    color: '#fff'
                                                }}
                                            >
                                                Заказ собран
                                            </Text>
                                        </View>
                                    )
                                    : (
                                        <>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: MontserratRegular,
                                                        fontSize: size12,
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    Время {' '}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: MontserratSemiBold,
                                                        fontSize: size12,
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    сборки
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: MontserratBold,
                                                        fontSize: size18,
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    8 {''}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: MontserratMedium,
                                                        fontSize: size18,
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    минут
                                                </Text>
                                            </View>
                                        </>
                                    )
                            }

                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: WINDOW_WIDTH - 40,
                                marginBottom: 5
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: MontserratRegular,
                                        fontSize: size12,
                                        color: '#ffffff'
                                    }}
                                >
                                    Ожидаемое время
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: MontserratSemiBold,
                                        fontSize: size12,
                                        color: '#ffffff',
                                    }}
                                >
                                    доставки
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: MontserratBold,
                                        fontSize: size18,
                                        color: '#ffffff'
                                    }}
                                >
                                    25 - 30
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: MontserratMedium,
                                        fontSize: size18,
                                        color: '#ffffff'
                                    }}
                                >
                                    м
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems: "flex-end",
                                width: WINDOW_WIDTH - 40
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    fontSize: 10,
                                    color: '#ffffff',
                                }}
                            >
                                в зависимости от
                            </Text>
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    fontSize: 10,
                                    color: '#ffffff',
                                }}
                            >
                                загруженность дорог
                            </Text>
                        </View>
                    </View>
                </>
                {
                    disabledBool
                        ? (
                            <TouchableOpacity
                                onPress={() => this.handlePayment()}
                                style={{
                                    backgroundColor: '#8CC83F',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 27,
                                    borderStyle: 'solid',
                                    borderColor: 'white',
                                    borderWidth: 2
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
                        )
                        : (
                            <View/>
                        )
                }

            </>
        )
    }
    ;
}

const
    styles = StyleSheet.create({
        headers: {
            width: WINDOW_WIDTH,
            paddingTop: size20,
            backgroundColor: '#8CC83F',
        },
        headerMiddleTitle: {
            fontFamily: MontserratRegular,
            fontSize: size18,
            color: '#fff',
        },
        table: {
            marginTop: 30,
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: 'center',
            alignSelf: 'center',
            width: WINDOW_WIDTH - 40,
        },
        delivery: {
            marginTop: 20,
            marginBottom: 50,
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: 'center',
            alignSelf: 'center',
            width: WINDOW_WIDTH - 40,
            flexDirection: "column"
        },
    });

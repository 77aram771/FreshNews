import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {WINDOW_WIDTH} from "../../../share/consts";
import {MontserratBold, MontserratRegular, MontserratSemiBold} from "../../../share/fonts";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import sellerStore from "../../../stores/SellerStore";
import {toJS} from "mobx";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ErrorModal} from "../modals/ErrorModal";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';

export default class DeliveryOrdersScreen extends Component<any, any> {

    state = {
        refreshing: false,
        mockData: [],
        code: '',
        errorModal: false,
        errorData: [],
    };

    async componentDidMount() {
        await sellerStore.getInfoOrder(this.props.route.params.id);
        this.setState({
            refreshing: true
        });
        setTimeout(() => {
            this.setState({
                mockData: toJS(sellerStore.infoOrder.items),
                refreshing: false
            });
            if (sellerStore.errorData !== null) {
                this.setState({
                    errorData: toJS(sellerStore.errorData),
                    errorModal: true
                })
            }
        }, 2000);
    };

    handleScanner = async (id: any, code: any) => {
        this.setState({
            code
        });
        await sellerStore.getScan(id, code);
        setTimeout(() => {
            if (sellerStore.errorData !== null) {
                this.setState({
                    errorData: toJS(sellerStore.errorData),
                    errorModal: true
                })
            }
            else {
                this.setState({
                    mockData: [toJS(sellerStore.scanData)],
                })
            }
        }, 3000)
    };

    handleCloseErrorModal = async () => {
        // alert('test')
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    renderItem(item: any) {
        return (
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(186,186,186, 0.2)',
                    paddingTop: 30,
                    paddingBottom: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    width: WINDOW_WIDTH,
                }}
                key={item.id}
            >
                <View
                    style={{
                        width: WINDOW_WIDTH - 40,
                        flexDirection: "row",
                        marginBottom: 10
                    }}
                >
                    <View
                        style={{
                            width: '50%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: '600',
                                fontFamily: MontserratBold,
                                color: item.bool ? '#bababa' : '#141414',
                                marginBottom: 13
                            }}
                        >
                            {item.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('BarcodeScanner', {
                                id: item.id,
                                handleScanner: this.handleScanner
                            })}
                        >
                            <Text
                                style={{
                                    color: "#8cc83f",
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold,

                                }}
                            >
                                Сверить позицию
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: '50%',
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: MontserratSemiBold,
                                color: '#8cc83f',
                                fontSize: 20,
                                fontWeight: '700',
                                marginRight: 40
                            }}
                        >
                            {`${item.weight} `}
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    fontWeight: '400',
                                    color: '#000000',
                                    fontSize: 17
                                }}
                            >
                                КГ
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontFamily: MontserratRegular,
                                color: '#000000',
                                fontSize: 15,
                                fontWeight: '400'
                            }}
                        >
                            {`${item.price} `}
                            <Text
                                style={{
                                    fontFamily: MontserratRegular,
                                    color: '#8cc83f',
                                    fontSize: 15,
                                    fontWeight: '400',
                                }}
                            >
                                ₽
                            </Text>
                        </Text>
                    </View>
                </View>
                {
                    item.status === 3
                        ? (
                            <View
                                style={{
                                    width: WINDOW_WIDTH - 40,
                                    paddingTop: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    <View style={{marginRight: 30}}>
                                        <Text
                                            style={{
                                                fontFamily: MontserratRegular,
                                                fontSize: 15,
                                            }}
                                        >
                                            Id
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: MontserratSemiBold,
                                                fontSize: 15,
                                            }}
                                        >
                                            {item.id}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: MontserratRegular,
                                                fontSize: 15,
                                            }}
                                        >
                                            Code
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: MontserratSemiBold,
                                                fontSize: 15,
                                            }}
                                        >
                                            0{this.state.code}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignSelf: "center",
                                    }}
                                >
                                    <Icon name="check" size={30} color="#8CC83F"/>
                                </View>
                            </View>
                        )
                        : null
                }
            </View>
        )
    };

    render() {

        const {refreshing} = this.state;

        return (
            <>
                {
                    refreshing
                        ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <PulseIndicator
                                    size={100}
                                    color='#8CC83F'
                                />
                            </View>
                        )
                        : (
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <Modal
                                    visible={this.state.errorModal}
                                    useNativeDriver={true}
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
                                            // handleOpenErrorModal={this.handleOpenErrorModal}
                                            handleCloseErrorModal={this.handleCloseErrorModal}
                                        />
                                    </ModalContent>
                                </Modal>
                                <View
                                    style={{
                                        width: WINDOW_WIDTH,
                                        height: 48,
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: '#f5f4f4',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            marginLeft: 15,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 15,
                                                height: 15,
                                                backgroundColor: '#8cc83f',
                                                borderRadius: 4,
                                                marginRight: 15,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontFamily: MontserratRegular,
                                                color: '#000'
                                            }}
                                        >
                                            Заказ {' '}
                                            <Text
                                                style={{
                                                    fontWeight: '700',
                                                    fontFamily: MontserratBold,
                                                }}
                                            >
                                                {this.props.route.params.id}
                                            </Text>
                                        </Text>
                                    </View>
                                    {
                                        this.props.route.params.status === 1
                                            ? (
                                                <View
                                                    style={{
                                                        width: 68,
                                                        height: 20,
                                                        backgroundColor: '#8cc83f',
                                                        borderRadius: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            fontFamily: MontserratRegular,
                                                            fontWeight: '600',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        На сборке
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                    {
                                        this.props.route.params.status === 3
                                            ? (
                                                <View
                                                    style={{
                                                        width: 120,
                                                        height: 20,
                                                        backgroundColor: '#c6203a',
                                                        borderRadius: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            fontFamily: MontserratRegular,
                                                            fontWeight: '600',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Ожидается оплаты
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                    {
                                        this.props.route.params.status === 4
                                            ? (
                                                <View
                                                    style={{
                                                        width: 120,
                                                        height: 20,
                                                        backgroundColor: '#17539b',
                                                        borderRadius: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            fontFamily: MontserratRegular,
                                                            fontWeight: '600',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Курьер спешит к вам
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                    {
                                        this.props.route.params.status === 5
                                            ? (
                                                <View
                                                    style={{
                                                        width: 100,
                                                        height: 20,
                                                        backgroundColor: '#8cc83f',
                                                        borderRadius: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            fontFamily: MontserratRegular,
                                                            fontWeight: '600',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Забрал заказ
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                    {
                                        this.props.route.params.status === 6
                                            ? (
                                                <View
                                                    style={{
                                                        width: 100,
                                                        height: 20,
                                                        backgroundColor: '#8cc83f',
                                                        borderRadius: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            fontFamily: MontserratRegular,
                                                            fontWeight: '600',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Заказ завершон
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                </View>
                                <ScrollView
                                    style={{
                                        width: WINDOW_WIDTH,
                                        alignSelf: "center",
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    {this.state.mockData.map((item: any) => {
                                        return (
                                            this.renderItem(item)
                                        )
                                    })}
                                </ScrollView>
                            </View>
                        )
                }
            </>
        )
    };
}

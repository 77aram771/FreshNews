import React, {Component} from "react";
import {observer} from "mobx-react";
import Header from "../../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {size14, size16, size20, WINDOW_WIDTH} from "../../../../../share/consts";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler} from "react-native";
import {MontserratBold, MontserratMedium, MontserratRegular, MontserratSemiBold} from "../../../../../share/fonts";
import {NavigationEvents} from "react-navigation";
import {PulseIndicator} from 'react-native-indicators';
import paymentStore from "../../../../../stores/PaymentStore";

@observer
export default class FinishOfferPage extends Component<any, any> {

    state = {
        delivery: 90,
        disabledBool: true,
        shopData: null,
        refreshing: true,
        sumPrice: ''
    };

    async componentDidMount() {
        await paymentStore.getOrder(this.props.navigation.state.params.id);
        this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({
                refreshing: false,
            }, () => {
                let allSum = paymentStore.order.items.reduce((a, v) => a = a + Math.ceil(parseInt(v.price.replace(/\s/g, ''))), 0)
                this.setState({
                    sumPrice: allSum
                })
            })
        }, 2000);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    };

    async onRefresh() {
        await paymentStore.getOrder(this.props.navigation.state.params.id);
        await this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({
                refreshing: false,
            })
        }, 2000);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    };

    async handleDeleteItem(id: number) {
        console.log('handleDeleteItem id', id);
        alert('На данный момент не работает')
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    handleBackButtonClick() {
        this.props.navigation.navigate('PurchaseHistory');
        return true;
    };

    renderList(item: any): any {
        return (
            <View
                key={item.id}
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: '100%',
                    marginBottom: 25,
                    borderBottomColor: '#d4cece',
                    borderBottomWidth: 1,
                    borderStyle: 'solid'
                }}
            >
                <View
                    style={{
                        width: '50%',
                    }}
                >
                    <Text style={{fontFamily: MontserratMedium, fontSize: size14}}>
                        {item.product.name}
                    </Text>
                </View>
                {
                    this.props.navigation.state.params.transaction !== null
                        ? (
                            <>
                                <View
                                    style={{
                                        width: '25%',
                                        alignItems: "flex-end",
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{fontFamily: MontserratBold, fontSize: size14}}>
                                        {parseInt(item.weight)} <Text style={{color: '#8CC83F'}}>кг.</Text>
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: '25%',
                                        alignItems: "flex-end",
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{fontFamily: MontserratSemiBold, fontSize: size14}}>
                                        {Math.ceil(parseInt(item.price.replace(/\s/g, '')))} <Text
                                        style={{color: '#8CC83F'}}>₽</Text>
                                    </Text>
                                </View>
                            </>
                        )
                        : (
                            <>
                                <View
                                    style={{
                                        width: '25%',
                                        alignItems: "flex-end",
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{fontFamily: MontserratBold, fontSize: size14}}>
                                        {parseInt(item.weight)} <Text style={{color: '#8CC83F'}}>кг.</Text>
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: '25%',
                                        alignItems: "flex-end",
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{fontFamily: MontserratSemiBold, fontSize: size14}}>
                                        {Math.ceil(parseInt(item.price.replace(/\s/g, '')))} <Text
                                        style={{color: '#8CC83F'}}>₽</Text>
                                    </Text>
                                </View>
                            </>
                        )
                }
                {
                    this.props.navigation.state.params.status === 6
                        ? <View/>
                        : (
                            <TouchableOpacity
                                onPress={() => this.handleDeleteItem(item.id)}
                                style={{
                                    marginTop: 20,
                                    marginBottom: 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: MontserratRegular,
                                        fontSize: size14,
                                        color: '#8E8E8E',
                                        textDecorationLine: 'underline',
                                        paddingTop: 8,
                                    }}
                                >
                                    Удалить
                                </Text>
                            </TouchableOpacity>
                        )
                }

            </View>
        )
    };

    render() {

        const {delivery, refreshing, sumPrice} = this.state;

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
                            paymentStore.order === null
                                ? (
                                    <>
                                        <Header
                                            style={styles.header}
                                            headerLeft={
                                                <AntDesign
                                                    style={{paddingLeft: 8}}
                                                    onPress={() => this.props.navigation.navigate('PurchaseHistory')}
                                                    name={'left'}
                                                    size={18}
                                                    color={'#464646'}
                                                />
                                            }
                                        />
                                        <View>
                                            <Text>TEST</Text>
                                        </View>
                                    </>
                                )
                                : (
                                    <>
                                        <NavigationEvents onDidFocus={() => this.onRefresh()}/>
                                        <Header
                                            style={styles.header}
                                            headerLeft={
                                                <AntDesign
                                                    style={{paddingLeft: 8}}
                                                    onPress={() => this.props.navigation.navigate('PurchaseHistory')}
                                                    name={'left'}
                                                    size={18}
                                                    color={'#464646'}
                                                />
                                            }
                                            headerMid={
                                                <Text style={styles.headerMiddleTitle}>
                                                    Заказы в{' '}
                                                    <Text style={{fontFamily: MontserratSemiBold, color: '#8CC83F'}}>
                                                        {paymentStore.order.items[0].product.shop.name}
                                                    </Text>
                                                </Text>
                                            }
                                        />
                                        <ScrollView
                                            style={{flex: 1}}
                                        >
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: 50,
                                                    backgroundColor: '#F5F4F4',
                                                    justifyContent: 'center',
                                                    // borderColor: 'red',
                                                    // borderWidth: 1,
                                                    // borderStyle: "solid"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                        // borderStyle: 'solid',
                                                        // borderWidth: 1,
                                                        // borderColor: 'red',
                                                        width: WINDOW_WIDTH - 40,
                                                        flexDirection: 'row'

                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontFamily: MontserratRegular,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            Заказ {' '}
                                                            <Text
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    fontSize: 16,
                                                                    fontFamily: MontserratBold,
                                                                    color: '#000'
                                                                }}
                                                            >
                                                                {paymentStore.order.id}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                    {
                                                        this.props.navigation.state.params.statusText === 'Собирается'
                                                            ? (
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        justifyContent: 'center',
                                                                        alignItems: "center",
                                                                        backgroundColor: '#2abfc4',
                                                                        borderRadius: 10,
                                                                        padding: 10
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 13,
                                                                            color: '#fff',
                                                                            fontFamily: MontserratSemiBold
                                                                        }}
                                                                    >
                                                                        Собирается
                                                                    </Text>
                                                                </View>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        this.props.navigation.state.params.statusText === 'Ожидает оплаты'
                                                            ? (
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        justifyContent: 'center',
                                                                        alignItems: "center",
                                                                        backgroundColor: '#eecd4e',
                                                                        borderRadius: 10,
                                                                        padding: 10
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 13,
                                                                            color: '#fff',
                                                                            fontFamily: MontserratSemiBold
                                                                        }}
                                                                    >
                                                                        Ожидает оплаты
                                                                    </Text>
                                                                </View>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        this.props.navigation.state.params.statusText === 'Курер спешит к вам'
                                                            ? (
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        justifyContent: 'center',
                                                                        alignItems: "center",
                                                                        backgroundColor: '#8CC83F',
                                                                        borderRadius: 10,
                                                                        padding: 10
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 13,
                                                                            color: '#fff',
                                                                            fontFamily: MontserratSemiBold
                                                                        }}
                                                                    >
                                                                        Курер спешит к вам
                                                                    </Text>
                                                                </View>
                                                            )
                                                            : null
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.table}>
                                                {
                                                    paymentStore.order.items.map((item: any) => {
                                                        return this.renderList(item)
                                                    })
                                                }
                                            </View>
                                            <View
                                                style={styles.delivery}
                                            >
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
                                            </View>
                                        </ScrollView>

                                        <View>
                                            {
                                                this.props.navigation.state.params.status === 6
                                                    ? <View/>
                                                    : (
                                                        <>
                                                            <View
                                                                style={{
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    paddingTop: 25,
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
                                                                        marginBottom: 20
                                                                    }}
                                                                >
                                                                    <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                                                                        Время
                                                                        {' '}
                                                                        <Text
                                                                            style={{
                                                                                color: '#000',
                                                                                fontFamily: MontserratBold,
                                                                                fontSize: size14
                                                                            }}
                                                                        >
                                                                            доставки
                                                                        </Text>
                                                                    </Text>
                                                                    <Text style={{
                                                                        color: '#000',
                                                                        fontFamily: MontserratBold,
                                                                        fontSize: size14
                                                                    }}>
                                                                        25 - 30 <Text style={{
                                                                        color: '#8CC83F',
                                                                        fontFamily: MontserratRegular,
                                                                        fontSize: size16
                                                                    }}>м</Text>
                                                                    </Text>
                                                                </View>
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
                                                                    <Text
                                                                        style={{fontFamily: MontserratSemiBold, fontSize: size20}}
                                                                    >
                                                                        {sumPrice + delivery}
                                                                        <Text style={{color: '#8CC83F', fontSize: size16}}> ₽</Text>
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            {
                                                                this.props.navigation.state.params.transaction !== null
                                                                    ? (
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                backgroundColor: 'grey',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                paddingVertical: 27,
                                                                            }}
                                                                            disabled={true}
                                                                        >
                                                                            {
                                                                                this.props.navigation.state.params.status === 1
                                                                                    ? (
                                                                                        <Text
                                                                                            style={{
                                                                                                color: '#FFFFFF',
                                                                                                fontFamily: MontserratRegular,
                                                                                                fontSize: size20,
                                                                                            }}
                                                                                        >
                                                                                            Заказ собирается
                                                                                        </Text>
                                                                                    )
                                                                                    : (
                                                                                        <Text
                                                                                            style={{
                                                                                                color: '#FFFFFF',
                                                                                                fontFamily: MontserratRegular,
                                                                                                fontSize: size20,
                                                                                            }}
                                                                                        >
                                                                                            Оплатить заказ
                                                                                        </Text>
                                                                                    )
                                                                            }
                                                                        </TouchableOpacity>
                                                                    )
                                                                    : (
                                                                        <TouchableOpacity
                                                                            onPress={() => this.props.navigation.navigate('FinishPaymentPage', {
                                                                                id: this.props.navigation.state.params.id,
                                                                                shopName: paymentStore.order.items[0].product.shop.name,
                                                                                finishPayment: Math.ceil(parseInt(paymentStore.order.items[0].price.replace(/\s/g, '')) + delivery)
                                                                            })}
                                                                            style={{
                                                                                backgroundColor: '#8CC83F',
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
                                                                    )
                                                            }
                                                        </>
                                                    )
                                            }
                                        </View>
                                    </>
                                )
                        )
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    header: {
        paddingTop: size16,
    },
    headerMiddleTitle: {
        fontFamily: MontserratRegular,
        fontSize: size20,
        color: '#000000',
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
        marginBottom: 50,
        justifyContent: "center",
        alignItems: "flex-start",
        alignContent: 'center',
        alignSelf: 'center',
        width: WINDOW_WIDTH - 40,
        flexDirection: "column"
    },
});

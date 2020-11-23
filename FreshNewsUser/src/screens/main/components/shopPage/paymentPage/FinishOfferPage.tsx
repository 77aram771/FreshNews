import React, {Component} from "react";
import {observer} from "mobx-react";
import {NavigationProps} from "../../../../../share/interfaces";
import Header from "../../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {size14, size16, size20, WINDOW_WIDTH} from "../../../../../share/consts";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MontserratBold, MontserratMedium, MontserratRegular, MontserratSemiBold} from "../../../../../share/fonts";
import {toJS} from "mobx";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import paymentStore from "../../../../../stores/PaymentStore";

@observer
export default // @ts-ignore
class FinishOfferPage extends Component<NavigationProps> {

    state = {
        delivery: 90,
        disabledBool: true,
        shopData: null,
        refreshing: true
    };

    async componentDidMount() {
        const {getOrder} = paymentStore;
        getOrder(this.props.navigation.state.params.id);
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: paymentStore.order
            })
        }, 3000)
    };

    async handleDeleteItem(id: number) {
        console.log('handleDeleteItem id', id)
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
                <View
                    style={{
                        width: '25%',
                        alignItems: "flex-end",
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{fontFamily: MontserratBold, fontSize: size14}}>
                        {item.weight} <Text style={{color: '#8CC83F'}}>г</Text>
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
                        {Math.ceil(item.price)} <Text style={{color: '#8CC83F'}}>₽</Text>
                    </Text>
                </View>
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

        const {shopData, delivery, refreshing} = this.state;

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
                            shopData === null
                                ? (
                                    <View>
                                        <Text>TEST</Text>
                                    </View>
                                )
                                : (
                                    <>
                                        <Header
                                            style={styles.header}
                                            headerLeft={
                                                <AntDesign
                                                    style={{paddingLeft: 8}}
                                                    onPress={() => this.props.navigation.navigate('PurchaseHistory')}
                                                    name={'left'}
                                                    size={size16}
                                                    color={'#464646'}
                                                />
                                            }
                                            headerMid={
                                                <Text style={styles.headerMiddleTitle}>
                                                    Заказы в{' '}
                                                    <Text style={{fontFamily: MontserratSemiBold, color: '#8CC83F'}}>
                                                        {shopData.items[0].product.shop.name}
                                                    </Text>
                                                </Text>
                                            }
                                        />
                                        <ScrollView
                                            style={{flex: 1}}
                                        >
                                            <View style={styles.table}>
                                                {
                                                    shopData.items.map(item => {
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
                                                            style={{fontFamily: MontserratSemiBold, fontSize: size14,}}>
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
                                                                        {Math.ceil(parseInt(shopData.items[0].price) + delivery)}
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
                                                                                shopName: shopData.items[0].product.shop.name
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

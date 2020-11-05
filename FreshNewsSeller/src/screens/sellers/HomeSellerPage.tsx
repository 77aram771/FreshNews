import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import {WINDOW_WIDTH} from "../../share/consts";
import {observer} from "mobx-react";
import DeliveryOrders from "./DeliveryOrders";
import CollectedOrders from "./CollectedOrders";
import ShopAssortment from "./ShopAssortment";
import AllCollectedOrders from "./AllCollectedOrders";
import {MontserratRegular} from "../../share/fonts";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import sellerStore from '../../stores/SellerStore';
import authStore from '../../stores/UserInfo';
import {toJS} from "mobx";

@observer
export default // @ts-ignore
class HomeSellerPage extends Component<any, any> {

    state = {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        refreshing: false,
        orders: null,
        products: null,
        startOrder: [],
        buildOrder: [],
        finishOrder: []
    };

    componentDidMount() {
        sellerStore.getUserData();
        authStore.getUserInfo();

        setTimeout(() => {
            this.setState({
                orders: toJS(sellerStore.sellerData.orders),
            }, () => {
                // console.log(this.state.orders);
                this.state.orders.map((item: any) => {
                    if (item.status === 1) {
                        this.state.startOrder.push(item);
                        // console.log('startOrder', this.state.startOrder)
                    } else if (item.status === 4 || item.status === 5) {
                        this.state.buildOrder.push(item);
                        console.log('buildOrder', this.state.buildOrder)
                    }
                    else if (item.status === 6) {
                        this.state.finishOrder.push(item);
                        // console.log('finishOrder', this.state.finishOrder)
                    }
                })
            })
        }, 1000)
    };

    handleShow1() {
        this.setState({
            show1: !this.state.show1
        })
    };

    handleShow2() {
        this.setState({
            show2: !this.state.show2
        })
    };

    handleShow3() {
        this.setState({
            show3: !this.state.show3
        })
    };

    handleShow4() {
        this.setState({
            show4: !this.state.show4
        })
    };

    onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false
            })
        }, 2000)
    };

    render() {

        const {show1, show2, show3, show4, refreshing} = this.state;

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
                            <ScrollView
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff'
                                }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.handleShow1()}
                                        style={{
                                            width: WINDOW_WIDTH,
                                            height: 48,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            backgroundColor: '#f5f4f4'
                                        }}
                                    >
                                        <View style={{
                                            width: WINDOW_WIDTH - 40,
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}>
                                            {
                                                show1
                                                    ? (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#8cc83f',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#d96363',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                            }

                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '400',
                                                    fontFamily: MontserratRegular,
                                                    color: '#000'
                                                }}
                                            >
                                                Заказы на сброку
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        show1
                                            ? <DeliveryOrders startOrder={this.state.startOrder} navigation={this.props.navigation}/>
                                            : null
                                    }

                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.handleShow2()}
                                        style={{
                                            width: WINDOW_WIDTH,
                                            height: 48,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            backgroundColor: '#f5f4f4'
                                        }}
                                    >
                                        <View style={{
                                            width: WINDOW_WIDTH - 40,
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}>
                                            {
                                                show2
                                                    ? (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#8cc83f',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#d96363',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                            }
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '400',
                                                    fontFamily: MontserratRegular,
                                                    color: '#000'
                                                }}
                                            >
                                                Собранные заказы
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        show2
                                            ? <CollectedOrders buildOrder={this.state.buildOrder} navigation={this.props.navigation}/>
                                            : null
                                    }

                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.handleShow3()}
                                        style={{
                                            width: WINDOW_WIDTH,
                                            height: 48,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            backgroundColor: '#f5f4f4'
                                        }}
                                    >
                                        <View style={{
                                            width: WINDOW_WIDTH - 40,
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}>
                                            {
                                                show3
                                                    ? (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#8cc83f',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#d96363',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                            }
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '400',
                                                    fontFamily: MontserratRegular,
                                                    color: '#000'
                                                }}
                                            >
                                                Ассортимент магазина
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        show3
                                            ? <ShopAssortment products={this.state.products}
                                                              navigation={this.props.navigation}/>
                                            : null
                                    }

                                </View>
                                <View
                                    style={show4 ? {
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 45
                                    } : {
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 5
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.handleShow4()}
                                        style={{
                                            width: WINDOW_WIDTH,
                                            height: 48,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            backgroundColor: '#f5f4f4'
                                        }}
                                    >
                                        <View style={{
                                            width: WINDOW_WIDTH - 40,
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}>
                                            {
                                                show4
                                                    ? (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#8cc83f',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <View
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                backgroundColor: '#d96363',
                                                                marginRight: 15,
                                                                borderRadius: 4
                                                            }}
                                                        />
                                                    )
                                            }
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: '400',
                                                    fontFamily: MontserratRegular,
                                                    color: '#000'
                                                }}
                                            >
                                                Все собранные заказы
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        show4
                                            ? <AllCollectedOrders finishOrders={this.state.finishOrder} navigation={this.props.navigation}/>
                                            : null
                                    }

                                </View>
                            </ScrollView>
                        )
                }
            </>
        )
    };
}

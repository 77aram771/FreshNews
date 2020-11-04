import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import {size34, WINDOW_WIDTH} from "../../share/consts";
import {LogoAndTitle} from "../../share/components/LogoAndTitle";
import Feather from "react-native-vector-icons/Feather";
import {observer} from "mobx-react";
import DeliveryOrders from "./DeliveryOrders";
import CollectedOrders from "./CollectedOrders";
import ShopAssortment from "./ShopAssortment";
import AllCollectedOrders from "./AllCollectedOrders";
import {MontserratRegular} from "../../share/fonts";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import sellerStore from '../../stores/SellerStore';

@observer
export default // @ts-ignore
class HomeSellerPage extends Component<any, any> {

    static navigationOptions = ({navigation}: { navigation: any }) => {
        return {
            headerStyle: {
                height: 60
            },
            headerTitle: () => (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                >
                    <LogoAndTitle courier={true}/>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                        marginLeft: 15,
                    }}
                    onPress={() => alert('Тест!')}
                >
                    <Feather
                        name={'menu'}
                        size={size34}
                        color={'rgba(112, 112, 112, 0.4)'}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => alert('Тест!')}
                    style={{marginRight: 8}}
                />
            )
        };
    };

    state = {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        refreshing: false,
        orders: null,
        products: null
    };

    componentDidMount() {
        sellerStore.getUserData();

        console.log('sellerData', sellerStore.sellerData);
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
                                            ? <DeliveryOrders navigation={this.props.navigation}/>
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
                                            ? <CollectedOrders navigation={this.props.navigation}/>
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
                                            ? <ShopAssortment navigation={this.props.navigation}/>
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
                                            ? <AllCollectedOrders navigation={this.props.navigation}/>
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

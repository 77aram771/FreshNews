import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import {LogoAndTitle} from "../../../share/components/LogoAndTitle";
import {size12, size34, WINDOW_WIDTH} from "../../../share/consts";
import Feather from "react-native-vector-icons/Feather";
import {NavigationProps} from "../../../share/interfaces";
import {MontserratBold, MontserratRegular, MontserratSemiBold} from "../../../share/fonts";
import {PulseIndicator} from 'react-native-indicators';
import sellerStore from "../../../stores/SellerStore";

export default class DeliveryOrdersScreen extends Component<NavigationProps, any> {

    state = {
        refreshing: false,
        mockData: [
            {
                id: 1,
                title: 'Помидоры «Чери»',
                kg: 1,
                price: 1000,
                bool: false,
            },
        ]
    }

    componentDidMount() {
        console.log('dataInfo', sellerStore.dataInfo);
        sellerStore.getDataInfo(this.props.route.params.number);
    }

    handleSend(id: number) {
        const newItemsArr = this.state.mockData.map(obj => obj.id === id ? {...obj, bool: !obj.bool} : obj);
        this.setState({mockData: newItemsArr});
    };

    handleScanner() {
        this.props.navigation.navigate('ScannerScreen')
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

    renderItem(item: any) {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => this.handleSend(item.id)}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(186,186,186, 0.2)',
                    paddingTop: 30,
                    paddingBottom: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}
                key={item.id}
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
                        {item.title}
                    </Text>
                    {
                        item.bool
                            ? null
                            : (
                                <TouchableOpacity
                                    onPress={() => this.handleScanner()}
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
                            )
                    }
                </View>
                <View
                    style={{
                        width: '50%',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}
                >
                    {
                        item.bool
                            ? null
                            : (
                                <>
                                    <Text
                                        style={{
                                            fontFamily: MontserratSemiBold,
                                            color: '#8cc83f',
                                            fontSize: 20,
                                            fontWeight: '700',
                                            marginRight: 40
                                        }}
                                    >
                                        {`${item.kg} `}
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
                                </>
                            )
                    }

                </View>
            </TouchableOpacity>
        )
    }

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
                                                {this.props.route.params.number}
                                            </Text>
                                        </Text>
                                    </View>
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
                                </View>
                                <ScrollView
                                    style={{
                                        width: WINDOW_WIDTH - 40,
                                        alignSelf: "center"
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    {this.state.mockData.map(item => (
                                        this.renderItem(item)
                                    ))}
                                </ScrollView>
                            </View>
                        )
                }
            </>
        )
    }
}

import React, {Component} from 'react';
import {NavigationProps} from "../../../../share/interfaces";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {size16, size20, WINDOW_WIDTH} from "../../../../share/consts";
import {MontserratBold, MontserratMedium, MontserratRegular, MontserratSemiBold} from "../../../../share/fonts";
import Header from "../../../../share/components/Header";
// @ts-ignore
import iconStar from '../../../../../assets/iconImages/icon-star.png'
import {observer} from "mobx-react";
import shopsStore from "../../../../stores/ShopsStore";
import {toJS} from "mobx";

@observer
export default class PurchaseHistory extends Component<NavigationProps> {

    state = {
        mockData: [
            {
                id: 1,
                order: 3400,
                bool: false,
                rating: 3,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 2,
                order: 3428,
                bool: false,
                rating: 5,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 3,
                order: 3400,
                bool: false,
                rating: 3,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 4,
                order: 3428,
                bool: false,
                rating: 5,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 5,
                order: 3400,
                bool: false,
                rating: 3,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 6,
                order: 3428,
                bool: false,
                rating: 5,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 7,
                order: 3400,
                bool: false,
                rating: 3,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 8,
                order: 3428,
                bool: false,
                rating: 5,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 9,
                order: 3400,
                bool: false,
                rating: 3,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
            {
                id: 10,
                order: 3428,
                bool: false,
                rating: 5,
                fullPrice: 1749,
                products: [
                    {
                        id: 1,
                        name: 'Помидоры «Чери»',
                        gram: 856,
                        price: 1482
                    },
                    {
                        id: 2,
                        name: 'Помидоры «Чери» с очень длинными азванием',
                        gram: 1242,
                        price: 262
                    },
                ],
            },
        ]
    }

    renderItem(item: any) {
        console.log('item', toJS(item));
        if (item.status === 1) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 1')}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text>Собирается</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (item.status === 2) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 2')}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text>Собирается</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (item.status === 3) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 3')}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text>Собирается</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (item.status === 4) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 4')}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#8CC83F',
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <FontAwesome5
                                    name={'check'}
                                    size={size16}
                                    color={'#fff'}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (item.status === 5) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 5')}
                    style={{
                        width: "100%",
                        backgroundColor: '#8CC83F',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    color: '#fff'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#fff'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text style={{color: '#fff', marginRight: 10}}>В пути</Text>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{fontFamily: MontserratSemiBold, color: '#000'}}>{item.delivery_time} мин</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else if (item.status === 6) {
            return (
                <TouchableOpacity
                    onPress={() => alert('status 6')}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text style={{marginRight: 10}}>Подробнее</Text>
                            <View
                                style={{
                                    backgroundColor: '#8CC83F',
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <FontAwesome5
                                    name={'check'}
                                    size={size16}
                                    color={'#fff'}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

    }

    render() {
        return (
            <>
                <Header
                    style={styles.header}
                    headerLeft={
                        <AntDesign
                            style={{paddingLeft: 8}}
                            onPress={() => this.props.navigation.goBack()}
                            name={'left'}
                            size={size16}
                            color={'#464646'}
                        />
                    }
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>
                            История заказов
                        </Text>
                    }
                    headerRight={
                        <View/>
                    }
                />
                <ScrollView
                    style={{
                        flex: 1,
                        marginTop: 30
                    }}
                >
                    <View
                        style={{
                            width: WINDOW_WIDTH - 40,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                        }}
                    >
                        {shopsStore.allOrders.map(item => (
                            this.renderItem(item)
                        ))}
                    </View>
                </ScrollView>
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
        borderBottomWidth: 2,
        opacity: 0.8
    },
    headerMiddleTitle: {
        fontFamily: MontserratRegular,
        fontSize: size20,
        color: '#000000',
    },
});


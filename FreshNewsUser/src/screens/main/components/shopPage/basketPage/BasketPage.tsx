import React, {Component} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';
import Header from '../../../../../share/components/Header';
import {size16, size20, size34, WINDOW_WIDTH} from '../../../../../share/consts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import BasketListItem from './BasketListItem';
import Modal from 'react-native-modal';
import {CheckOut} from './Checkout';
import {NavigationProps} from '../../../../../share/interfaces';
import basketStore from '../../../../../stores/BasketStore';
import modalsStore from "../../../../../stores/ModalsStore";
import {PulseIndicator} from 'react-native-indicators';
import {toJS} from "mobx";

@observer
export default class BasketPage extends Component<NavigationProps> {

    state = {
        shopData: [],
        refreshing: true
    };

    async componentDidMount() {
        const {getCartUserInfo, cartUserInfo} = basketStore;
        getCartUserInfo()
        this.setState({
            refreshing: true
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: cartUserInfo
            }, () => {
                console.log('cartUserInfo', toJS(this.state.shopData));
            })
        }, 1000)
    };

    onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            const {getCartUserInfo, cartUserInfo} = basketStore;
            getCartUserInfo()
            this.setState({
                refreshing: false,
                shopData: cartUserInfo
            })
        }, 2000)
    };

    render() {

        const {onShowCheckOutDialog, isShowCheckOutDialog} = modalsStore;

        const {allPrice, productCount, cartUserInfo} = basketStore;

        return (

            <View style={styles.container}>
                {
                    this.state.refreshing
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
                            <>
                                <Modal
                                    backdropTransitionOutTiming={0}
                                    animationIn={'slideInDown'}
                                    animationOut={'slideOutUp'}
                                    animationInTiming={400}
                                    animationOutTiming={400}
                                    onBackButtonPress={onShowCheckOutDialog}
                                    hideModalContentWhileAnimating={true}
                                    backdropOpacity={0}
                                    onBackdropPress={onShowCheckOutDialog}
                                    style={{margin: 0}}
                                    isVisible={isShowCheckOutDialog}
                                >
                                    <CheckOut/>
                                </Modal>
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
                                            Корзина
                                        </Text>
                                    }
                                    headerRight={
                                        cartUserInfo.length > 0
                                            ? (
                                                <EvilIcons
                                                    style={{paddingRight: 8}}
                                                    onPress={onShowCheckOutDialog}
                                                    name={'trash'}
                                                    size={size34}
                                                    color={'#8E8E8E'}
                                                />
                                            )
                                            : (
                                                <View/>
                                            )
                                    }
                                />
                                {
                                    this.state.shopData.length > 0
                                        ? (
                                            <>
                                                <FlatList
                                                    scrollEnabled={true}
                                                    keyExtractor={item => item.id.toString()}
                                                    showsVerticalScrollIndicator={true}
                                                    data={this.state.shopData}
                                                    renderItem={({item, index}) => (
                                                        <BasketListItem
                                                            index={productCount}
                                                            key={index}
                                                            data={item}
                                                            onRefresh={() => this.onRefresh()}
                                                        />
                                                    )}
                                                    ListFooterComponent={
                                                        <>
                                                            {
                                                                this.state.shopData.length <= 0
                                                                    ? null
                                                                    : <>
                                                                        <View
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                justifyContent: 'space-between',
                                                                                paddingHorizontal: 16,
                                                                                paddingTop: 30,
                                                                                paddingBottom: size34 * 2,
                                                                            }}
                                                                        >
                                                                            <Text
                                                                                style={{
                                                                                    fontFamily: MontserratSemiBold,
                                                                                    fontSize: size16
                                                                                }}
                                                                            >
                                                                                Доставка
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    fontFamily: MontserratRegular,
                                                                                    fontSize: size20
                                                                                }}
                                                                            >
                                                                                99 <Text style={{color: '#8CC83F'}}>₽</Text>
                                                                            </Text>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                justifyContent: 'space-between',
                                                                                paddingHorizontal: 16,
                                                                                paddingTop: 30,
                                                                                flex: 1,
                                                                            }}
                                                                        >
                                                                            <Text style={{
                                                                                fontFamily: MontserratRegular,
                                                                                fontSize: size16
                                                                            }}>
                                                                                Время доставки
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    fontFamily: MontserratSemiBold,
                                                                                    fontSize: size20
                                                                                }}>
                                                                                25-30{' '}
                                                                                <Text
                                                                                    style={{
                                                                                        color: '#8CC83F',
                                                                                        fontFamily: MontserratRegular
                                                                                    }}>
                                                                                    мин
                                                                                </Text>
                                                                            </Text>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                justifyContent: 'space-between',
                                                                                paddingHorizontal: 16,
                                                                                paddingTop: 30,
                                                                                flex: 1,
                                                                            }}
                                                                        >
                                                                            <Text style={{
                                                                                fontFamily: MontserratRegular,
                                                                                fontSize: size16
                                                                            }}>
                                                                                Итого
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    fontFamily: MontserratSemiBold,
                                                                                    fontSize: size20
                                                                                }}
                                                                            >
                                                                                {Math.ceil(allPrice)}
                                                                                <Text
                                                                                    style={{
                                                                                        color: '#8CC83F',
                                                                                        fontFamily: MontserratRegular
                                                                                    }}>
                                                                                    ₽
                                                                                </Text>
                                                                            </Text>
                                                                        </View>
                                                                    </>
                                                            }
                                                        </>
                                                    }
                                                    refreshControl={
                                                        <RefreshControl
                                                            refreshing={this.state.refreshing}
                                                            onRefresh={this.onRefresh.bind(this)}
                                                        />
                                                    }
                                                />
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('PaymentPage')}
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
                                                        Оформить заказ
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                        : (
                                            <View
                                                style={{
                                                    marginTop: 60,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        fontFamily: MontserratSemiBold
                                                    }}
                                                >
                                                    Не добавлены товары
                                                </Text>
                                            </View>
                                        )
                                }
                            </>
                        )
                }
            </View>
        );
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
});

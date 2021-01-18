import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {SvgUri} from "react-native-svg";

@observer
export default // @ts-ignore
class BasketPage extends Component<NavigationProps> {

    state = {
        shopData: [],
        deliveryPrice: 90,
        refreshing: true,
        itemQuantity: ''
    };

    async componentDidMount() {
        const {getCartUserInfo, cartUserInfo} = basketStore;
        await getCartUserInfo();
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: cartUserInfo,
            }, () => {
                this.setState({
                    itemQuantity: this.state.shopData.length
                }, () => {
                    console.log('basketStore.stackItem', toJS(basketStore.stackItem).length);
                })
            })
        }, 1000)
    };

    async onRefresh() {
        const {getCartUserInfo, cartUserInfo} = basketStore;
        await getCartUserInfo();
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: cartUserInfo,
            }, () => {
                this.setState({
                    itemQuantity: this.state.shopData.length
                })
            })
        }, 2000)
    };

    render() {

        const {onShowCheckOutDialog, isShowCheckOutDialog} = modalsStore;

        const {allPrice, productCount, cartUserInfo} = basketStore;

        return (
            <View style={styles.container}>
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
                            size={18}
                            color={'#464646'}
                        />
                    }
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>Корзина</Text>
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
                            this.state.shopData.length > 0
                                ? (
                                    <>
                                        <FlatList
                                            scrollEnabled={true}
                                            keyExtractor={item => item.id.toString()}
                                            showsVerticalScrollIndicator={true}
                                            data={this.state.shopData}
                                            renderItem={({item, index}) => {
                                                return (
                                                    <BasketListItem
                                                        index={productCount}
                                                        key={index}
                                                        data={item}
                                                        onRefresh={() => this.onRefresh()}
                                                    />
                                                )
                                            }}
                                            ListFooterComponent={
                                                <>
                                                    {
                                                        basketStore.stackItem.length < 2
                                                            ? (
                                                                <>
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
                                                                            {this.state.deliveryPrice} <Text
                                                                            style={{color: '#8CC83F'}}>₽</Text>
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
                                                                        <Text
                                                                            style={{
                                                                                fontFamily: MontserratRegular,
                                                                                fontSize: size16
                                                                            }}
                                                                        >
                                                                            Время доставки
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                fontFamily: MontserratSemiBold,
                                                                                fontSize: size20
                                                                            }}
                                                                        >
                                                                            25-30{' '}
                                                                            <Text
                                                                                style={{
                                                                                    color: '#8CC83F',
                                                                                    fontFamily: MontserratRegular
                                                                                }}
                                                                            >
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
                                                                            marginBottom: 50
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                fontFamily: MontserratRegular,
                                                                                fontSize: size16
                                                                            }}
                                                                        >
                                                                            Итого
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                fontFamily: MontserratSemiBold,
                                                                                fontSize: size20
                                                                            }}
                                                                        >
                                                                            {Math.ceil(allPrice) + this.state.deliveryPrice}
                                                                            <Text
                                                                                style={{
                                                                                    color: '#8CC83F',
                                                                                    fontFamily: MontserratRegular
                                                                                }}
                                                                            >
                                                                                ₽
                                                                            </Text>
                                                                        </Text>
                                                                    </View>
                                                                </>
                                                            )
                                                            : null

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
                                        {
                                            basketStore.stackItem.length < 2
                                                ? null
                                                : (
                                                    <View
                                                        style={{
                                                            width: WINDOW_WIDTH,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            backgroundColor: '#fff',
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                flexDirection: "row",
                                                                width: WINDOW_WIDTH - 20,
                                                                borderTopWidth: 0.5,
                                                                borderColor: 'grey'
                                                            }}
                                                        >
                                                            {/*<Text*/}
                                                            {/*    style={{*/}
                                                            {/*        fontFamily: MontserratSemiBold,*/}
                                                            {/*        fontSize: 16,*/}
                                                            {/*        color: 'red'*/}
                                                            {/*    }}*/}
                                                            {/*>*/}
                                                            {/*    Цена*/}
                                                            {/*</Text>*/}
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                Магазин
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                Доставка
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                Итого
                                                            </Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                flexDirection: "column",
                                                                width: WINDOW_WIDTH - 20,
                                                                borderBottomWidth: 0.5,
                                                                borderColor: 'grey',
                                                            }}
                                                        >
                                                            {
                                                                basketStore.stackItem.map((item: any, index: any) => {
                                                                    console.log("item", toJS(item));
                                                                    let img = item.image[0].substr(item.image[0].length - 3);
                                                                    return (
                                                                        <View
                                                                            key={index}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 40,
                                                                                justifyContent: "space-between",
                                                                                alignItems: "center",
                                                                                flexDirection: "row",
                                                                                marginBottom: 10
                                                                            }}
                                                                        >
                                                                            <View
                                                                                style={{
                                                                                    flexDirection: "row",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center"
                                                                                }}
                                                                            >
                                                                                {
                                                                                    img === 'svg'
                                                                                        ? <SvgUri
                                                                                            width="30"
                                                                                            height="30"
                                                                                            uri={item.image[0]}
                                                                                            style={{marginRight: 5}}
                                                                                        />
                                                                                        : <Image
                                                                                            resizeMode={'cover'}
                                                                                            source={{uri: item.image[0]}}
                                                                                            style={{
                                                                                                width: 30,
                                                                                                height: 30,
                                                                                                marginRight: 5,
                                                                                                borderRadius: 5,
                                                                                            }}
                                                                                        />
                                                                                }
                                                                                <Text>{item.marketName}</Text>
                                                                            </View>
                                                                            <Text>{item.marketPrice} р.</Text>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                        <View
                                                            style={{
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                flexDirection: "row",
                                                                width: WINDOW_WIDTH - 20,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: '#000'
                                                                }}
                                                            >
                                                                {`${Math.ceil(basketStore.allPrice)} р.`}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: '#000'
                                                                }}
                                                            >
                                                                {`${this.state.deliveryPrice} р.`}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 16,
                                                                    color: '#000'
                                                                }}
                                                            >
                                                                {`${Math.ceil(basketStore.allPrice) + this.state.deliveryPrice} р.`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )
                                        }
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
                                            flex: 1,
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

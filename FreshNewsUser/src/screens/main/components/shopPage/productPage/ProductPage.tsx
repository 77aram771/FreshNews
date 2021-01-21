import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {size14, size16, size20, size24, size34, size44, WINDOW_WIDTH} from '../../../../../share/consts';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import shopsStore from "../../../../../stores/ShopsStore";
import basketStore from "../../../../../stores/BasketStore";
import AsyncStorage from "@react-native-community/async-storage";

interface intProductPage {
    refresh: any,
    navigation: any
}

@observer
export default class ProductPage extends Component<intProductPage, any> {

    state = {count: 1};

    countUpFunction() {
        this.setState({count: this.state.count + 1});
    }

    countDownFunction() {
        this.state.count !== 1
            ? this.setState({count: this.state.count - 1})
            : null;
    }

    async handleAddItem(id: number, count: number) {
        let getToken = await AsyncStorage.getItem('Token');
        if (getToken === null) {
            this.props.navigation.navigate('Login')
        }
        await basketStore.getAddCartUser(id, count)
        await shopsStore.onShowShopInformation()
        setTimeout(() => {
            this.props.refresh()
        }, 1000)
    }

    render() {

        const {onShowShopInformation, getShopItemInfo} = shopsStore;

        const {description, id, image, name, price, weight} = toJS(getShopItemInfo);

        return (
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        backgroundColor: '#ffffff',
                        alignItems: 'center',
                        borderRadius: 20,
                        margin: 20,
                    }}
                >
                    <TouchableOpacity
                        style={{marginLeft: 'auto', paddingTop: 16, paddingRight: 16}}
                        onPress={onShowShopInformation}
                    >
                        <EvilIcons name={'close'} size={size34 * 1.5} color={'#464646'}/>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            resizeMode={'contain'}
                            source={{uri: image}}
                            style={{width: WINDOW_WIDTH / 1.7, height: WINDOW_WIDTH / 2}}
                        />
                        <Text style={{fontSize: size20, fontFamily: MontserratBold}}>
                            {name}
                        </Text>
                        <Text
                            style={{
                                fontSize: size14,
                                fontFamily: MontserratRegular,
                                paddingTop: 20,
                                width: WINDOW_WIDTH * 0.7,
                            }}
                        >
                            {description}
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingTop: size44,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: WINDOW_WIDTH * 0.9,
                            paddingBottom: size24,
                        }}
                    >
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: size14, fontFamily: MontserratRegular}}>
                                Количество
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <FontAwesome5
                                    onPress={() => this.countDownFunction()}
                                    name={'minus'}
                                    size={size20}
                                    color={'#8CC83F'}
                                />
                                <Text
                                    style={{
                                        fontSize: size20,
                                        fontFamily: MontserratSemiBold,
                                        paddingHorizontal: 11,
                                    }}
                                >
                                    {this.state.count}
                                </Text>
                                <FontAwesome5
                                    onPress={() => this.countUpFunction()}
                                    name={'plus'}
                                    size={size20}
                                    color={'#8CC83F'}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={{fontSize: size14, fontFamily: MontserratRegular}}>
                                Стоимость
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: 13}}>
                                <Text
                                    style={{
                                        fontFamily: MontserratSemiBold,
                                        fontSize: size16,
                                        color: '#000000',
                                    }}
                                >
                                    {parseInt(price.replace(/\s/g, ''))} <Text style={{color: '#8CC83F'}}>₽ за</Text>
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: MontserratSemiBold,
                                        fontSize: size16,
                                        color: '#000000',
                                        marginLeft: 8,
                                    }}
                                >
                                    {weight} <Text style={{color: '#8CC83F'}}>кг.</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.handleAddItem(id, this.state.count)}
                        style={{
                            backgroundColor: '#8CC83F',
                            borderRadius: 20,
                            paddingVertical: 16,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: WINDOW_WIDTH * 0.93,
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome5
                            name={'shopping-cart'}
                            size={size16}
                            color={'#FFFFFF'}
                        />
                        <Text style={{color: '#FFFFFF', paddingLeft: 9}}>В корзину</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {size20} from '../../../../../share/consts';
import {LinearGradient} from 'expo-linear-gradient';
import {MontserratSemiBold} from '../../../../../share/fonts';
import {NavigationProps} from '../../../../../share/interfaces';
import shopsStore from "../../../../../stores/ShopsStore";
import {toJS} from 'mobx';
import basketStore from "../../../../../stores/BasketStore";

export class CloudPayment extends Component<NavigationProps> {
    async componentDidMount() {
        setTimeout(async () => {
            const {getAllOrders, allOrders} = shopsStore;
            const {getCartUserInfo} = basketStore;
            await getAllOrders();
            await getCartUserInfo();
            console.log('toJS(allOrders)[0].id----------------------------', toJS(allOrders)[0].id);
        }, 3000)
        setTimeout(async () => {
            const {getAllOrders, allOrders} = shopsStore;
            const {getCartUserInfo} = basketStore;
            await getAllOrders();
            await getCartUserInfo();
            console.log('toJS(allOrders)[0].id----------------------------', toJS(allOrders)[0].id);
            this.props.navigation.navigate('FinishOfferPage', {
                id: toJS(allOrders)[0].id,
                statusText: 'Собирается'
            })
        }, 6000)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    colors={['#A6ED4A', '#8AC83E']}
                >
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            color: '#FFFFFF',
                        }}
                    >
                        Ваш заказ собирается
                    </Text>
                </LinearGradient>
            </View>
        );
    }
}

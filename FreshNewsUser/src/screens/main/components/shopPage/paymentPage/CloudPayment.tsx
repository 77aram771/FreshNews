import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {size20} from '../../../../../share/consts';
import {LinearGradient} from 'expo-linear-gradient';
import {MontserratSemiBold} from '../../../../../share/fonts';
import {NavigationProps} from '../../../../../share/interfaces';
import shopsStore from "../../../../../stores/ShopsStore";
import { toJS } from 'mobx';

export class CloudPayment extends Component<NavigationProps> {

    componentDidMount() {
        const {getAllOrders, allOrders} = shopsStore;
        getAllOrders();
        setTimeout(() => {
            this.props.navigation.navigate('FinishOfferPage', {
                id: toJS(allOrders)[0].id
            })
        }, 3000)
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

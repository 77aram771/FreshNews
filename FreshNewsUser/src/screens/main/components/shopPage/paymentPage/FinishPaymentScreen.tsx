import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {size20} from '../../../../../share/consts';
import {LinearGradient} from 'expo-linear-gradient';
import {MontserratSemiBold} from '../../../../../share/fonts';
import {NavigationProps} from '../../../../../share/interfaces';

export class FinishPaymentScreen extends Component<NavigationProps> {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('PurchaseHistory')
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
                        Ваш заказ оплачен
                    </Text>
                </LinearGradient>
            </View>
        );
    }
}

import React from 'react';
import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {MontserratRegular} from '../../../../../share/fonts';
import {size12, size16, size24, size44} from '../../../../../share/consts';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const PaymentElement = ({
                                   title,
                                   icon,
                                   style,
                                   isSelectedPayment,
                                   onSelectPayment,
                                   paymentKey,
                               }: {
    title?: string;
    icon?: object;
    style?: StyleProp<ViewStyle>;
    isSelectedPayment: string;
    onSelectPayment: (payment: string) => void;
    paymentKey: string;
}) => {
    return (
        <TouchableOpacity
            onPress={() => onSelectPayment(paymentKey)}
            style={[
                {
                    borderRadius: 5,
                },
                style,
            ]}>
            <LinearGradient
                // locations={[0, 1]}
                colors={
                    isSelectedPayment === paymentKey
                        ? ['#A6ED4A', '#8AC83E']
                        : ['#F5F4F4', '#F5F4F4']
                }
                style={{
                    paddingVertical: title ? size16 : size12 / 3,
                    paddingHorizontal: 22,
                    borderRadius: 5,
                }}>
                {!title ? (
                    <FontAwesome5
                        // onPress={onShowBasketPage}
                        name={'apple-pay'}
                        size={size44}
                        color={isSelectedPayment === paymentKey ? '#FFFFFF' : '#000000'}
                    />
                ) : (
                    <Text
                        style={{
                            fontFamily: MontserratRegular,
                            fontSize: size16,
                            color: isSelectedPayment === paymentKey ? '#FFFFFF' : '#000000',
                        }}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

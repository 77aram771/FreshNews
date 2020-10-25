import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {MontserratRegular, MontserratSemiBold} from '../../../share/fonts';
import {size12, size14} from '../../../share/consts';

interface IProps {
    address: string;
    porch: string;
    floor: string;
    apartment: string;
    intercom: string;
}

export const ClientAddress = ({
                                  item,
                                  style,
                              }: {
    item: IProps;
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={style}>
            <Text style={{paddingTop: size12, fontFamily: MontserratRegular}}>
                {item.address}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                    пад
                </Text>
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: size14,
                        paddingLeft: 4,
                        paddingRight: 8,
                    }}>
                    {item.porch}
                </Text>
                <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                    эт
                </Text>
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: size14,
                        paddingLeft: 4,
                        paddingRight: 8,
                    }}>
                    {item.floor}
                </Text>
                <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                    кв
                </Text>
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: size14,
                        paddingLeft: 4,
                        paddingRight: 8,
                    }}>
                    {item.apartment}
                </Text>
                <Text style={{fontFamily: MontserratRegular, fontSize: size14}}>
                    дом
                </Text>
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: size14,
                        paddingLeft: 4,
                        paddingRight: 8,
                    }}>
                    {item.intercom}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

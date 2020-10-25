import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {MontserratRegular} from '../../../share/fonts';
import {size16} from '../../../share/consts';

export const PhoneComponent = ({
                                   phone,
                                   style,
                                   textStyle,
                               }: {
    phone: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}) => {
    return (
        <View style={style}>
            <Text
                style={[
                    {
                        fontFamily: MontserratRegular,
                        paddingTop: size16,
                    },
                    textStyle,
                ]}>
                {phone}
            </Text>
        </View>
    );
};

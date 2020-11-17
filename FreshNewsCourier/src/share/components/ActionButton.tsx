import {
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import {MontserratSemiBold} from '../fonts';
import {WINDOW_WIDTH} from '../consts';

export const ActionButton = ({
                                 onPress,
                                 text,
                                 style,
                                 textStyle,
                                 disabled,
                             }: {
    onPress: () => void;
    text: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    paddingHorizontal: 40,
                    paddingVertical: 16,
                    backgroundColor: '#8CC83F',
                    borderRadius: 10,
                    width: WINDOW_WIDTH / 1.33,
                    alignItems: 'center',
                },
                style,
            ]}>
            <Text
                style={[{color: '#FFFFFF', fontFamily: MontserratSemiBold}, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {size16, size28, WINDOW_WIDTH} from '../../../../share/consts';
import {MontserratRegular, MontserratSemiBold} from "../../../../share/fonts";

export const StocksListItem = ({
                                   style,
                                   keyIndex,
                                   onPressNavigation
                               }: {
    style?: StyleProp<ViewStyle>;
    keyIndex: number;
    onPressNavigation: void
}) => {
    return (
        <TouchableOpacity
            onPress={() => onPressNavigation()}
        >
            <LinearGradient
                colors={['#a6ed4a', '#8AC83E']}
                style={[
                    {
                        width: WINDOW_WIDTH / 1.3,
                        height: 150,
                        borderRadius: 20,
                        justifyContent: 'flex-end',
                    },
                    style,
                ]}>
                <View
                    key={keyIndex}
                    style={{
                        flexDirection: 'column',
                        paddingLeft: 16,
                        paddingBottom: 16,
                    }}>
                    <Text
                        style={{
                            fontSize: size16,
                            color: '#fff',
                            fontFamily: MontserratRegular,
                        }}>
                        ЯНВАРЬ
                    </Text>
                    <Text
                        style={{
                            fontSize: size28,
                            color: '#fff',
                            fontFamily: MontserratSemiBold,
                            lineHeight: 30,
                        }}>
                        -30<Text style={{fontFamily: MontserratRegular, color: '#fff', fontSize: size28,}}>%</Text>
                    </Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: size28,
                            fontFamily: MontserratRegular,
                            lineHeight: 30,
                        }}
                    >
                        НА ВСЕ
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

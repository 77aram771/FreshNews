import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
    size16,
    size20,
    size44,
    WINDOW_WIDTH,
} from '../../../../../share/consts';
import {
    MontserratRegular,
    MontserratSemiBold,
} from '../../../../../share/fonts';
import modalsStore from "../../../../../stores/ModalsStore";
import basketStore from "../../../../../stores/BasketStore";

export const CheckOut = () => {
    const {onShowCheckOutDialog} = modalsStore;
    return (
        <TouchableOpacity activeOpacity={1} onPress={onShowCheckOutDialog} style={styles.container}>
            <View style={styles.secondContainer}>
                <Text style={styles.text}>
                    Вы действительно хотите {'\n'} очистить корзину?
                </Text>
                <View style={styles.noYesTitlesContainer}>
                    <TouchableOpacity
                        onPress={onShowCheckOutDialog}
                        style={styles.noTitleContainer}>
                        <Text style={styles.noTitle}>Нет</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            basketStore.getDeleteCarAllItem()
                            onShowCheckOutDialog();
                        }}
                        style={styles.yesTitleContainer}
                    >
                        <Text style={styles.yesTitle}>Да</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondContainer: {
        backgroundColor: '#FFFFFF',
        width: WINDOW_WIDTH * 0.9,
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: size16,
        fontFamily: MontserratSemiBold,
        paddingTop: 30,
    },
    noYesTitlesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 28,
        paddingBottom: 30,
    },
    noTitleContainer: {
        backgroundColor: '#EAEAEA',
        paddingVertical: size20,
        paddingHorizontal: size44,
        borderRadius: 20,
        marginRight: 16,
    },
    noTitle: {fontFamily: MontserratRegular, fontSize: size20},
    yesTitleContainer: {
        backgroundColor: '#8CC83F',
        paddingVertical: size20,
        paddingHorizontal: size44 + 6,
        borderRadius: 20,
    },
    yesTitle: {
        fontFamily: MontserratRegular,
        fontSize: size20,
        color: '#FFFFFF',
    },
});

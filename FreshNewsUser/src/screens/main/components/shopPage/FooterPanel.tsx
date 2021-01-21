import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {size16, size20, WINDOW_WIDTH} from '../../../../share/consts';
import {MontserratSemiBold} from '../../../../share/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import basketStore from "../../../../stores/BasketStore";

export const FooterPanel = ({onPress}: { onPress: () => void }) => {

    const {allPrice, cartUserInfo} = basketStore;

    return (
        <View style={styles.container}>
            {
                cartUserInfo.length > 0
                    ? (
                        <>
                            <TouchableOpacity onPress={onPress} style={styles.priceContainer}>
                                <FontAwesome5
                                    style={{paddingLeft: 24}}
                                    name={'shopping-cart'}
                                    size={size16}
                                    color={'#FFFFFF'}
                                />
                                <Text style={styles.price}>{Math.ceil(allPrice)} ₽</Text>
                            </TouchableOpacity>
                            <View style={styles.timeContainer}>
                                <Text style={styles.time}>25-30 мин.</Text>
                            </View>
                        </>
                    )
                    : <View/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH / 2,
        bottom: WINDOW_WIDTH / 8,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    priceContainer: {
        backgroundColor: '#8CC83F',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    price: {
        paddingLeft: 10,
        paddingRight: 25,
        paddingVertical: 11,
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        color: '#FFFFFF',
    },
    timeContainer: {
        backgroundColor: '#F5F4F4',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
    time: {
        paddingLeft: 29,
        paddingRight: 25,
        paddingVertical: 11,
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        color: '#000000',
    },
});

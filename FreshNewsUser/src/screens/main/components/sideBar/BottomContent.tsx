import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {size16, size20, size28} from '../../../../share/consts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {imagesPaths} from '../../../../share/info';
import React from 'react';
import {MontserratRegular} from '../../../../share/fonts';
import authStore from "../../../../stores/AuthStore";

export const BottomContent = (
    {
        onPress,
        handleNavigateToCart
    }
        :
        {
            onPress: () => void,
            handleNavigateToCart: () => void
        }) => {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={styles.bottomMenuContainer}
            >
                <FontAwesome
                    name={'user'}
                    size={size20}
                    color={'#BABABA'}
                    style={{paddingLeft: 3}}
                />
                <Text style={styles.bottomMenuTitle}>Мои данные</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomMenuContainer}
                onPress={() => handleNavigateToCart()}
            >
                <FontAwesome5
                    name={'shopping-cart'}
                    size={size16}
                    color={'#BABABA'}
                />
                <Text style={styles.bottomMenuTitle}>Мои заказы</Text>
            </TouchableOpacity>
            <View
                style={styles.bottomMenuContainer}
            >
                <Image
                    resizeMode={'cover'}
                    source={imagesPaths.exitIconImage}
                    style={{width: size20, height: size20}}
                />
                <Text style={styles.bottomMenuTitle}>Выход</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size28,
    },
    bottomMenuTitle: {
        fontSize: size16,
        color: '#000000',
        paddingLeft: 16,
        fontFamily: MontserratRegular,
    },
});

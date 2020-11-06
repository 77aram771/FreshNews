import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {WINDOW_WIDTH} from "../../../share/consts";
// @ts-ignore
import iconWarning from '../../../../assets/iconImages/icon-warning.png'
import {MontserratBold, MontserratRegular, MontserratSemiBold} from "../../../share/fonts";

export const DeliveryOrdersItem = ({id, navigation, status}: { id: number, navigation: any, status: any }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryOrdersScreen', {
                id,
                status
            })}
            style={{
                width: WINDOW_WIDTH - 40,
                height: 45,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 15,
                paddingLeft: 15,
                backgroundColor: '#8CC83F',
                borderRadius: 10,
                marginBottom: 15
            }}
        >
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                {/*{*/}
                {/*    time < 4*/}
                {/*        ? (*/}
                {/*            <Image*/}
                {/*                resizeMode={'cover'}*/}
                {/*                source={iconWarning}*/}
                {/*                style={{width: 23, height: 20, marginRight: 7}}*/}
                {/*            />*/}
                {/*        )*/}
                {/*        : (*/}
                {/*            <View/>*/}
                {/*        )*/}
                {/*}*/}
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '600',
                        fontFamily: MontserratRegular,
                        color: '#fff'
                    }}
                >
                    Заказ {' '}
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: 15,
                            fontWeight: '600'
                        }}
                    >
                        {id}
                    </Text>
                </Text>
            </View>
            {/*<View*/}
            {/*    style={{*/}
            {/*        height: 20,*/}
            {/*        justifyContent: "center",*/}
            {/*        alignItems: "center",*/}
            {/*        backgroundColor: '#fff',*/}
            {/*        borderRadius: 5,*/}
            {/*        paddingLeft: 7,*/}
            {/*        paddingRight: 7*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text*/}
            {/*        style={{*/}
            {/*            fontSize: 15,*/}
            {/*            fontFamily: MontserratBold,*/}
            {/*            color: '#000',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {`${time} мин`}*/}
            {/*    </Text>*/}
            {/*</View>*/}
        </TouchableOpacity>
    )
}

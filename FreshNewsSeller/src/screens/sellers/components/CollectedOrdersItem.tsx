import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {WINDOW_WIDTH} from "../../../share/consts";
import {MontserratBold, MontserratRegular, MontserratSemiBold} from "../../../share/fonts";

export const CollectedOrdersItem = ({name, status}: any) => {
    return (
        <View
            style={{
                width: WINDOW_WIDTH - 40,
                height: 45,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 15,
                paddingLeft: 15,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}
        >
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '600',
                        fontFamily: MontserratRegular,
                        color: '#000'
                    }}
                >
                    {name}
                </Text>
            </View>
            <View
                style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#8cc83f',
                    borderRadius: 5,
                    paddingLeft: 7,
                    paddingRight: 7
                }}
            >
                <Text
                    style={{
                        fontSize: 10,
                        fontFamily: MontserratSemiBold,
                        color: '#fff',
                    }}
                >
                    {
                        status === 4
                            ? 'Курьер спешит к вам'
                            : 'Забрал заказ'
                    }
                </Text>
            </View>
        </View>
    )
}

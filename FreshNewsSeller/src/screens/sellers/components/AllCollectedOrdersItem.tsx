import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {WINDOW_WIDTH} from "../../../share/consts";
import {MontserratRegular, MontserratSemiBold} from "../../../share/fonts";
import iconCheck from "../../../../assets/iconImages/icon-check.png";

export const AllCollectedOrdersItem = ({name}) => {
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
                        color: '#b9b9b9'
                    }}
                >
                    {name}
                </Text>
            </View>
            <View
                style={{
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#8cc83f',
                    borderRadius: 5,
                    paddingLeft: 7,
                    paddingRight: 7
                }}
            >
                <Image
                    resizeMode={'cover'}
                    source={iconCheck}
                    style={{width: 11, height: 8}}
                />
            </View>
        </View>
    )
}

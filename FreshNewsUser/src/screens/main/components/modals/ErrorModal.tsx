import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {size34, WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../../share/consts";
import Feather from "react-native-vector-icons/Feather";
import {MontserratBold, MontserratMedium, MontserratRegular} from "../../../../share/fonts";

export const ErrorModal = ({data, handleCloseErrorModal}: any) => {
    return (
        <View
            style={{
                width: WINDOW_WIDTH / 1.4,
                height: WINDOW_HEIGHT / 3,
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    width: '100%',
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: 'row',
                    marginBottom: 20
                }}
            >
                <TouchableOpacity
                    onPress={() => handleCloseErrorModal()}
                >
                    <Feather
                        name={'x'}
                        size={size34}
                        color={'rgba(112, 112, 112, 0.4)'}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: '#b4b4b4',
                    borderRadius: 10,
                    marginBottom: 20,
                    paddingTop: 15,
                    paddingBottom: 15
                }}
            >
                <View
                    style={{
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "row",
                        width: '100%',
                        marginBottom: 30
                    }}
                >
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 22,
                            fontFamily: MontserratBold
                        }}
                    >
                        Код ошибки {data.status_code}
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "column",
                        width: '100%',
                    }}
                >
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 18,
                            marginBottom: 30,
                            fontFamily: MontserratMedium
                        }}
                    >
                        Сообшения ошибки
                    </Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 18,
                            fontFamily: MontserratRegular
                        }}
                    >
                        {data.message && data.errors.message[0]}
                    </Text>
                </View>
            </View>
        </View>
    )
}

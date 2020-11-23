import React from 'react';
import {size14, WINDOW_WIDTH} from "../../../../share/consts";
import {Text, TouchableOpacity, View} from "react-native";
import {MontserratRegular, MontserratSemiBold} from "../../../../share/fonts";
import {CustomInput} from "../../../../share/components/CustomInput";

export const AddAddressUser = (
    {
        addAddress,
        handleSandAddress,
        porch,
        handleSandPorch,
        level,
        handleSandLevel,
        floor,
        handleSandFloor,
        intercom,
        handleSandIntercom,
        handleAddAddress,
        saveButton}: any) => {
    return (
        <View
            style={{
                width: WINDOW_WIDTH * 0.9,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
            }}
        >
            <View
                style={{
                    backgroundColor: '#dbdbdb',
                    width: WINDOW_WIDTH * 0.9,
                    alignItems: 'center',
                    paddingBottom: 50,
                    paddingTop: 50,
                    borderRadius: 20
                }}
            >
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: 16,
                        color: '#000'
                    }}
                >
                    Добавить новый адрес
                </Text>
                <CustomInput
                    value={addAddress}
                    onChangeText={value => handleSandAddress(value)}
                    textInputStyle={{
                        flex: 1,
                        fontFamily: MontserratRegular,
                        fontSize: size14,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                    }}
                    style={{
                        marginTop: 15,
                        height: 40,
                        marginBottom: 10
                    }}
                    headerStyleWidth={WINDOW_WIDTH - 90}
                    headerStyleText={WINDOW_WIDTH / 1.6}
                />
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: 1,
                        color: '#000',
                        marginBottom: 20
                    }}
                >
                    Пример: <Text style={{
                    fontFamily: MontserratSemiBold,
                    fontSize: 14,
                    color: '#000'
                }}
                >
                    Москва ул. Тверская 11</Text>
                </Text>
                <View
                    style={{
                        width: '90%',
                        flexDirection: "row"
                    }}
                >
                    <View
                        style={{
                            width: '25%',
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text>Подъезд</Text>
                        <CustomInput
                            value={porch}
                            onChangeText={value => handleSandPorch(value)}
                            keyboardType={"number-pad"}
                            textInputStyle={{
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                width: '100%',
                            }}
                            style={{
                                width: '80%',
                                marginTop: 15,
                                height: 40,
                                marginBottom: 10
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 90}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                            maxLength={3}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: '25%',
                        }}
                    >
                        <Text>Этаж</Text>
                        <CustomInput
                            value={level}
                            onChangeText={value => handleSandLevel(value)}
                            keyboardType={"number-pad"}
                            textInputStyle={{
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                width: '100%',
                            }}
                            style={{
                                width: '80%',
                                marginTop: 15,
                                height: 40,
                                marginBottom: 10,
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 90}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                            maxLength={3}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: '25%',
                        }}
                    >
                        <Text>Квартира</Text>
                        <CustomInput
                            value={floor}
                            onChangeText={value => handleSandFloor(value)}
                            textInputStyle={{
                                width: '100%',
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                            }}
                            style={{
                                width: '80%',
                                marginTop: 15,
                                height: 40,
                                marginBottom: 10
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 90}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                            maxLength={3}
                            keyboardType={"number-pad"}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: '25%',
                        }}
                    >
                        <Text>Домофон</Text>
                        <CustomInput
                            value={intercom}
                            onChangeText={value => handleSandIntercom(value)}
                            textInputStyle={{
                                width: '100%',
                                fontFamily: MontserratRegular,
                                fontSize: size14,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                            }}
                            style={{
                                width: '80%',
                                marginTop: 15,
                                height: 40,
                                marginBottom: 10
                            }}
                            headerStyleWidth={WINDOW_WIDTH - 90}
                            headerStyleText={WINDOW_WIDTH / 1.6}
                            maxLength={4}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handleAddAddress()}
                    style={
                        saveButton
                            ? {
                                borderRadius: 10,
                                backgroundColor: '#8CC83F',
                                marginTop: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 25,
                                paddingRight: 25
                            }
                            : {
                                borderRadius: 10,
                                backgroundColor: 'grey',
                                marginTop: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 25,
                                paddingRight: 25
                            }}
                    disabled={!saveButton}
                >
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: 18,
                            color: '#fff'
                        }}
                    >
                        Добавит
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import {size34, WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../share/consts";
import Feather from "react-native-vector-icons/Feather";
import {MontserratMedium, MontserratRegular} from "../../../share/fonts";

export const InfoModal = ({data, handleCloseInfoModal, handleChangeInfoModalToEditModal}: any) => {
    console.log('data', data);
    return (
        <View
            style={{
                width: WINDOW_WIDTH / 1.2,
                height: WINDOW_HEIGHT / 1.3,
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    width: '100%',
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: 'row',
                    marginBottom: 20
                }}
            >
                <TouchableOpacity
                    onPress={() => handleChangeInfoModalToEditModal()}
                >
                    <Feather
                        name={'edit'}
                        size={size34}
                        color={'rgba(112, 112, 112, 0.4)'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleCloseInfoModal()}
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
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: WINDOW_HEIGHT / 3,
                    marginBottom: 10
                }}
            >
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    <Image
                        resizeMode={"center"}
                        source={{uri: data.image}}
                        style={{
                            width: WINDOW_WIDTH / 1.2,
                            height: WINDOW_HEIGHT / 4,
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: MontserratMedium,
                            alignSelf: "center"
                        }}
                    >
                        {data.name}
                    </Text>
                </View>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            minHeight: 35,
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderRightWidth: 1,
                                borderStyle: 'solid',
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Цена
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderStyle: 'solid',
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                {`${data.price} р.`}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            minHeight: 35,
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderRightWidth: 1,
                                borderStyle: 'solid',
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Вес
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderStyle: 'solid',
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                {`${data.weight} г.`}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            minHeight: 35,
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderRightWidth: 1,
                                borderStyle: 'solid',
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                Описания
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                borderBottomWidth: 1,
                                borderColor: '#b6b6b6',
                                borderStyle: 'solid',
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: MontserratRegular,
                                    fontSize: 16
                                }}
                            >
                                {data.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

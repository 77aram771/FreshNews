import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {size34, WINDOW_WIDTH} from "../../../../../share/consts";
import {MontserratRegular, MontserratSemiBold} from "../../../../../share/fonts";
import shopsStore from "../../../../../stores/ShopsStore";
import {toJS} from "mobx";

export const ModalDescription = () => {
    const {getShopInfo} = shopsStore;
    return (
        <View
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 6,
                    paddingBottom: 15,
                    width: WINDOW_WIDTH - 80
                }}
            >
                <TouchableOpacity
                    style={{marginLeft: 'auto', paddingRight: 10, marginBottom: 5}}
                    onPress={() => shopsStore.onShowShopInformationModal()}>
                    <EvilIcons name={'close'} size={size34 * 1.5} color={'#464646'}/>
                </TouchableOpacity>
                <View
                    style={{
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: MontserratSemiBold, fontSize: 20}}>
                            {getShopInfo.name}
                        </Text>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: MontserratSemiBold, fontSize: 16}}>
                            Адрес: {getShopInfo.address}
                        </Text>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: MontserratRegular, fontSize: 14}}>
                            Описания этого магазина
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

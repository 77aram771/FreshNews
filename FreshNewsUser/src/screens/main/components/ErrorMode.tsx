import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../share/consts";
import {MontserratSemiBold} from "../../../share/fonts";
import paymentStore from "../../../stores/PaymentStore";

export default function ErrorMode({errorMassage= 'test test test', errorCode = '500'}) {
    return (
        <TouchableOpacity
            onPress={() => alert('test 12')}
            activeOpacity={1}
            style={{
                width: WINDOW_WIDTH - 140,
                height: WINDOW_HEIGHT / 3,
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: "center",
                alignContent: "center",
                backgroundColor: '#fff',
                borderRadius: 20
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        color: 'red',
                        fontSize: 18,
                        marginBottom: 20
                    }}
                >
                    Код Ошибки {errorCode}
                </Text>

                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        color: '#000',
                        fontSize: 16
                    }}
                >
                    Собшения Ошибки
                    {'   '}
                    <Text>
                        {errorMassage}
                    </Text>
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => paymentStore.closeErrorModal()}
                style={{
                    backgroundColor: 'red',
                    width: '90%',
                    height: 30,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{color: '#fff', fontFamily: MontserratSemiBold, }}>Закрить</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

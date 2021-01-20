import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import {size16, WINDOW_WIDTH} from '../../../../share/consts';
import {MontserratSemiBold} from '../../../../share/fonts';

export const ShopListItem = ({data}: { data: any; }) => {
    return (
        <View
            style={{
                flex: 1,
                margin: 1,
                alignItems: 'center',
                marginHorizontal: 16,
            }}
        >
            <Image
                resizeMode={'contain'}
                style={{width: WINDOW_WIDTH / 3, height: 160}}
                source={{uri: data.image}}
            />
            <View style={{flexDirection: 'column'}}>
                <Text
                    style={{
                        fontFamily: MontserratSemiBold,
                        fontSize: size16,
                        color: '#000000',
                    }}>
                    {data.name}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size16,
                            color: '#000000',
                        }}
                    >
                        {parseInt(data.price.replace(/\s/g, ''))} <Text style={{color: '#8CC83F'}}>₽ за</Text>
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size16,
                            color: '#000000',
                            marginLeft: 8,
                        }}>
                        {data.weight} <Text style={{color: '#8CC83F'}}>кг.</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

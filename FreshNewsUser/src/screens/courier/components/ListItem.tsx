import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    size12,
    size16,
    size20,
    size28,
    size34,
    size36,
    size44,
    WINDOW_WIDTH,
} from '../../../share/consts';
import {
    MontserratBold,
    MontserratRegular,
    MontserratSemiBold,
} from '../../../share/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {ClientAddress} from './ClientAddress';
import {ActionButton} from '../../../share/components/ActionButton';
import {PhoneComponent} from './PhoneComponent';
import {size14} from "../../../share/consts";
import {MontserratMedium} from "../../../share/fonts";

interface IProps {
    shopName: string;
    shopAddress: string;
    phone: string;
    time: string;
    address: string;
    porch: string;
    floor: string;
    apartment: string;
    intercom: string;
    comment: string;
}

const renderItem = (item: any) => {
    return (
        <View
            key={item.id}
            style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: '100%',
                marginBottom: 25,
                borderBottomColor: '#d4cece',
                borderBottomWidth: 1,
                borderStyle: 'solid'
            }}
        >
            <View
                style={{
                    width: '50%',
                }}
            >
                <Text style={{fontFamily: MontserratMedium, fontSize: size14}}>
                    {item.name}
                </Text>
            </View>
            <View
                style={{
                    width: '25%',
                    alignItems: "flex-end",
                    justifyContent: 'center'
                }}
            >
                <Text style={{fontFamily: MontserratBold, fontSize: size14}}>
                    {item.weight} <Text style={{color: '#8CC83F'}}>г</Text>
                </Text>
            </View>
            <View
                style={{
                    width: '25%',
                    alignItems: "flex-end",
                    justifyContent: 'center'
                }}
            >
                <Text style={{fontFamily: MontserratSemiBold, fontSize: size14}}>
                    {Math.ceil(item.price)} <Text style={{color: '#8CC83F'}}>₽</Text>
                </Text>
            </View>
            {/*<TouchableOpacity*/}
            {/*    onPress={() => this.handleDeleteItem(item.id)}*/}
            {/*    style={{*/}
            {/*        marginTop: 20,*/}
            {/*        marginBottom: 20*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text*/}
            {/*        style={{*/}
            {/*            fontFamily: MontserratRegular,*/}
            {/*            fontSize: size14,*/}
            {/*            color: '#8E8E8E',*/}
            {/*            textDecorationLine: 'underline',*/}
            {/*            paddingTop: 8,*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Удалить*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}

export const ListItem = ({
                             item,
                             onPress,
                         }: {
    item: IProps;
    onPress: () => void;
    takeOrderType?: boolean;
}) => {
    return (
        <View
            style={{
                marginBottom: size44,
                paddingHorizontal: size16,
                paddingTop: size28,
            }}
        >
            <Text style={{fontSize: size20}}>
                <Text style={{fontFamily: MontserratRegular}}>Из</Text>{' '}
                <Text style={{fontFamily: MontserratBold, color: '#8CC83F'}}>
                    {item.shops[0].name}
                </Text>
            </Text>
            <Text style={{fontFamily: MontserratRegular, paddingTop: size12}}>
                {`Г.${item.shops[0].city}, ${item.shops[0].address}`}
            </Text>
            <Text
                onPress={() => alert('карта')}
                style={{
                    fontFamily: MontserratRegular,
                    paddingTop: size12,
                    textDecorationLine: 'underline',
                }}
            >
                Показать на карте
            </Text>
            {/*<PhoneComponent phone={item.phone}/>*/}
            <View
                style={{
                    height: 1,
                    backgroundColor: 'rgba(112, 112, 112, .2)',
                    marginVertical: size20,
                }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                    style={{
                        color: '#8CC83F',
                        fontFamily: MontserratBold,
                        fontSize: size20,
                    }}
                >
                    Клиенту
                </Text>
                <Text
                    style={{
                        color: '#000000',
                        fontFamily: MontserratRegular,
                        fontSize: size20,
                        marginLeft: 9,
                    }}
                >
                    за
                </Text>
                <Text
                    style={{
                        color: item.time >= 10 ? '#000000' : 'red',
                        fontFamily: MontserratBold,
                        fontSize: size20,
                        marginLeft: 9,
                    }}
                >
                    4
                </Text>
                <Text
                    style={{
                        color: item.time >= 10 ? '#000000' : 'red',
                        fontFamily: MontserratBold,
                        fontSize: size20,
                        marginLeft: 9,
                    }}
                >
                    мин
                </Text>
                {item.time <= 10 ? (
                    <Entypo
                        name={'warning'}
                        size={size20}
                        color={'red'}
                        style={{paddingLeft: 9}}
                    />
                ) : null}
            </View>
            <ClientAddress item={item.client}/>
            <Text
                onPress={() => alert('карта')}
                style={{
                    fontFamily: MontserratRegular,
                    paddingTop: size12,
                    textDecorationLine: 'underline',
                }}
            >
                Показать на карте
            </Text>
            <PhoneComponent phone={item.client.phone}/>
            <Text
                style={{
                    fontFamily: MontserratSemiBold,
                    fontSize: size16,
                    paddingTop: size28,
                }}
            >
                Комментарий
            </Text>
            <Text
                style={{
                    fontSize: size12,
                    fontFamily: MontserratRegular,
                    paddingTop: size16,
                }}
            >
                {item.comment}
            </Text>

            {
                item.products.map(item => {
                    return renderItem(item)
                })
            }

            <ActionButton
                style={{marginTop: 24, width: WINDOW_WIDTH * 0.9}}
                onPress={onPress}
                text={'Заказ доставлен'}
                textStyle={{fontSize: size12}}
            />
            <ActionButton
                style={{
                    paddingVertical: 16,
                    backgroundColor: '#F5F4F4',
                    borderRadius: 10,
                    width: WINDOW_WIDTH * 0.9,
                    alignItems: 'center',
                    marginTop: size16,
                }}
                onPress={() => alert('Связаться с менеджером')}
                text={'Связаться с менеджером'}
                textStyle={{
                    color: '#000000',
                    fontFamily: MontserratSemiBold,
                    fontSize: size12,
                }}
            />
        </View>
    );
};

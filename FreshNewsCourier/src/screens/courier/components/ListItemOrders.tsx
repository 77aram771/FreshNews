import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
import {showLocation} from "react-native-map-link";

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
    onPress: any;
}

export const ListItemOrders = ({item, onPress, bool}: { item: IProps, onPress: any, bool: boolean }) => {
    const openMapUser = (address: any) => {
        showLocation({
            latitude: 38.8976763,
            longitude: -77.0387185,
            // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
            // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
            title: address.address,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    };

    const openMapShop = (address: any) => {
        showLocation({
            latitude: 38.8976763,
            longitude: -77.0387185,
            // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
            // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
            title: address,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    };

    return (
        <View
            style={{
                paddingHorizontal: size16,
                paddingTop: size28,
                borderBottomWidth: 2,
                borderColor: '#b4b4b4',
                marginBottom: 10,
                paddingBottom: 35
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
                onPress={() => openMapShop(`${item.shops[0].city}, ${item.shops[0].address}`)}
                style={{
                    fontFamily: MontserratRegular,
                    paddingTop: size12,
                    textDecorationLine: 'underline',
                }}
            >
                Показать на карте
            </Text>
            <View
                style={{
                    height: 1,
                    backgroundColor: 'rgba(112, 112, 112, .2)',
                    marginVertical: size20,
                }}
            />
            <View
                style={{flexDirection: 'row', alignItems: 'center'}}
            >
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
                    {item.delivery_time}
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
                onPress={() => openMapUser(item.client.address)}
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
                bool
                    ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: size34,
                                justifyContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => onPress(item.id)}
                                style={{
                                    paddingVertical: size16,
                                    backgroundColor: '#8CC83F',
                                    borderRadius: 10,
                                    flex: 1,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontFamily: MontserratRegular,
                                        fontSize: size12,
                                        paddingHorizontal: size36,
                                    }}
                                >
                                    Взять заказ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    alert('На данный момент невозможно отказ от заказа')
                                }}
                                style={{
                                    paddingVertical: size16,
                                    backgroundColor: '#AAA8A8',
                                    borderRadius: 10,
                                    marginLeft: size16,
                                    flex: 1,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontFamily: MontserratRegular,
                                        fontSize: size12,
                                        paddingHorizontal: size44,
                                    }}
                                >
                                    Отказаться
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
            }
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

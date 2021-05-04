import React, {useState, useEffect, useRef} from 'react';
import {View, Platform, Button, Text} from 'react-native';
import {GOOGLE_MAPS_APIKEY} from '../../share/consts';
import MainHeader from '../../share/components/MainHeader';
import basketStore from '../../stores/BasketStore';
import userInfo from '../../stores/UserInfo';
import shopsStore from '../../stores/ShopsStore';
import paymentStore from "../../stores/PaymentStore";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Geocoder from 'react-native-geocoding';
import ShopMarket from './components/shops/ShopMarket';
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from 'expo-location';
import {toJS} from "mobx";
import Pusher from 'pusher-js/react-native';
import {pusher_app_cluster, pusher_app_key} from "../../share/pusherConfig";

// @ts-ignore
Geocoder.init(GOOGLE_MAPS_APIKEY, {language: "ru"});

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
Notifications.requestPermissionsAsync({
    ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
    },
});

Pusher.logToConsole = true

const pusher = new Pusher(pusher_app_key, {
    cluster: pusher_app_cluster,
    forceTLS: true,
})

export const MainScreen = ({navigation}: any) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notifications, setNotifications] = useState(false);
    const [notificationMessages, setNotificationMessages] = React.useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        (async () => {
            let getToken = await AsyncStorage.getItem('Token');
            if (getToken !== null) {
                await shopsStore.getAllOrders();
                await basketStore.getCartUserInfo()
                await userInfo.getUserData();
                await paymentStore.orderUserTime();
                await userInfo.getUserNotifications();
                setTimeout(() => {
                    console.log('userData', toJS(userInfo.userData.id))
                    const channel = pusher.subscribe(`notifications.${userInfo.userData.id}`);
                    channel.bind('App\\Events\\OrderNotificationEvent', (data: any) => {
                        setNotificationMessages(JSON.parse(data.notification.data))
                        setTimeout(() => {
                            return sendPushNotification(expoPushToken);
                        }, 1000)
                    });
                }, 1000)
            }
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                alert(errorMessage)
            }
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
            const {latitude, longitude} = location.coords;
            // @ts-ignore
            Geocoder.from(latitude, longitude)
                .then((json: any) => {
                    let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`;
                    // console.log(`${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`);
                    shopsStore.getAddressUser(addressComponent);
                })
                .catch((error: any) => console.warn(error));
            // @ts-ignore
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
            // @ts-ignore
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                // @ts-ignore
                setNotifications(notification);
                console.log(notifications)
            });
            // @ts-ignore
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                // userInfo.getUserNotificationsRead();
                // @ts-ignore
                console.log('response', response);
                navigation.navigate('FinishOfferPage', {
                    id: response.notification.request.content.data.body.id,
                })
            });
            return () => {
                // @ts-ignore
                Notifications.removeNotificationSubscription(notificationListener);
                // @ts-ignore
                Notifications.removeNotificationSubscription(responseListener);
            };
        })()
    }, []);

    async function sendPushNotification(expoPushToken: any) {
        console.log('notificationMessages.message', notificationMessages.message)
        console.log('notificationMessages.order_id', notificationMessages.order_id)
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: expoPushToken,
                sound: 'default',
                title: notificationMessages.message,
                data: {id: notificationMessages.order_id},
            }),
        })
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                // alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            // alert('Must use physical device for Push Notifications');
        }
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }

    const getGeocodeAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied')
            alert(errorMessage)
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        const {latitude, longitude} = location.coords;
        // @ts-ignore
        Geocoder.from(latitude, longitude)
            .then((json: any) => {
                let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`;
                shopsStore.getAddressUser(addressComponent);
                shopsStore.getUserAddress(addressComponent);
            })
            .catch((error: any) => console.warn(error));
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? 0 : 20
            }}
        >
            <MainHeader navigation={navigation}/>
            {/*<View*/}
            {/*    style={{*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'center',*/}
            {/*        height: 60,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text>Your expo push token: {expoPushToken}</Text>*/}
            {/*    <Button*/}
            {/*        title="Press to Send Notification"*/}
            {/*        onPress={async () => {*/}
            {/*            await sendPushNotification(expoPushToken);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}
            <ShopMarket
                sendPushNotification={sendPushNotification}
                navigation={navigation}
                getGeocodeAsync={() => getGeocodeAsync()}
            />

        </View>
    );
}

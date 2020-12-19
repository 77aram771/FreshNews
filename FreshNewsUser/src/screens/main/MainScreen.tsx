import React, {useState, useEffect, useRef} from 'react';
import {View, Platform} from 'react-native';
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

export const MainScreen = ({navigation}: any) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        (async () => {
            let getToken = await AsyncStorage.getItem('Token');
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
            console.log('Location', Location);
            const {latitude, longitude} = location.coords;
            Geocoder.from(latitude, longitude)
                .then((json: any) => {
                    let addressComponent = json.results[5].formatted_address;
                    // console.log('json', addressComponent);
                    shopsStore.getAddressUser(addressComponent);
                })
                .catch((error: any) => console.warn(error));
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                userInfo.getUserNotificationsRead();
                navigation.navigate('FinishOfferPage', {
                    id: response.notification.request.content.data.body.id,
                })
            });
            if (getToken !== null) {
                await shopsStore.getAllOrders();
                await basketStore.getCartUserInfo()
                await userInfo.getUserData();
                await paymentStore.orderUserTime();
                await userInfo.getUserNotifications();
                await sendPushNotification(expoPushToken);
            }
            return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
            };
        })()
    }, []);

    async function sendPushNotification(expoPushToken: any) {
        let getToken = await AsyncStorage.getItem('Token');
        if (getToken !== null) {
            await userInfo.getUserNotifications();
        }
        if (toJS(userInfo.notificationsData) !== null) {
            let lastNotification = toJS(userInfo.notificationsData[userInfo.notificationsData.length - 1]);
            setTimeout(async () => {
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
                        title: lastNotification.data.message,
                        data: {id: lastNotification.id},

                    }),
                })
            }, 3000);
        }
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
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
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
            setErrorMessage('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        const {latitude, longitude} = location.coords;
        Geocoder.from(latitude, longitude)
            .then((json: any) => {
                let addressComponent = json.results[5].formatted_address;
                // console.log('json', addressComponent);
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
            <MainHeader
                navigation={navigation}
            />
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

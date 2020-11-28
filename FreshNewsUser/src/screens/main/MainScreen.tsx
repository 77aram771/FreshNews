import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import {GOOGLE_MAPS_APIKEY, HEADER_HEIGHT} from '../../share/consts';
import MainHeader from '../../share/components/MainHeader';
import basketStore from '../../stores/BasketStore';
import userInfo from '../../stores/UserInfo';
import shopsStore from '../../stores/ShopsStore';
import paymentStore from "../../stores/PaymentStore";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Geocoder from 'react-native-geocoding';
import ShopMarket from './components/shops/ShopMarket';
import AsyncStorage from "@react-native-community/async-storage";
import modalsStore from "../../stores/ModalsStore";
import CourierInformation from './components/sideBar/CourierInformation';
import LegalEntities from "./components/sideBar/LegalEntities";
import Delivery from "./components/sideBar/Delivery";
import QuestionsAndAnswers from "./components/sideBar/QuestionsAndAnswers";
import Feedback from "./components/sideBar/Feedback";
import TermsOfUse from './components/sideBar/TermsOfUse';
import Modal from 'react-native-modal';
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

export const MainScreen = ({navigation}) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [location, setLocation] = useState('');
    const [geocode, setGeocode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        getLocationAsync();
        (async () => {
            let getToken = await AsyncStorage.getItem('Token');

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
                basketStore.getCartUserInfo()
                userInfo.getUserData();
                paymentStore.orderUserTime();
                shopsStore.getAllOrders();
                userInfo.getUserNotifications();
                await sendPushNotification(expoPushToken);
            }
            return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
            };
        })()
    }, []);

    async function sendPushNotification(expoPushToken) {
        let getToken = await AsyncStorage.getItem('Token');
        if (getToken !== null) {
            userInfo.getUserNotifications();
        }
        if(toJS(userInfo.notificationsData) !== null){
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
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        const {latitude, longitude} = location.coords;
        setLocation({latitude, longitude})
    };

    const getGeocodeAsync = async () => {
        Geocoder.from(location.latitude, location.longitude)
            .then((json: any) => {
                let addressComponent = json.results[5].formatted_address;
                // console.log('json', addressComponent);
                shopsStore.getUserAddress(addressComponent);
            })
            .catch((error: any) => console.warn(error));
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        >
            <View style={{height: HEADER_HEIGHT}}/>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowCourierInformation}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowCourierInformation}
                style={{margin: 0}}
                isVisible={modalsStore.isShowCourierInformation}
            >
                <CourierInformation/>
            </Modal>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowLegalEntities}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowLegalEntities}
                style={{margin: 0}}
                isVisible={modalsStore.isShowLegalEntities}
            >
                <LegalEntities/>
            </Modal>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowDelivery}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowDelivery}
                style={{margin: 0}}
                isVisible={modalsStore.isShowDelivery}
            >
                <Delivery/>
            </Modal>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowQuestionsAndAnswers}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowQuestionsAndAnswers}
                style={{margin: 0}}
                isVisible={modalsStore.isShowQuestionsAndAnswers}
            >
                <QuestionsAndAnswers/>
            </Modal>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowFeedback}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowFeedback}
                style={{margin: 0}}
                isVisible={modalsStore.isShowFeedback}
            >
                <Feedback/>
            </Modal>
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                onBackButtonPress={modalsStore.onShowTermsOfUse}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0}
                onBackdropPress={modalsStore.onShowTermsOfUse}
                style={{margin: 0}}
                isVisible={modalsStore.isShowTermsOfUse}
            >
                <TermsOfUse/>
            </Modal>
            <MainHeader
                navigation={navigation}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to Send Notification"
                    onPress={async () => {
                        await sendPushNotification(expoPushToken);
                    }}
                />
            </View>
            <ShopMarket
                sendPushNotification={sendPushNotification}
                navigation={navigation}
                getGeocodeAsync={() => getGeocodeAsync()}
            />
        </View>
    );
}

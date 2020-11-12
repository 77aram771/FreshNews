import React from 'react';
import {View} from 'react-native';
import {NavigationProps} from '../../share/interfaces';
import {observer} from 'mobx-react';
import {GOOGLE_MAPS_APIKEY, HEADER_HEIGHT} from '../../share/consts';
import MainHeader from '../../share/components/MainHeader';
import basketStore from '../../stores/BasketStore';
import userInfo from '../../stores/UserInfo';
import shopsStore from '../../stores/ShopsStore';
import paymentStore from "../../stores/PaymentStore";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import ShopMarket from './components/shops/ShopMarket';
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import modalsStore from "../../stores/ModalsStore";
import CourierInformation from './components/sideBar/CourierInformation';
import LegalEntities from "./components/sideBar/LegalEntities";
import Delivery from "./components/sideBar/Delivery";
import QuestionsAndAnswers from "./components/sideBar/QuestionsAndAnswers";
import Feedback from "./components/sideBar/Feedback";
import TermsOfUse from './components/sideBar/TermsOfUse';

Geocoder.init(GOOGLE_MAPS_APIKEY, {language: "ru"});

@observer
export default class MainScreen extends React.Component<NavigationProps> {

    state = {
        location: null,
        geocode: null,
        errorMessage: ""
    };

    async componentDidMount() {
        let getToken = await AsyncStorage.getItem('Token')
        if (getToken !== null) {
            basketStore.getCartUserInfo()
            userInfo.getUserData();
            paymentStore.orderUserTime();
            shopsStore.getAllOrders();
            this.getLocationAsync();
        }
    };

    getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        const {latitude, longitude} = location.coords;
        this.setState({
            location: {latitude, longitude}
        })
    };

    getGeocodeAsync = async () => {
        Geocoder.from(this.state.location.latitude, this.state.location.longitude)
            .then((json: any) => {
                let addressComponent = json.results[5].formatted_address;
                console.log('json', addressComponent);
                shopsStore.getUserAddress(addressComponent);
            })
            .catch((error: any) => console.warn(error));
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        height: HEADER_HEIGHT
                    }}
                />
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
                    navigation={this.props.navigation}
                />
                <ShopMarket navigation={this.props.navigation} getGeocodeAsync={() => this.getGeocodeAsync()}/>
            </View>
        );
    };
}

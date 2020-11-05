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

Geocoder.init(GOOGLE_MAPS_APIKEY, {language : "ru"});

@observer
export default class MainScreen extends React.Component<NavigationProps> {

    state = {
        location: null,
        geocode: null,
        errorMessage: ""
    };

   async componentDidMount() {
        let getToken = await AsyncStorage.getItem('Token')
        if(getToken !== null) {
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
                <MainHeader
                    navigation={this.props.navigation}
                />
                <ShopMarket navigation={this.props.navigation} getGeocodeAsync={() => this.getGeocodeAsync()}/>
            </View>
        );
    }
}

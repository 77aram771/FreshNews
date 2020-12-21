import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {observer} from 'mobx-react';
import {
    GOOGLE_MAPS_APIKEY,
    HEADER_HEIGHT,
    size16,
    size20,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../../share/consts';
import MapView, {Marker} from 'react-native-maps';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import Modal from 'react-native-modal';
import ReviewModal from './ReviewModal';
import modalsStore from "../../../../../stores/ModalsStore";
import MapViewDirections from 'react-native-maps-directions';
import Header from "../../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {LogoAndTitle} from "../../../../../share/components/LogoAndTitle";
import {PulseIndicator} from 'react-native-indicators';
import * as Location from 'expo-location';
import Pusher from 'pusher-js/react-native';
import {MapStyle} from "../../../../../share/MapStyle";

const LOCATION_TASK_NAME = 'background-location-task';
const pusher_app_key = '0f88b1991b1342108a18';
const pusher_app_cluster = 'eu';

@observer
export default class MapPage extends Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            courierCordinate: null,
            userLocation: null,
            errorText: '',
            deliveryTime: ''
        };
        this.mapView = null;
    };

    async componentDidMount() {
        Pusher.logToConsole = true;
        this.pusher = new Pusher(pusher_app_key, {
            cluster: pusher_app_cluster,
            encrypted: true,
        });
        // let {status} = await Location.requestPermissionsAsync();
        // if (status !== 'granted') {
        //     this.setState({
        //         errorText: 'Permission to access location was denied'
        //     })
        //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //         accuracy: Location.Accuracy.Balanced,
        //     });
        // }
        // let location = await Location.getCurrentPositionAsync({});
        // const userCoordinate = {
        //     longitude: location.coords.longitude,
        //     latitude: location.coords.latitude,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        // }
        // this.setState({
        //     userLocation: userCoordinate
        // });
        this.users_channel = this.pusher.subscribe(`courier-location.${this.props.navigation.state.params.order_id}`);
        this.users_channel.bind('App\\Events\\SendCourierLocationToOrderEvent', (data: any) => {
            this.getGeolocation(data)
        });
    };

    async getGeolocation(data: any) {
        const courierCordinate = {
            latitude: Number(data.courier.lat),
            longitude: Number(data.courier.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        const userCoordinate = {
            latitude: Number(data.last_point.lat),
            longitude: Number(data.last_point.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        setTimeout(() => {
            this.setState({
                courierCordinate: courierCordinate,
                userLocation: userCoordinate
            });
        }, 1000)
    };

    onReady = (result: any) => {
        console.log(`Distance: ${result.distance} km`)
        console.log(`Duration: ${result.duration} min.`)
        console.log(`result: ${result}`)
        this.setState({
            deliveryTime: Math.ceil(result.duration)
        })
        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (WINDOW_WIDTH / 20),
                bottom: (WINDOW_HEIGHT / 20),
                left: (WINDOW_WIDTH / 20),
                top: (WINDOW_HEIGHT / 20),
            },
        });
    }

    onError = (errorMessage: any) => {
        console.log(errorMessage);
    }

    render() {
        const {onShowReviewModal, isShowReviewModal} = modalsStore;
        return (
            <View style={styles.container}>
                <View style={{height: HEADER_HEIGHT}}/>
                <Modal
                    backdropTransitionOutTiming={0}
                    animationIn={'slideInDown'}
                    animationOut={'slideOutUp'}
                    animationInTiming={800}
                    animationOutTiming={400}
                    onBackButtonPress={() => {
                        onShowReviewModal()
                    }}
                    hideModalContentWhileAnimating={true}
                    backdropOpacity={0}
                    onBackdropPress={onShowReviewModal}
                    style={{margin: 0}}
                    isVisible={isShowReviewModal}
                >
                    <ReviewModal/>
                </Modal>
                <Header
                    headerLeft={
                        <AntDesign
                            style={{paddingLeft: 8}}
                            onPress={() => this.props.navigation.goBack()}
                            name={'left'}
                            size={18}
                            color={'#464646'}
                        />
                    }
                    headerMid={<LogoAndTitle/>}
                    headerRight={<View/>}
                />
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#F5F4F4',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            width: WINDOW_WIDTH - 40,
                            flexDirection: 'row'

                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#000'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#000'
                                    }}
                                >
                                    {this.props.navigation.state.params.order_id}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    this.state.courierCordinate !== null
                        ? (
                            <>
                                <MapView
                                    // region={this.state.userLocation}
                                    style={{flex: 2, width: WINDOW_WIDTH}}
                                    ref={c => this.mapView = c}
                                    followUserLocation={true}
                                    zoomEnabled={true}
                                    pitchEnabled={true}
                                    showsCompass={true}
                                    showsBuildings={true}
                                    showsTraffic={true}
                                    showsIndoors={true}
                                    customMapStyle={MapStyle}
                                    provider={MapView.PROVIDER_GOOGLE}
                                    // minZoomLevel={9}  // default => 0
                                    maxZoomLevel={17} // default => 20
                                >
                                    <Marker
                                        coordinate={this.state.userLocation}
                                        // style={{
                                        //     width: 20,
                                        //     height: 20
                                        // }}
                                        image={require('../../../../../../assets/iconImages/location-user-icon.psd')}
                                    />
                                    <Marker
                                        coordinate={this.state.courierCordinate}
                                        // style={{
                                        //     width: 20,
                                        //     height: 20
                                        // }}
                                        image={require('../../../../../../assets/iconImages/mapIcon.jpg')}
                                    />
                                    <MapViewDirections
                                        origin={this.state.userLocation}
                                        destination={this.state.courierCordinate}
                                        // mode='DRIVING'
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        language='ru'
                                        strokeWidth={4}
                                        strokeColor='#8CC83F'
                                        optimizeWaypoints={true}
                                        onStart={(params) => {
                                            console.log('params', params)
                                        }}
                                        onReady={this.onReady}
                                        onError={(errorMessage) => this.onError(errorMessage)}
                                        resetOnChange={false}
                                    />
                                </MapView>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={onShowReviewModal}
                                    style={styles.textContainer}
                                >
                                    <Text style={styles.courierText}>
                                        Курьер{' '}
                                        <Text style={{fontFamily: MontserratSemiBold, color: '#8CC83F'}}>
                                            Василий
                                        </Text>{' '}
                                        будет{'\n'} у вас в течении{' '}
                                        <Text style={{fontFamily: MontserratSemiBold}}>{this.state.deliveryTime} мин.</Text>
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => alert('связь с поддержкой')}
                                        style={styles.supportTextContainer}>
                                        <Text style={{fontFamily: MontserratRegular, fontSize: size16}}>
                                            Связаться с поддержкой
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </>
                        )
                        : (
                            <>
                                {/*<MapView*/}
                                {/*    region={this.state.userLocation}*/}
                                {/*    style={{flex: 2, width: WINDOW_WIDTH}}*/}
                                {/*    ref={c => this.mapView = c}*/}
                                {/*    showsUserLocation={true}*/}
                                {/*    followUserLocation={true}*/}
                                {/*    zoomEnabled={true}*/}
                                {/*    // minZoomLevel={2}  // default => 0*/}
                                {/*    // maxZoomLevel={15} // default => 20*/}
                                {/*    pitchEnabled={true}*/}
                                {/*    showsCompass={true}*/}
                                {/*    showsBuildings={true}*/}
                                {/*    showsTraffic={true}*/}
                                {/*    showsIndoors={true}*/}
                                {/*    customMapStyle={MapStyle}*/}
                                {/*    provider={MapView.PROVIDER_GOOGLE}*/}
                                {/*/>*/}
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <PulseIndicator
                                        size={100}
                                        color='#8CC83F'
                                    />
                                    <Text style={{fontFamily: MontserratSemiBold, fontSize: 16}}> Поиск курера </Text>
                                </View>
                                <View
                                    style={styles.textContainer}
                                >
                                    <TouchableOpacity
                                        onPress={() => alert('связь с поддержкой')}
                                        style={styles.supportTextContainer}>
                                        <Text style={{fontFamily: MontserratRegular, fontSize: size16}}>
                                            Связаться с поддержкой
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'},
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * 0.3,
    },
    courierText: {
        fontSize: size20,
        textAlign: 'center',
        fontFamily: MontserratRegular,
    },
    supportTextContainer: {
        paddingVertical: 13,
        backgroundColor: '#F5F4F4',
        width: WINDOW_WIDTH * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 15,
    },
});

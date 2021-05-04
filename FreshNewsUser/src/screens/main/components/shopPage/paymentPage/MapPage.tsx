import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {observer} from 'mobx-react';
import {GOOGLE_MAPS_APIKEY, HEADER_HEIGHT, size16, size20, WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../../share/consts';
import MapView, {Marker} from 'react-native-maps';
import {MontserratBold, MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import {ReviewModal} from './ReviewModal';
import modalsStore from "../../../../../stores/ModalsStore";
import MapViewDirections from 'react-native-maps-directions';
import Header from "../../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {LogoAndTitle} from "../../../../../share/components/LogoAndTitle";
import {PulseIndicator} from 'react-native-indicators';
import Pusher from 'pusher-js/react-native';
import {MapStyle} from "../../../../../share/MapStyle";
// @ts-ignore
import call from 'react-native-phone-call'
import shopsStore from "../../../../../stores/ShopsStore";
import Modal from 'react-native-modal';
import Modals, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {ErrorModal} from "../../modals/ErrorModal";
import {pusher_app_key, pusher_app_cluster} from "../../../../../share/pusherConfig";

const args = {
    number: '+79296014443', // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
}

@observer
export default class MapPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            // courierCordinate: null,
            // userLocation: null,
            courierCordinate: {
                latitude: 41.43206,
                longitude: -81.38992,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            userLocation: {
                latitude: 41.43206,
                longitude: -82.38992,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            errorText: '',
            deliveryTime: '',
            reviewText: '',
            reviewTextInput: false,
            customStarCount: 0,
            errorModal: false,
            errorData: [],
        };
        // @ts-ignore
        this.pusher = null;
        // @ts-ignore
        this.mapView = null;
        this.handleReview = this.handleReview.bind(this)
        this.handleReviewText = this.handleReviewText.bind(this)
        this.onCustomStarRatingPress = this.onCustomStarRatingPress.bind(this)
    };

    async componentDidMount() {
        Pusher.logToConsole = true;
        // @ts-ignore
        this.pusher = new Pusher(pusher_app_key, {
            cluster: pusher_app_cluster,
            encrypted: true,
        });
        // @ts-ignore
        this.users_channel = this.pusher.subscribe(`courier-location.${this.props.navigation.state.params.order_id}`);
        // @ts-ignore
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
        // @ts-ignore
        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (WINDOW_WIDTH / 20),
                bottom: (WINDOW_HEIGHT / 20),
                left: (WINDOW_WIDTH / 20),
                top: (WINDOW_HEIGHT / 20),
            },
        });
    };

    onError = (errorMessage: any) => {
        console.log(errorMessage)
    };

    onCustomStarRatingPress(rating: any) {
        console.log('rating', rating)
        this.setState({
            customStarCount: rating,
        });
    };

    handleReviewText(value: any) {
        this.setState({
            reviewText: value
        })
    };

    async handleReview() {
        await shopsStore.postReview(
            this.props.navigation.state.params.order_id,
            this.props.navigation.state.params.shop_id,
            this.state.customStarCount,
            this.state.reviewText
        );
        setTimeout(() => {
            modalsStore.onShowReviewModal()
        }, 1000)
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };


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
                    <ReviewModal
                        name={this.props.navigation.state.params.shop_name}
                        handleReviewText={this.handleReviewText}
                        handleReview={this.handleReview}
                        onCustomStarRatingPress={this.onCustomStarRatingPress}
                        customStarCount={this.state.customStarCount}
                    />
                </Modal>
                <Modals
                    visible={this.state.errorModal}
                    useNativeDriver={false}
                    footer={
                        <ModalFooter
                            style={{
                                backgroundColor: 'red'
                            }}
                        >
                            <ModalButton
                                text="Закрыть"
                                textStyle={{
                                    color: '#fff'
                                }}
                                onPress={() => this.handleCloseErrorModal()}
                            />
                        </ModalFooter>
                    }
                    onTouchOutside={() => {
                        this.setState({errorModal: false});
                    }}
                >
                    <ModalContent>
                        <ErrorModal
                            data={this.state.errorData}
                            handleCloseErrorModal={this.handleCloseErrorModal}
                        />
                    </ModalContent>
                </Modals>
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
                                    >
                                        <Image
                                            source={require('../../../../../../assets/iconImages/location-user-icon.psd')}
                                            style={{width: 30, height: 30}}
                                            resizeMode="contain"
                                        />
                                    </Marker>
                                    <Marker
                                        coordinate={this.state.courierCordinate}
                                        image={require('../../../../../../assets/iconImages/local_icon.png')}
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
                                        onPress={() => call(args).catch(console.error)}
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
                                <View style={styles.textContainer}>
                                    <TouchableOpacity
                                        onPress={() => call(args).catch(console.error)}
                                        style={styles.supportTextContainer}
                                    >
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

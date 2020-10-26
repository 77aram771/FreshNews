import React, {Component} from 'react';
import {
    BackHandler,
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
    size44,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../../share/consts';
import MapView, {Marker} from 'react-native-maps';
import {
    MontserratRegular,
    MontserratSemiBold,
} from '../../../../../share/fonts';
import Modal from 'react-native-modal';
import ReviewModal from './ReviewModal';
import {NavigationProps} from '../../../../../share/interfaces';
import locationStore from "../../../../../stores/LocationStore";
import modalsStore from "../../../../../stores/ModalsStore";
import MapViewDirections from 'react-native-maps-directions';
import Header from "../../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {LogoAndTitle} from "../../../../../share/components/LogoAndTitle";
import {PulseIndicator} from 'react-native-indicators';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
const LOCATION_TASK_NAME = 'background-location-task';

@observer
export default class MapPage extends Component<NavigationProps> {

    backHandler: any;

    constructor(props: any) {
        super(props);

        this.state = {
            coordinates: null,
            errorText: ''
        };

        this.mapView = null;
    }

    componentDidMount() {

        this.getCurrentPosition();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackPress,
        );
        (
            async () => {
                // const { status } = await Location.requestPermissionsAsync();
                // if (status === 'granted') {
                //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                //         accuracy: Location.Accuracy.Balanced,
                //     });
                // }
                let {status} = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    this.setState({
                        errorText: 'Permission to access location was denied'
                    })
                    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                        accuracy: Location.Accuracy.Balanced,
                    });
                }
                let location = await Location.getCurrentPositionAsync({});
                const userCoordinate = {
                        lat: location.coords.latitude,
                        lon: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                ;

                const courierCordinate = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude - 0.100,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                ;

                this.setState({
                    coordinates: [courierCordinate, userCoordinate]
                }, () => console.log('coordinates', this.state.coordinates[0]));

            })();
    }

    async getCurrentPosition() {
        await locationStore.getPermissionAndLocation();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
    };

    onReady = (result: any) => {
        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (WINDOW_WIDTH / 10),
                bottom: (WINDOW_HEIGHT / 10),
                left: (WINDOW_WIDTH / 10),
                top: (WINDOW_HEIGHT / 10),
            },
        });
    }

    onError = (errorMessage: any) => {
        console.log(errorMessage); // eslint-disable-line no-console
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
                    onBackButtonPress={() => {onShowReviewModal()}}
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
                            size={size16}
                            color={'#464646'}
                        />
                    }
                    headerMid={<LogoAndTitle/>}
                    headerRight={<View/>}
                />
                {
                    this.state.coordinates !== null
                        ? (
                            <>
                                <MapView
                                    initialRegion={this.state.coordinates[0]}
                                    style={{flex: 2, width: WINDOW_WIDTH}}
                                    ref={c => this.mapView = c}
                                >
                                    {/*{this.state.coordinates.map((marker, index) => {*/}
                                    {/*    console.log('marker', marker)*/}
                                    {/*    return (*/}
                                    {/*        <Marker*/}
                                    {/*            key={index}*/}
                                    {/*            coordinate={marker}*/}
                                    {/*            // title={marker.title}*/}
                                    {/*            // description={marker.description}*/}
                                    {/*        />*/}
                                    {/*    )*/}
                                    {/*})}*/}
                                    <MapViewDirections
                                        origin={this.state.coordinates[0]}
                                        destination={this.state.coordinates[this.state.coordinates.length - 1]}
                                        waypoints={this.state.coordinates.slice(1, -1)}
                                        mode='DRIVING'
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        language='ru'
                                        strokeWidth={4}
                                        strokeColor="red"
                                        onStart={(params) => {
                                            console.log('params', params);
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
                                        <Text style={{fontFamily: MontserratSemiBold}}>27 мин.</Text>
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
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <PulseIndicator
                                    size={100}
                                    color='#8CC83F'
                                />
                            </View>
                        )
                }
            </View>
        );
    }
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    console.log('data', data)
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const { locations } = data;
        console.log('locations', locations)
        console.log('locations data', data)
        // do something with the locations captured in the background
    }
});

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'},
    userLocation: {
        width: size44,
        height: size44,
        backgroundColor: '#8CC83F',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

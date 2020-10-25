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
    HEADER_HEIGHT,
    size16,
    size20,
    size44,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../../share/consts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker} from 'react-native-maps';
import {
    MontserratRegular,
    MontserratSemiBold,
} from '../../../../../share/fonts';
import Modal from 'react-native-modal';
import ReviewModal from './ReviewModal';
import {NavigationProps} from '../../../../../share/interfaces';
import MainHeader from '../../../../../share/components/MainHeader';
import locationStore from "../../../../../stores/LocationStore";
import modalsStore from "../../../../../stores/ModalsStore";

@observer
export default class MapPage extends Component<NavigationProps> {

    backHandler: any;

    componentDidMount() {
        this.getCurrentPosition();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackPress,
        );
    }

    async getCurrentPosition() {
        await locationStore.getPermissionAndLocation();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackPress = () => {
        this.props.navigation.navigate('MainScreen');
        return true;
    };

    render() {
        const {locationUser} = locationStore;
        const {
            onShowReviewModal,
            isShowReviewModal,
            onCloseSideBarAndShowAuth,
        } = modalsStore;
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
                        onShowReviewModal();
                    }}
                    hideModalContentWhileAnimating={true}
                    backdropOpacity={0}
                    onBackdropPress={onShowReviewModal}
                    style={{margin: 0}}
                    isVisible={isShowReviewModal}>
                    <ReviewModal/>
                </Modal>
                <MainHeader
                    navigation={this.props.navigation}
                />
                <MapView
                    style={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.6}}
                    provider={null}
                    region={{
                        latitude: locationUser.latitude,
                        longitude: locationUser.longitude,
                        latitudeDelta: locationUser.latitudeDelta,
                        longitudeDelta: locationUser.longitudeDelta,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: locationUser.latitude,
                            longitude: locationUser.longitude,
                        }}>
                        <View style={styles.userLocation}>
                            <FontAwesome5 name={'user-alt'} size={size16} color={'#FFFFFF'}/>
                        </View>
                    </Marker>
                </MapView>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onShowReviewModal}
                    style={styles.textContainer}>
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
            </View>
        );
    }
}

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

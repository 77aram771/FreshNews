import React from 'react';
import {
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    Platform,
    BackHandler,
    ScrollView
} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import {
    size16,
    size28,
    size34,
    WINDOW_WIDTH,
} from '../../share/consts';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogoAndTitle} from '../../share/components/LogoAndTitle';
import Header from '../../share/components/Header';
import {MontserratSemiBold} from '../../share/fonts';
import {ListItem} from './components/ListItem';
import {toJS} from "mobx";
import {NavigationEvents} from "react-navigation";
import userInfo from '../../stores/UserInfo';
import courierStore from '../../stores/CourierStore';
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import * as Location from 'expo-location';
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import {ErrorModal} from "./modals/ErrorModal";
import AsyncStorage from "@react-native-community/async-storage";

@observer
export default class CourierScreen extends React.Component<NavigationProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            ActiveOrder: null,
            refreshing: false,
            location: null,
            errorMassage: '',
            errorModal: false,
            errorData: [],
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async componentDidMount() {
        let getToken = await AsyncStorage.getItem('Token');
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            this.setState({
                errorMassage: 'Permission to access location was denied'
            })
        }
        let location = await Location.getCurrentPositionAsync({});
        await userInfo.getUserData();
        await courierStore.getCourierData();
        this.setState({
            refreshing: true,
            location: location.coords
        });
        setTimeout(async () => {
            const {getCourierData, courierUserData} = courierStore;
            await getCourierData();
            if (courierStore.errorData !== null) {
                this.setState({
                    refreshing: false,
                    errorData: toJS(courierStore.errorData),
                    errorModal: true
                })
            }
            if (toJS(courierUserData).length === 1) {
                this.setState({
                    ActiveOrder: toJS(courierUserData),
                    refreshing: false,
                }, async () => {
                    setInterval(async () => {
                        if (getToken !== null) {
                            if (this.state.ActiveOrder !== null) {
                                await courierStore.getCourierCoordinate(this.state.ActiveOrder[0].id, this.state.location.latitude, this.state.location.longitude);
                            }
                        }
                    }, 5000);
                })
            } else {
                this.setState({
                    ActiveOrder: null,
                    refreshing: false
                })
            }
        }, 1000);
    };

    async onRefresh() {
        await userInfo.getUserData();
        await courierStore.getCourierData();
        this.setState({
            refreshing: true,
        });
        setTimeout(async () => {
            const {getCourierData, courierUserData} = courierStore;
            await getCourierData();
            if (courierStore.errorData !== null) {
                this.setState({
                    refreshing: false,
                    errorData: toJS(courierStore.errorData),
                    errorModal: true
                })
            }
            if (toJS(courierUserData).length === 1) {
                this.setState({
                    ActiveOrder: toJS(courierUserData),
                    refreshing: false,
                }, async () => {
                })
            } else {
                this.setState({
                    ActiveOrder: null,
                    refreshing: false
                })
            }
        }, 1000);
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    handleBackButtonClick() {
        this.props.navigation.navigate('CourierScreen');
        return true;
    };

    async handleScanner(id: any, code: any) {
        await courierStore.getCourierOrderConfirmation(id, code)
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    render() {
        return (
            <>
                {
                    this.state.refreshing
                        ? (
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
                        : (
                            <>
                                <Modal
                                    visible={this.state.errorModal}
                                    useNativeDriver={false}
                                    footer={
                                        <ModalFooter
                                            style={{
                                                backgroundColor: 'red'
                                            }}
                                        >
                                            <ModalButton
                                                text="Закрить"
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
                                </Modal>
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: Platform.OS === "ios" ? 0 : 40,
                                    }}
                                >
                                    <NavigationEvents onDidFocus={() => this.onRefresh()}/>
                                    <Header
                                        headerLeft={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('CourierProfile')}
                                            >
                                                <Feather
                                                    name={'menu'}
                                                    size={size34}
                                                    color={'rgba(112, 112, 112, 0.4)'}
                                                />
                                            </TouchableOpacity>
                                        }
                                        headerMid={
                                            <LogoAndTitle courier={true}/>
                                        }
                                        headerRight={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('TakeOrderScreen', {
                                                    ActiveOrder: this.state.ActiveOrder
                                                })}
                                            >
                                                <FontAwesome5
                                                    name={'map-marker'}
                                                    size={size28}
                                                    color={'#8CC83F'}
                                                />
                                            </TouchableOpacity>
                                        }
                                    />
                                    <ScrollView
                                        style={{
                                            width: WINDOW_WIDTH,
                                        }}
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                        }}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.refreshing}
                                                onRefresh={this.onRefresh.bind(this)}
                                            />
                                        }
                                    >
                                        {
                                            this.state.ActiveOrder !== null
                                                ? (
                                                    this.state.ActiveOrder.map((item: any) => {
                                                        return (
                                                            <View key={item.id}>
                                                                <View
                                                                    style={{
                                                                        backgroundColor: '#F5F4F4',
                                                                        paddingVertical: size16
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontFamily: MontserratSemiBold,
                                                                            fontSize: size16,
                                                                            paddingHorizontal: size16,
                                                                        }}
                                                                    >
                                                                        {'Активный заказ'}
                                                                    </Text>
                                                                </View>
                                                                <ListItem
                                                                    item={item}
                                                                    onPress={() => this.props.navigation.navigate('ConfirmScreen', {
                                                                        item: item,
                                                                    })}
                                                                    navigation={this.props.navigation}
                                                                    handleScanner={this.handleScanner}
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                )
                                                : (
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: 20,
                                                                    alignSelf: 'center',
                                                                    marginBottom: 40
                                                                }}
                                                            >
                                                                Нет активных заказов
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() => this.props.navigation.navigate('TakeOrderScreen', {
                                                                    ActiveOrder: this.state.ActiveOrder
                                                                })}
                                                                style={{
                                                                    borderRadius: 10,
                                                                    width: WINDOW_WIDTH - 100,
                                                                    height: 60,
                                                                    backgroundColor: '#8CC83F',
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        color: '#fff',
                                                                        fontFamily: MontserratSemiBold,
                                                                        fontSize: 20
                                                                    }}
                                                                >
                                                                    Взят заказ
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                        }
                                    </ScrollView>
                                </View>
                            </>
                        )
                }
            </>
        )
    }
}

import React from 'react';
import {
    RefreshControl,
    SectionList,
    Text,
    TouchableOpacity,
    View,
    Image,
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
import {PulseIndicator} from 'react-native-indicators';
import * as Location from 'expo-location';
import {NextListItem} from "./components/NextListItem";

@observer
export default class CourierScreen extends React.Component<NavigationProps, any> {

    state = {
        ActiveOrder: null,
        AllOrder: null,
        refreshing: false,
        location: null,
        errorMassage: '',
    };

    async componentDidMount() {
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
            getCourierData();
            const firstItem = toJS(courierUserData)[0];
            const AllData = toJS(courierUserData).splice(0, 1);
            if (toJS(courierUserData).length === 1) {
                let obj = [firstItem];
                this.setState({
                    ActiveOrder: obj,
                    refreshing: false,
                }, async () => {
                    await courierStore.getCourierCoordinate(this.state.ActiveOrder[0].id, this.state.location.latitude, this.state.location.longitude);
                })
            } else if (toJS(courierUserData).length >= 1) {
                let obj1 = [
                    {
                        title: 'Следующий заказ',
                        data: AllData
                    }
                ]
                let obj2 = [firstItem];
                this.setState({
                    ActiveOrder: obj2,
                    AllOrder: obj1,
                    refreshing: false
                }, async () => {
                    await courierStore.getCourierCoordinate(this.state.ActiveOrder[0].id, this.state.location.latitude, this.state.location.longitude);
                })
            } else {
                this.setState({
                    ActiveOrder: null,
                    AllOrder: null,
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
            getCourierData();
            const firstItem = toJS(courierUserData)[0];
            const AllData = toJS(courierUserData).splice(0, 1);
            if (toJS(courierUserData).length === 1) {
                let obj = [firstItem];
                this.setState({
                    ActiveOrder: obj,
                    refreshing: false
                }, async () => {
                    await courierStore.getCourierCoordinate(this.state.ActiveOrder[0].id, this.state.location.latitude, this.state.location.longitude);
                })
            } else if (toJS(courierUserData).length >= 1) {
                let obj1 = [
                    {
                        title: 'Следующий заказ',
                        data: AllData
                    }
                ]
                let obj2 = [firstItem];
                this.setState({
                    ActiveOrder: obj2,
                    AllOrder: obj1,
                    refreshing: false
                }, async () => {
                    await courierStore.getCourierCoordinate(this.state.ActiveOrder[0].id, this.state.location.latitude, this.state.location.longitude);
                })
            } else {
                this.setState({
                    ActiveOrder: null,
                    AllOrder: null,
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

    handleBackButtonClick = () => {
        this.props.navigation.goBack('CourierScreen');
        return true;
    };

    handleScanner(id: any, code: any) {
        courierStore.getCourierOrderConfirmation(id, code)
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
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    marginTop: Platform.OS === "ios" ? 0 : 40
                                }}
                            >
                                <NavigationEvents onDidFocus={() => this.onRefresh()}/>
                                <Header
                                    headerLeft={
                                        <TouchableOpacity
                                            style={{marginLeft: 8}}
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
                                            style={{marginRight: 28}}
                                            onPress={() => this.props.navigation.navigate('TakeOrderScreen')}
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
                                        flex: 1,
                                        width: WINDOW_WIDTH,
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
                                                <View>
                                                    {
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
                                                    }
                                                    <SectionList
                                                        showsVerticalScrollIndicator={false}
                                                        sections={this.state.AllOrder}
                                                        keyExtractor={(item: any, index: any) => item + index}
                                                        renderItem={({item}) => (
                                                            <NextListItem
                                                                item={item}
                                                            />
                                                        )}
                                                        renderSectionHeader={({section: {title}}) => (
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
                                                                    {title}
                                                                </Text>
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            )
                                            : (
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily: MontserratSemiBold,
                                                            fontSize: size16,
                                                            alignSelf: 'center'
                                                        }}
                                                    >
                                                        Нет активных заказов
                                                    </Text>
                                                    {/*<View*/}
                                                    {/*    style={{*/}
                                                    {/*        alignContent: "flex-end",*/}
                                                    {/*        alignSelf: "flex-end",*/}
                                                    {/*        borderWidth: 1,*/}
                                                    {/*        borderColor: 'red',*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*    <Image*/}
                                                    {/*        style={{*/}
                                                    {/*            width: 200,*/}
                                                    {/*            height: 200,*/}
                                                    {/*        }}*/}
                                                    {/*        source={require('../../../assets/images/background_not_item.png')}*/}
                                                    {/*    />*/}
                                                    {/*</View>*/}
                                                </View>
                                            )
                                    }
                                </ScrollView>
                            </View>
                        )
                }
            </>
        )
    }
}

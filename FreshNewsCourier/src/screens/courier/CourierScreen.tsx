import React from 'react';
import {
    RefreshControl,
    SectionList,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    BackHandler
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

@observer
export default class CourierScreen extends React.Component<NavigationProps, any> {

    state = {
        userData: null,
        refreshing: false,
        location: null,
        errorMassage: '',
    };

    async componentDidMount() {
        await userInfo.getUserData();
        await courierStore.getCourierData();
        this.setState({
            refreshing: true
        });
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            this.setState({
                errorMassage: 'Permission to access location was denied'
            })
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location: location.coords
        });
        setTimeout(async () => {
            const {getCourierData, courierUserData} = courierStore;
            getCourierData();
            const firstItem = toJS(courierUserData)[0];

            const allData = toJS(courierUserData);
            // console.log('allData', allData)
            // console.log('toJS(courierUserData.shift())', toJS(courierUserData.shift()))

            let obj = [
                {
                    title: 'Активный заказ',
                    data: [firstItem]
                },
                {
                    title: 'Следующий заказ',
                    data: toJS(courierUserData)
                }
            ]
            this.setState({
                userData: obj,
                refreshing: false
            }, async () => {
                // console.log('this.state.userData[0].data.length', this.state.userData[0].data.length)
                // await courierStore.getCourierCoordinate(87, this.state.location.latitude, this.state.location.longitude);
            })
        }, 1000);
    };

    async onRefresh() {
        await userInfo.getUserData();
        await courierStore.getCourierData();
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            const {getCourierData, courierUserData} = courierStore;
            getCourierData();

            const firstItem = toJS(courierUserData)[0];
            const allData = toJS(courierUserData.shift());
            let obj = [
                {
                    title: 'Активный заказ',
                    data: [firstItem]
                },
                {
                    title: 'Следующий заказ',
                    data: toJS(courierUserData)
                }
            ]
            this.setState({
                userData: obj,
                refreshing: false
            })
        }, 1000)
    };
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack('CourierScreen');
        return true;
    };

    handleScanner(id: any, code: any) {
        courierStore.getCourierOrderConfirmation(id, code)
    }

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
                                    marginBottom: Platform.OS === "ios" ? 120 : 0
                                }}
                            >
                                <NavigationEvents
                                    onDidFocus={() => this.Refresh()}
                                />
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
                                {
                                    this.state.userData === null
                                        ? (
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
                                        : (
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH,
                                                }}
                                            >
                                                {/*{*/}
                                                {/*    this.state.userData[0].data.map((item: any) => {*/}
                                                {/*        console.log('item', item);*/}
                                                {/*        return (*/}
                                                {/*            <ListItem*/}
                                                {/*                item={item}*/}
                                                {/*                onPress={() =>*/}
                                                {/*                    this.props.navigation.navigate('ConfirmScreen', {*/}
                                                {/*                        item: item,*/}
                                                {/*                    })*/}
                                                {/*                }*/}
                                                {/*            />*/}
                                                {/*        )*/}
                                                {/*    })*/}
                                                {/*}*/}
                                                <SectionList
                                                    showsVerticalScrollIndicator={false}
                                                    sections={this.state.userData}
                                                    keyExtractor={(item: any, index: any) => item + index}
                                                    renderItem={({item}) => (
                                                        <ListItem
                                                            item={item}
                                                            onPress={() =>
                                                                this.props.navigation.navigate('ConfirmScreen', {
                                                                    item: item,
                                                                })
                                                            }
                                                            navigation={this.props.navigation}
                                                            handleScanner={this.handleScanner}
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
                                                    refreshControl={
                                                        <RefreshControl
                                                            refreshing={this.state.refreshing}
                                                            onRefresh={this.onRefresh.bind(this)}
                                                        />
                                                    }
                                                />
                                            </View>
                                        )
                                }
                            </View>
                        )
                }
            </>
        );
    };
}

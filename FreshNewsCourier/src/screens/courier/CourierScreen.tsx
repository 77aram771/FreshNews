import React from 'react';
import {
    RefreshControl,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import {
    size16,
    size28,
    size34,
    size44,
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
import AsyncStorage from "@react-native-community/async-storage";

@observer
export default class CourierScreen extends React.Component<NavigationProps, any> {

    state = {
        userData: [
            {
                title: 'Активный заказ',
                data: []
            },
        ],
        refreshing: false
    };

    async componentDidMount() {
        await userInfo.getUserData();
        await courierStore.getCourierData();
        let getToken = await AsyncStorage.getItem('Token');
        this.setState({
            refreshing: true
        })
        setTimeout(async () => {
            const {getCourierData, courierUserData} = courierStore;
            getCourierData();
            console.log('getToken', getToken);
            console.log('courierUserData', courierUserData);
            const firstItem = toJS(courierUserData)[0];
            console.log('firstItem', firstItem)
            const allData = toJS(courierUserData.shift())
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
            }, () => console.log('userData', this.state.userData))
        }, 1000)
    };

    async onRefresh() {

        await courierStore.getCourierData();

        this.setState({
            refreshing: true
        })

        setTimeout(() => {
            const {getCourierData, courierUserData} = courierStore;
            getCourierData();

            const firstItem = toJS(courierUserData)[0];
            console.log('firstItem', firstItem)
            const allData = toJS(courierUserData.shift())
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
            }, () => console.log('userData', this.state.userData))
        }, 1000)
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
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <NavigationEvents
                                    onDidFocus={() => this.onRefresh()}
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
                                    this.state.userData[0].data.length === 0
                                        ? (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text style={{fontFamily: MontserratSemiBold, fontSize: size16}}>
                                                    Нет активных заказов
                                                </Text>
                                                {/*<Image*/}
                                                {/*    style={{*/}
                                                {/*        borderColor: 'red',*/}
                                                {/*        borderWidth: 1,*/}
                                                {/*        width: 200,*/}
                                                {/*        height: 200*/}
                                                {/*    }}*/}
                                                {/*    source={backgroundImage}*/}
                                                {/*/>*/}
                                            </View>

                                        )
                                        : (
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH,
                                                }}
                                            >
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

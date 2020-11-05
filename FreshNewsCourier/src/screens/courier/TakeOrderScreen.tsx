import React from 'react';
import {
    Platform,
    RefreshControl,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import Header from '../../share/components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    size16,
    WINDOW_WIDTH,
} from '../../share/consts';
import {LogoAndTitle} from '../../share/components/LogoAndTitle';
import {MontserratSemiBold} from '../../share/fonts';
import {toJS} from "mobx";
import {ListItemOrders} from "./components/ListItemOrders";
import courierStore from '../../stores/CourierStore';
import {PulseIndicator} from 'react-native-indicators';

@observer
export default class TakeOrderScreen extends React.Component<NavigationProps> {

    state = {
        allData: null,
        refreshing: false
    }

    async componentDidMount() {
        await courierStore.getCourierDataAll();

        this.setState({
            refreshing: true
        })

        setTimeout(() => {
            const {getCourierData, courierData} = courierStore;
            getCourierData()
            let obj = [
                {
                    title: 'Вы можете взять заказ',
                    data: toJS(courierData)
                }
            ]
            this.setState({
                allData: obj,
                refreshing: false
            }, () => {
                console.log('allData', this.state.allData[0].data.length)
                // console.log('toJS(courierData)', toJS(courierData).data.length)
            })
        }, 1000)
    }

    async onRefresh() {

        this.setState({
            refreshing: true
        })

        setTimeout(() => {
            const {getCourierData, courierData} = courierStore;
            getCourierData()
            let obj = [
                {
                    title: 'Вы можете взять заказ',
                    data: toJS(courierData)
                }
            ]
            this.setState({
                allData: obj,
                refreshing: false
            }, () => console.log('allData', this.state.allData))
        }, 1000)
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
                                    marginTop: Platform.OS === "ios" ? 0 : 40
                                }}
                            >
                                <Header
                                    headerLeft={
                                        <TouchableOpacity
                                            style={{marginLeft: 8}}
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <AntDesign
                                                style={{paddingLeft: 8}}
                                                name={'left'}
                                                size={size16}
                                                color={'#000'}
                                            />
                                        </TouchableOpacity>
                                    }
                                    headerMid={
                                        <LogoAndTitle courier={true}/>
                                    }
                                />
                                {
                                    this.state.allData !== null
                                        ? (
                                            <View
                                                style={{
                                                    width: WINDOW_WIDTH,
                                                }}
                                            >
                                                <SectionList
                                                    showsVerticalScrollIndicator={false}
                                                    sections={this.state.allData}
                                                    keyExtractor={(item: any, index) => item + index}
                                                    renderItem={({item}) => (
                                                        <ListItemOrders
                                                            item={item}
                                                            onPress={(id: number) => {
                                                                courierStore.getCourierDataAdd(id)
                                                                this.props.navigation.goBack()
                                                            }}
                                                        />
                                                    )}
                                                    renderSectionHeader={({section: {title}}) => (
                                                        <View
                                                            style={{backgroundColor: '#8CC83F', paddingVertical: size16}}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily: MontserratSemiBold,
                                                                    fontSize: size16,
                                                                    paddingHorizontal: size16,
                                                                    color: '#FFFFFF',
                                                                }}>
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
                                        : (
                                            <View
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    alignSelf: 'center',
                                                }}
                                            >
                                                <Text style={{fontFamily: MontserratSemiBold, fontSize: size16}}>
                                                    Нет активных заказов
                                                </Text>
                                            </View>
                                        )
                                }
                            </View>
                        )
                }
            </>
        );
    }
}

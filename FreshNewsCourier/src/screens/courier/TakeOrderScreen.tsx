import React from 'react';
import {
    Platform,
    RefreshControl,
    SectionList,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import Header from '../../share/components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {size16, WINDOW_HEIGHT, WINDOW_WIDTH,} from '../../share/consts';
import {LogoAndTitle} from '../../share/components/LogoAndTitle';
import {MontserratSemiBold} from '../../share/fonts';
import {toJS} from "mobx";
import {ListItemOrders} from "./components/ListItemOrders";
import courierStore from '../../stores/CourierStore';
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import {ErrorModal} from "./modals/ErrorModal";
// @ts-ignore
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';

@observer
export default class TakeOrderScreen extends React.Component<NavigationProps> {

    state = {
        allData: null,
        refreshing: false,
        bool: false,
        errorModal: false,
        errorData: [],
    };

    async componentDidMount() {
        if (this.props.navigation.state.params.ActiveOrder !== null) {
            this.setState({
                bool: false
            })
        }
        else {
            this.setState({
                bool: true
            })
        }
        await courierStore.getCourierDataAll();
        if (courierStore.errorData !== null) {
            this.setState({
                errorData: toJS(courierStore.errorData),
                errorModal: true
            })
        }
        this.setState({
            refreshing: true
        })

        setTimeout(() => {
            const {getCourierData, courierData} = courierStore;
            getCourierData();
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
                console.log('allData', this.state.allData)
            })
        }, 1000)
    };

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
            })
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
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
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
                                <Header
                                    headerLeft={
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <AntDesign
                                                name={'left'}
                                                size={18}
                                                color={'#000'}
                                            />
                                        </TouchableOpacity>
                                    }
                                    headerMid={
                                        <LogoAndTitle courier={true}/>
                                    }
                                    headerRight={
                                        <View/>
                                    }
                                />
                                {
                                    this.state.allData !== null
                                        ? (
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
                                                        bool={this.state.bool}
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
                                        )
                                        : (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        alignSelf: "center"
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily: MontserratSemiBold,
                                                            fontSize: 20,
                                                            alignSelf: 'center',
                                                            marginBottom: WINDOW_HEIGHT / 5
                                                        }}
                                                    >
                                                        Нет заказов
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        alignContent: "flex-end",
                                                        alignSelf: "flex-end",
                                                        marginLeft: 50
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: WINDOW_WIDTH / 1.4,
                                                            height: WINDOW_HEIGHT / 3,
                                                        }}
                                                        resizeMode={"contain"}
                                                        source={require('../../../assets/images/background_not_item.png')}
                                                    />
                                                </View>
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

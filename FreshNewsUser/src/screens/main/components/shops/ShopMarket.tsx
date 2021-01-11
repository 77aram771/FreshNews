import React from 'react';
import {FlatList, View, RefreshControl, Text, TouchableOpacity, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {MontserratSemiBold} from '../../../../share/fonts';
import {WINDOW_WIDTH} from '../../../../share/consts';
import {HeaderText} from '../HeaderText';
import {StocksListItem} from '../stocks/StocksListItem';
import HeaderContent from '../headerContent/HeaderContent';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';
import {ShopMarketItem} from "./ShopMarketItem";
import {ErrorModal} from "../modals/ErrorModal";
import Modal, {ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import AsyncStorage from "@react-native-community/async-storage";
import userInfo from "../../../../stores/UserInfo";

interface ShopMarketInterface {
    getGeocodeAsync: any,
    navigation: any,
    sendPushNotification: any
}

@observer
export default // @ts-ignore
class ShopMarket extends React.Component<ShopMarketInterface, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            refreshing: true,
            promo: null,
            sections: null,
            errorModal: false,
            errorData: [],
            items: []
        }
    }

    async componentDidMount() {
        let getToken = AsyncStorage.getItem('Token');
        this.setState({
            refreshing: true,
            items: []
        });
        await shopsStore.getShopsSections();
        await userInfo.getUserData();
        setTimeout(() => {
            this.setState({
                refreshing: false,
                promo: toJS(shopsStore.getShopSection.promocodes),
                sections: toJS(shopsStore.getShopSection.sections)
            });
            if (shopsStore.errorData !== null) {
                let error = toJS(String(shopsStore.errorData));
                let errorCode = error.substr(error.length - 3);
                let errorData = {
                    status_code: errorCode,
                    message: 'Network Error',
                };
                this.setState({
                    errorData,
                    errorModal: true
                })
            }
            if (getToken !== null) {
                toJS(shopsStore.allOrders).map((item: any) => {
                    if (item.status === 5) {
                        this.setState({
                            items: [...this.state.items, item]
                        })
                    }
                })
            }
        }, 1000);
    };

    async onRefresh() {
        let getToken = AsyncStorage.getItem('Token');
        this.setState({
            refreshing: true,
            items: []
        });
        await shopsStore.getShopsSections();
        await userInfo.getUserData();
        await shopsStore.onResetClientAddress()
        setTimeout(() => {
            this.setState({
                refreshing: false,
                promo: toJS(shopsStore.getShopSection.promocodes),
                sections: toJS(shopsStore.getShopSection.sections)
            });
            if (shopsStore.errorData !== null) {
                let error = toJS(String(shopsStore.errorData));
                let errorCode = error.substr(error.length - 3);
                let errorData = {
                    status_code: errorCode,
                    message: 'Network Error',
                };
                this.setState({
                    errorData,
                    errorModal: true
                })
            }
            if (getToken !== null) {
                toJS(shopsStore.allOrders).map((item: any) => {
                    if (item.status === 5) {
                        this.setState({
                            items: [...this.state.items, item]
                        })
                    }
                })
            }
        }, 1000);
    };

    async handleNavigation(id: number, name: string) {
        await shopsStore.getShops(id)
        this.props.navigation.navigate('ShopsList', {
            shopName: name
        })
    };

    async handleNavigationShares(id: number, discount: number, code: number) {
        await shopsStore.getPromoCode(id)
        this.props.navigation.navigate('StocksList', {
            shopDiscount: discount,
            shopCode: code
        })
    };

    handleCloseErrorModal = async () => {
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    render() {
        return (
            <View style={{flex: 1, width: '100%'}}>
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
                </Modal>
                <ScrollView
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={{zIndex: 1, height: 50}}>
                        <HeaderContent
                            navigation={this.props.navigation}
                            getGeocodeAsync={() => this.props.getGeocodeAsync()}
                            items={this.state.items}
                        />
                    </View>
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
                                        marginTop: WINDOW_WIDTH / 1.2
                                    }}
                                >
                                    <PulseIndicator
                                        size={100}
                                        color='#8CC83F'
                                    />
                                </View>
                            )
                            : (
                                <View style={{zIndex: -1, marginTop: WINDOW_WIDTH / 1.5}}>
                                    <FlatList
                                        ListHeaderComponent={
                                            <>
                                                {
                                                    shopsStore.loader
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
                                                        : null
                                                }
                                                <HeaderText title={'Акции'}/>
                                                <FlatList
                                                    style={{paddingTop: 25, zIndex: -1}}
                                                    keyExtractor={item => item.id.toString()}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal={true}
                                                    data={this.state.promo}
                                                    renderItem={({item}) => {
                                                        console.log('item promo', item);
                                                        return (
                                                            <View key={item.id}>
                                                                <StocksListItem
                                                                    style={{marginLeft: 16}}
                                                                    discount={item.discount}
                                                                    onPressNavigation={() => this.handleNavigationShares(item.id, item.discount, item.code)}
                                                                />
                                                            </View>
                                                        );
                                                    }}
                                                />
                                                <HeaderText title={'Рынки'}/>
                                            </>
                                        }
                                        scrollEnabled={true}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={true}
                                        data={this.state.sections}
                                        renderItem={({item, index}) => {
                                            return (
                                                <ShopMarketItem
                                                    key={index}
                                                    name={item.name}
                                                    backgroundImage={item.background_image}
                                                    onPressNavigation={() => this.handleNavigation(item.id, item.name)}
                                                />
                                            )
                                        }}
                                        ListFooterComponent={
                                            <TouchableOpacity
                                                onPress={() => alert('test')}
                                                style={{
                                                    width: '100%',
                                                    marginBottom: 50,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: WINDOW_WIDTH - 40,
                                                        borderRadius: 10,
                                                        backgroundColor: '#8CC83F',
                                                        justifyContent: 'center',
                                                        alignItems: "center",
                                                        padding: 15,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: '#fff',
                                                            fontSize: 18,
                                                            fontFamily: MontserratSemiBold
                                                        }}
                                                    >
                                                        Показать ещё
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            )}
                </ScrollView>
            </View>
        );
    }
}

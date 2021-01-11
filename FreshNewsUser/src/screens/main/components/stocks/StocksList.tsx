import React from 'react';
import {FlatList, View, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {MontserratSemiBold} from '../../../../share/fonts';
import {size20, WINDOW_WIDTH} from '../../../../share/consts';
import {HeaderText} from '../HeaderText';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../../../share/components/Header";
import {LogoAndTitle} from "../../../../share/components/LogoAndTitle";
import {ShopsListItem} from '../shops/ShopsListItem';
import HeaderContentMarketShares from "./HeaderContentMarketShares";

interface ShopsListInterface {
    getGeocodeAsync: any,
    navigation: any,
}

@observer
export default class StocksList extends React.Component<ShopsListInterface, any> {

    // @ts-ignore
    state = {
        shopData: [],
        refreshing: true,
    }

    async componentDidMount() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            // if (toJS(shopsStore.getShopShares).shops.length > 0) {
            //     this.setState({
            //         refreshing: false,
            //         shopData: toJS(shopsStore.getShopShares)
            //     })
            // }
            this.setState({
                refreshing: false,
                shopData: toJS(shopsStore.getShopShares)
            })
        }, 1000)
    };

    onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: toJS(shopsStore.getShopShares)
            })
        }, 1000)
    };

    async handleNavigation(id: number) {
        await shopsStore.getShop(id)
        this.props.navigation.navigate('ShopPage')
    };

    render() {
        return (
            <>
                <Header
                    style={{
                        width: WINDOW_WIDTH,
                        paddingTop: size20,
                    }}
                    headerLeft={
                        <AntDesign
                            onPress={() => this.props.navigation.goBack()}
                            style={{paddingLeft: 8}}
                            name={'left'}
                            size={18}
                            color={'#000'}
                        />
                    }
                    headerMid={
                        <LogoAndTitle/>
                    }
                />
                <FlatList
                    ListHeaderComponent={
                        <>
                            <HeaderContentMarketShares
                                navigation={this.props.navigation}
                                code={this.props.navigation.state.params.shopCode}
                                discount={this.props.navigation.state.params.shopDiscount}
                            />
                            <HeaderText
                                style={{
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    alignSelf: "center",
                                    fontSize: 15
                                }}
                                title={'Магазины участвующие в акции'}
                            />
                        </>
                    }
                    scrollEnabled={true}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={true}
                    data={this.state.shopData.shops}
                    renderItem={({item, index}) => {
                        return (
                            <ShopsListItem
                                key={index}
                                logo={item.image}
                                time={item.time}
                                name={item.name}
                                rating={item.rating}
                                categories={item.categories}
                                reviews={item.reviews_count}
                                backgroundImage={item.background_image}
                                onPressNavigation={() => this.handleNavigation(item.id)}
                            />
                        )
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    ListFooterComponent={
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
                            ) : (
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
                            )
                    }
                />
            </>
        );
    }
}

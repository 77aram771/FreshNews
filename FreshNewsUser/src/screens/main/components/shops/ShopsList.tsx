import React from 'react';
import {FlatList, View, RefreshControl, TouchableOpacity, Text} from 'react-native';
import {observer} from 'mobx-react';
import {MontserratSemiBold} from '../../../../share/fonts';
import {ShopsListItem} from './ShopsListItem';
import {size20, WINDOW_WIDTH} from '../../../../share/consts';
import {HeaderText} from '../HeaderText';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../../../share/components/Header";
import {LogoAndTitle} from "../../../../share/components/LogoAndTitle";
import HeaderContentMarket from "../headerContent/HeaderContentMarket";

interface ShopsListInterface {
    getGeocodeAsync: any,
    navigation: any,
}

@observer
export default class ShopsList extends React.Component<ShopsListInterface, any> {

    state = {
        refreshing: true,
    }

    async componentDidMount() {
        this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 1000)
    };

    onRefresh() {
        this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({refreshing: false})
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
                            <HeaderContentMarket
                                name={this.props.navigation.state.params.shopName}
                                navigation={this.props.navigation}
                            />
                            <HeaderText
                                style={{
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    alignSelf: "center",
                                }}
                                title={'Магазины'}
                            />
                        </>
                    }
                    scrollEnabled={true}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={true}
                    data={shopsStore.getShopsItem.shops}
                    renderItem={({item, index}) => {
                        return (
                            <ShopsListItem
                                key={index}
                                logo={item.image}
                                time={item.time}
                                name={item.name}
                                rating={item.rating}
                                reviews={item.reviews_count}
                                categories={item.categories}
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
                            )
                            : (
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

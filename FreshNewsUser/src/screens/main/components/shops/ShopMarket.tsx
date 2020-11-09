import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {MontserratRegular} from '../../../../share/fonts';
import {data} from '../../../../share/info';
import {size16} from '../../../../share/consts';
import {NavigationProps} from '../../../../share/interfaces';
import {HeaderText} from '../HeaderText';
import {StocksListItem} from '../stocks/StocksListItem';
import HeaderContent from '../headerContent/HeaderContent';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';
import {ShopMarketItem} from "./ShopMarketItem";

interface ShopMarketInterface {
    getGeocodeAsync: any,
    navigation: any,
}

@observer
export default class ShopMarket extends React.Component<ShopMarketInterface, NavigationProps> {

    state = {
        refreshing: true,
        promo: null,
        sections: null,
        errorModal: false,
        errorData: [],
    }

    async componentDidMount() {
        this.setState({
            refreshing: true
        })
        shopsStore.getShopsSections()
        setTimeout(() => {
            this.setState({
                    refreshing: false,
                    promo: toJS(shopsStore.getShopSection.promocodes),
                    sections: toJS(shopsStore.getShopSection.sections)
                }
            )
        }, 1000)
    }

    onRefresh() {
        this.setState({
            shopData: toJS(shopsStore.getShopData)
        })
    }

    handleNavigation(id: number, name: string) {
        shopsStore.getShops(id)
        this.props.navigation.navigate('ShopsList', {
            shopName: name
        })
    }

    handleNavigationShares(id: number, discount: number, code: number) {
        shopsStore.getPromoCode(id)
        this.props.navigation.navigate('StocksList', {
            shopDiscount: discount,
            shopCode: code
        })
    }

    handleOpenErrorModal = async () => {
        this.setState({
            errorModal: true,
            errorData: toJS(shopsStore.errorData),
        }, () => console.log('errorData', this.state.errorData));
    };

    handleCloseErrorModal = async () => {
        // alert('test')
        await this.setState({
            errorModal: false,
        }, () => console.log('errorModal', this.state.errorModal))
    };

    render() {

        return (
            <View style={styles.shopsListContainer}>
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
                            <FlatList
                                ListHeaderComponent={
                                    <>
                                        <HeaderContent
                                            navigation={this.props.navigation}
                                            getGeocodeAsync={() => this.props.getGeocodeAsync()}
                                        />
                                        <HeaderText title={'Акции'}/>
                                        <FlatList
                                            style={{paddingTop: 25}}
                                            keyExtractor={item => item.toString()}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={this.state.promo.length === 0 ? [] : this.state.promo}
                                            renderItem={({item}) => {
                                                return (
                                                    <StocksListItem
                                                        keyIndex={item}
                                                        style={{marginLeft: 16}}
                                                        discount={item.discount}
                                                        onPressNavigation={() => this.handleNavigationShares(item.id, item.discount, item.code)}
                                                    />
                                                );
                                            }}
                                        />
                                        <HeaderText title={'Ринки'}/>
                                    </>
                                }
                                scrollEnabled={true}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={true}
                                data={this.state.sections.length === 0 ? data : this.state.sections}
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
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            />
                        )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shopsListContainer: {
        width: '100%',
        flex: 1
    },
    footerContainer: {
        backgroundColor: '#F5F4F4',
        alignItems: 'flex-start',
        paddingLeft: 30,
        flex: 1,
        paddingTop: 16,
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: size16,
        fontFamily: MontserratRegular,
        textAlign: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 29,
    },
    categoryContainer: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
});

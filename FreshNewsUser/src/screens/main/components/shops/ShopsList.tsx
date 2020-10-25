import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {MontserratRegular} from '../../../../share/fonts';
import {data} from '../../../../share/info';
import {ShopsListItem} from './ShopsListItem';
import {size16} from '../../../../share/consts';
import {NavigationProps} from '../../../../share/interfaces';
import {HeaderText} from '../HeaderText';
import {StocksListItem} from '../stocks/StocksListItem';
import HeaderContent from '../headerContent/HeaderContent';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';

@observer
export default class ShopsList extends React.Component<NavigationProps> {

    state = {
        shopData: [],
        refreshing: true
    }

    async componentDidMount() {
        this.setState({
            refreshing: true
        })
        shopsStore.getShopsHome()
        setTimeout(() => {
            this.setState({
                shopData: toJS(shopsStore.getShopData)
            })
            if (toJS(shopsStore.getShopData).shops.data.length > 0) {
                this.setState({
                    refreshing: false
                })
            }
        }, 1000)
    }

    onRefresh() {
        this.setState({
            shopData: toJS(shopsStore.getShopData)
        })
    }

    handleNavigation(id: number) {
        shopsStore.getShop(id)
        this.props.navigation.navigate('ShopPage')
    }

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
                                        <HeaderContent navigation={this.props.navigation}/>
                                        <HeaderText title={'Акции'}/>
                                        <FlatList
                                            style={{paddingTop: 25}}
                                            keyExtractor={item => item.toString()}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={[1, 2, 3, 4, 5]}
                                            renderItem={({item}) => {
                                                return (
                                                    <StocksListItem keyIndex={item} style={{marginLeft: 16}}/>
                                                );
                                            }}
                                        />
                                        <HeaderText title={'Магазины'}/>
                                    </>
                                }
                                scrollEnabled={true}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={true}
                                data={this.state.shopData.length === 0 ? data : this.state.shopData.shops.data}
                                renderItem={({item, index}) => (
                                    <ShopsListItem
                                        key={index}
                                        logo={item.image}
                                        time={item.time}
                                        name={item.name}
                                        rating={item.rating}
                                        reviews={item.reviews_count}
                                        backgroundImage={item.background_image}
                                        onPressNavigation={() => this.handleNavigation(item.id)}
                                    />
                                )}
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
    shopsListContainer: {width: '100%', flex: 1},
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

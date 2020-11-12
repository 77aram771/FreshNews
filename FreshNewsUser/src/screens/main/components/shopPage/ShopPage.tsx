import React from 'react';
import {
    ImageBackground,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
// @ts-ignore
import {SuperGridSectionList} from 'react-native-super-grid';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../../../share/interfaces';
import {MontserratSemiBold} from '../../../../share/fonts';
import HeaderInfo from './HeaderInfo';
import {ShopListItem} from './ShopListItem';
import {FooterPanel} from './FooterPanel';
import {
    HEADER_HEIGHT, size16,
    size20,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import Modal from 'react-native-modal';
import ProductPage from './productPage/ProductPage';
import {toJS} from "mobx";
import shopsStore from '../../../../stores/ShopsStore';
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import Header from "../../../../share/components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import {LogoAndTitle} from "../../../../share/components/LogoAndTitle";
import basketStore from "../../../../stores/BasketStore";

@observer
export default // @ts-ignore
class ShopPage extends React.Component<NavigationProps> {

    state = {
        shopData: [],
        refreshing: true
    }

    componentDidMount() {
        // this.setState({
        //     refreshing: true
        // })
        setTimeout(() => {
            const {getShopInfo} = shopsStore;
            const {getCartUserInfo} = basketStore;
            getCartUserInfo();
            const {products} = toJS(getShopInfo);
            let obj = [
                {
                    title: 'Заголовок',
                    data: products
                }
            ]
            this.setState({
                shopData: obj,
                refreshing: false
            })
        }, 1000)
    }

    onRefresh() {
        // this.setState({
        //     refreshing: true
        // })
        setTimeout(() => {
            const {getShopInfo} = shopsStore;
            const {getCartUserInfo} = basketStore;
            getCartUserInfo();
            const {products} = toJS(getShopInfo);
            let obj = [
                {
                    title: 'Заголовок',
                    data: products
                }
            ]
            this.setState({
                shopData: obj,
                refreshing: false
            })
        }, 1000)
    }

    render() {

        const {getShopInfo, isShowShopInformation, onShowShopInformation, getShopItem} = shopsStore;

        const {background_image} = toJS(getShopInfo);

        return (
            <View style={styles.container}>
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
                            <>
                                <Modal
                                    animationInTiming={400}
                                    animationOutTiming={400}
                                    onBackButtonPress={onShowShopInformation}
                                    hideModalContentWhileAnimating={true}
                                    backdropOpacity={0}
                                    onBackdropPress={onShowShopInformation}
                                    style={{margin: 0}}
                                    isVisible={isShowShopInformation}
                                >
                                    <ProductPage
                                        refresh={() => this.onRefresh()}
                                        navigation={this.props.navigation}
                                    />
                                </Modal>
                                <Header
                                    style={{
                                        width: WINDOW_WIDTH,
                                    }}
                                    headerLeft={
                                        <AntDesign
                                            onPress={() => this.props.navigation.goBack()}
                                            style={{paddingLeft: 8}}
                                            name={'left'}
                                            size={size16}
                                            color={'#000'}
                                        />
                                    }
                                    headerMid={
                                        <LogoAndTitle/>
                                    }
                                />
                                <SuperGridSectionList
                                    // keyExtractor={(item, index) => index.toString()}
                                    ListHeaderComponent={
                                        <View>
                                            <ImageBackground
                                                blurRadius={6}
                                                style={{
                                                    width: WINDOW_WIDTH,
                                                    height: WINDOW_WIDTH / 1.1,
                                                }}
                                                source={{uri: background_image}}
                                            >
                                                <HeaderInfo
                                                    reviews_count={toJS(getShopInfo).reviews_count}
                                                    city={toJS(getShopInfo).city}
                                                    name={toJS(getShopInfo).name}
                                                    image={toJS(getShopInfo).image}
                                                    rating={toJS(getShopInfo).rating}
                                                />
                                            </ImageBackground>
                                        </View>
                                    }
                                    itemDimension={WINDOW_WIDTH / 2.5}
                                    sections={this.state.shopData}
                                    renderItem={({item: productData}: any) => (
                                        <TouchableOpacity onPress={() => getShopItem(productData.id)}>
                                            <ShopListItem data={productData}/>
                                        </TouchableOpacity>
                                    )}
                                    // renderSectionHeader={({section}: any) => (
                                    //     <Text style={styles.sectionHeader}>{section.title}</Text>
                                    // )}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                />
                                <FooterPanel
                                    onPress={() => this.props.navigation.navigate('BasketPage')}
                                />
                            </>
                        )
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    sectionHeader: {
        color: '#BABABA',
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        marginLeft: 16,
        marginTop: 45,
        marginBottom: 12,
    }
});

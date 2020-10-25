import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import {observer} from 'mobx-react';
import {MenuTitle} from '../MenuTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MontserratRegular} from '../../../../share/fonts';
import {
    size14,
    size16,
    size20,
    size28,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import {NavigationProps} from "../../../../share/interfaces";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {imagesPaths} from "../../../../share/info";
import modalsStore from '../../../../stores/ModalsStore';

interface SideBarProps {
    navigation: any;
}

@observer
export default class SideBar extends Component<NavigationProps, SideBarProps> {

    handleNavigateToCart() {
        modalsStore.onChangeView()
        this.props.navigation.navigate('BasketPage')
    };

    handleNavigateToHistory() {
        modalsStore.onChangeView()
        this.props.navigation.navigate('PurchaseHistory')
    };

    handleNavigateToShop() {
        modalsStore.onChangeView()
        this.props.navigation.navigate('MainScreen')
    };

    handleNavigateToMyData() {
        modalsStore.onChangeView()
        this.props.navigation.navigate('MyData')
    };

    logOut() {
        AsyncStorage.removeItem('Token')
        modalsStore.onChangeView()
        this.props.navigation.navigate('Login')
    }

    render() {
        const {
            animatedValue,
            onChangeView,
            onCloseViewAndShowMyDataModal,
            onCloseSideBarAndShowAuth,
            onCloseViewAndShowCourierInformationModal,
            onCloseViewAndShowLegalEntities,
            onCloseViewAndShowDelivery,
            onCloseViewAndShowQuestionsAndAnswers,
            onCloseViewAndShowFeedback,
            onCloseViewAndShowTermsOfUse,
            onShowMyDataModal,
            isShowSideBar
        } = modalsStore;

        const viewSideBarOpacity = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
        });

        return (
            <Animated.View
                style={{
                    width: WINDOW_WIDTH,
                    opacity: viewSideBarOpacity,
                    display: isShowSideBar ? "flex" : "none",
                }}
            >
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'space-between',
                        height: WINDOW_HEIGHT * 80 / 100,
                    }}
                >
                    <View
                        style={{
                            paddingLeft: 24,
                        }}
                    >
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Стать курьером'}
                            handleClick={onCloseViewAndShowCourierInformationModal}
                        />
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Юридическим лицам'}
                            handleClick={onCloseViewAndShowLegalEntities}
                        />
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Доставка'}
                            handleClick={onCloseViewAndShowDelivery}
                        />
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Вопросы и ответы'}
                            handleClick={onCloseViewAndShowQuestionsAndAnswers}
                        />
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Обратная связь'}
                            handleClick={onCloseViewAndShowFeedback}
                        />
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Пользовательское соглашение'}
                            handleClick={onCloseViewAndShowTermsOfUse}
                        />
                        <>
                            <TouchableOpacity
                                onPress={() => this.handleNavigateToMyData()}
                                style={styles.bottomMenuContainer}
                            >
                                <FontAwesome
                                    name={'user'}
                                    size={size20}
                                    color={'#BABABA'}
                                    style={{paddingLeft: 3}}
                                />
                                <Text style={styles.bottomMenuTitle}>Мои данные</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomMenuContainer}
                                onPress={() => this.handleNavigateToCart()}
                            >
                                <FontAwesome5
                                    name={'shopping-cart'}
                                    size={size16}
                                    color={'#BABABA'}
                                />
                                <Text style={styles.bottomMenuTitle}>Мои заказы</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomMenuContainer}
                                onPress={() => this.handleNavigateToHistory()}
                            >
                                <FontAwesome5
                                    name={'history'}
                                    size={size16}
                                    color={'#BABABA'}
                                />
                                <Text style={styles.bottomMenuTitle}>История заказов</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.logOut()}
                                style={styles.bottomMenuContainer}
                            >
                                <Image
                                    resizeMode={'cover'}
                                    source={imagesPaths.exitIconImage}
                                    style={{width: size20, height: size20}}
                                />
                                <Text style={styles.bottomMenuTitle}>Выход</Text>
                            </TouchableOpacity>
                        </>

                    </View>
                    <TouchableOpacity
                        style={styles.footerTitle}
                        onPress={() => this.handleNavigateToShop()}
                    >
                        <FontAwesome5
                            name={'shopping-cart'}
                            size={size16}
                            color={'#8cc83f'}
                        />
                        <Text style={styles.bottomMenuTitle}>Магазины</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onChangeView}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        height: WINDOW_HEIGHT * 30 / 100
                    }}
                />
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    menuTitle: {
        color: '#000000',
        fontSize: size14,
        paddingTop: size20,
    },
    bottomMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size28,
    },
    bottomMenuTitle: {
        fontSize: size16,
        color: '#000000',
        paddingLeft: 16,
        fontFamily: MontserratRegular,
    },
    footerTitle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#F5F4F4'
    },
});

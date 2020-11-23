import React, {Component, useCallback} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, Button, View, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
    size18,
} from '../../../../share/consts';
import {NavigationProps} from "../../../../share/interfaces";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {imagesPaths} from "../../../../share/info";
import modalsStore from '../../../../stores/ModalsStore';
import authStore from "../../../../stores/AuthStore";

interface SideBarProps {
    navigation: any;
}

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
};

@observer
export default class SideBar extends Component<NavigationProps, SideBarProps> {

    async componentDidMount() {
        let getToken = await AsyncStorage.getItem('Token')
        if (getToken === null) {
            authStore.getUser(false);
        } else {
            authStore.getUser(true);
        }
    };

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
        AsyncStorage.removeItem('Token');
        authStore.getUser(false);
        modalsStore.onChangeView();
        this.props.navigation.navigate('Login');
    };

    render() {
        const {
            animatedValue,
            onChangeView,
            onCloseViewAndShowCourierInformationModal,
            onCloseViewAndShowLegalEntities,
            onCloseViewAndShowDelivery,
            onCloseViewAndShowQuestionsAndAnswers,
            onCloseViewAndShowFeedback,
            onCloseViewAndShowTermsOfUse,
            isShowSideBar
        } = modalsStore;

        const {isUser} = authStore;

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
                        height: WINDOW_HEIGHT,
                    }}
                >
                    <View style={{paddingLeft: 24}}>
                        <MenuTitle
                            titleStyle={styles.menuTitle}
                            title={'Стать курьером'}
                            handleClick={() => Linking.openURL('http://google.com')}
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
                        {
                            isUser
                                ? (
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
                                )
                                : <View/>
                        }
                    </View>
                    {
                        isUser
                            ? (
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
                            )
                            : (
                                <View
                                    style={{
                                        marginTop: 40,
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.footerButton1}
                                        onPress={() => this.handleNavigateToShop()}
                                    >
                                        <FontAwesome5
                                            name={'shopping-cart'}
                                            size={size16}
                                            color={'#8cc83f'}
                                        />
                                        <Text style={styles.bottomMenuTitle}>Магазины</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.footerButton2}
                                        onPress={() => this.props.navigation.navigate('Login')}
                                    >
                                        <FontAwesome5
                                            name={'user-alt'}
                                            size={size18}
                                            color={'#8cc83f'}
                                        />
                                        <Text style={styles.bottomMenuTitle}>Вход</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onChangeView}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            // height: WINDOW_HEIGHT * 60 / 100
                        }}
                    />
                </View>
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
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#F5F4F4'
    },

    footerButton1: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#F5F4F4'
    },

    footerButton2: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#eeeded'
    },
});

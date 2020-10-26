import React from 'react';
import {Platform} from 'react-native';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import {NavigationProps} from './src/share/interfaces';
import {createStackNavigator, TransitionPresets} from "react-navigation-stack";
import {createAppContainer, SafeAreaView} from "react-navigation";
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeSellerPage from "./src/screens/sellers/HomeSellerPage";
import DeliveryOrdersScreen from './src/screens/sellers/screens/DeliveryOrdersScreen';
import ScannerScreen from './src/screens/sellers/screens/ScannerScreen';

console.disableYellowBox = true;

let customFonts = {
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
};

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
    },
    {
        defaultNavigationOptions: {
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: {
                backgroundColor: '#ffffff',
            },
        },
    },
);

const SellerStack = createStackNavigator(
    {
        Seller: {
            screen: HomeSellerPage,
        },
        DeliveryOrdersScreen: {
            screen: DeliveryOrdersScreen,
        },
        ScannerScreen: {
            screen: ScannerScreen,
        },
    },
    {
        initialRouteName: 'Seller',
        defaultNavigationOptions: {
            ...TransitionPresets.ModalSlideFromBottomIOS,
            cardStyle: {
                backgroundColor: '#ffffff',
            },
        },
    },
);

const RootStack = createStackNavigator(
    {
        SellerStack: {
            screen: SellerStack,
        },
        Login: {
            screen: LoginStack,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(RootStack);

export default function App(navigation: NavigationProps) {

    let [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <>
                {
                    Platform.OS === "ios"
                        ? (
                            <SafeAreaView
                                style={{
                                    flex: 1,
                                }}
                                forceInset={{ top: 'always' }}
                            >
                                <AppContainer/>
                            </SafeAreaView>
                        )
                        : (
                            <SafeAreaView
                                style={{
                                    flex: 1,
                                }}
                            >
                                <AppContainer/>
                            </SafeAreaView>
                        )
                }
            </>
        );
    }
}

import React, {useEffect} from 'react';
import {Platform, View} from 'react-native';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import {NavigationProps} from './src/share/interfaces';
import {createStackNavigator, TransitionPresets} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import LoginScreen from "./src/screens/login/LoginScreen";
import CourierScreen from './src/screens/courier/CourierScreen';
import ConfirmScreen from './src/screens/courier/ConfirmScreen';
import CourierProfile from './src/screens/courier/components/CourierProfile';
import TakeOrderScreen from './src/screens/courier/TakeOrderScreen';
import AsyncStorage from "@react-native-community/async-storage";

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
            cardStyle: {
                backgroundColor: '#ffffff',
            },
        },
    },
);

const CourierStack = createStackNavigator(
    {
        CourierScreen: {
            screen: CourierScreen,
        },
        ConfirmScreen: {
            screen: ConfirmScreen,
        },
        CourierProfile: {
            screen: CourierProfile,
        },
        TakeOrderScreen: {
            screen: TakeOrderScreen,
        },
    },
    {
        initialRouteName: 'CourierScreen',
        defaultNavigationOptions: {
            header: () => null,
            cardStyle: {
                backgroundColor: '#ffffff',
            },
        },
    },
);


const RootStack = createStackNavigator(
    {
        Login: {
            screen: LoginStack,
        },
        Courier: {
            screen: CourierStack,
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
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <AppContainer/>
                            </View>
                        )
                        : (
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <AppContainer/>
                            </View>
                        )
                }
            </>
        );
    }
}

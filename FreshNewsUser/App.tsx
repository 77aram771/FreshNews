import React from 'react';
import {Platform, View} from 'react-native';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import {NavigationProps} from './src/share/interfaces';
import {createStackNavigator, TransitionPresets} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import LoginScreen from "./src/screens/login/LoginScreen";
import MainScreen from "./src/screens/main/MainScreen";
import SideBar from "./src/screens/main/components/sideBar/SideBar";
import MyData from "./src/screens/main/components/sideBar/MyData";
import ShopPage from "./src/screens/main/components/shopPage/ShopPage";
import BasketPage from "./src/screens/main/components/shopPage/basketPage/BasketPage";
import PurchaseHistory from "./src/screens/main/components/sideBar/PurchaseHistory";
import PaymentPage from "./src/screens/main/components/shopPage/paymentPage/PaymentPage";
import AssemblyPage from "./src/screens/main/components/shopPage/paymentPage/AssemblyPage";
import FinishOfferPage from "./src/screens/main/components/shopPage/paymentPage/FinishOfferPage";
import FinishPaymentPage from "./src/screens/main/components/shopPage/paymentPage/FinishPaymentPage";
import MapPage from "./src/screens/main/components/shopPage/paymentPage/MapPage";
import {CloudPayment} from "./src/screens/main/components/shopPage/paymentPage/CloudPayment";

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

const MainStack = createStackNavigator(
    {
      MainScreen: {
        screen: MainScreen,
        navigationOptions: {
          headerTitle: 'Главная',
        },
      },
      SideBar: {
        screen: SideBar,
        navigationOptions: {
          headerTitle: 'Сайдбар',
        },
      },
      MyData: {
        screen: MyData,
        navigationOptions: {
          headerTitle: 'Мои данные',
        },
      },
      ShopPage: {
        screen: ShopPage,
        navigationOptions: {
          headerTitle: 'Магазин',
        },
      },
      BasketPage: {
        screen: BasketPage,
        navigationOptions: {
          headerTitle: 'Корзина',
        },
      },
      PurchaseHistory: {
        screen: PurchaseHistory,
        navigationOptions: {
          headerTitle: 'История заказов',
        },
      },
      PaymentPage: {
        screen: PaymentPage,
        navigationOptions: {
          headerTitle: 'Оплата',
        },
      },
      AssemblyPage: {
        screen: AssemblyPage,
        navigationOptions: {
          headerTitle: 'Заказ собирается',
        },
      },
      FinishOfferPage: {
        screen: FinishOfferPage,
        navigationOptions: {
          headerTitle: 'Заказ собирается',
        },
      },
      FinishPaymentPage: {
        screen: FinishPaymentPage,
        navigationOptions: {
          headerTitle: 'Оплата заказа',
        },
      },
      MapPage: {
        screen: MapPage,
        navigationOptions: {
          headerTitle: 'Карта',
        },
      },
      CloudPayment: {
        screen: CloudPayment,
        navigationOptions: {
          headerTitle: 'CloudPayment заставка',
        },
      },
    },
    {
      defaultNavigationOptions: {
        header: () => null,
        cardStyle: {
          backgroundColor: '#fff',
        },
      },
    },
);

const RootStack = createStackNavigator(
    {
      mainStack: {
        screen: MainStack,
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
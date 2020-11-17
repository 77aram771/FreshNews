import React, {useEffect} from 'react';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeSellerPage from "./src/screens/sellers/HomeSellerPage";
import DeliveryOrdersScreen from './src/screens/sellers/screens/DeliveryOrdersScreen';
import BarcodeScanner from './src/screens/sellers/screens/BarcodeScanner';
import {SellerProfile} from "./src/screens/sellers/components/SellerProfile";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {DrawerActions} from '@react-navigation/native';
import {LogoAndTitle} from './src/share/components/LogoAndTitle';
import {TouchableOpacity, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {size34, size16} from "./src/share/consts";
import OldOrdersScreen from "./src/screens/sellers/screens/OldOrdersScreen";
import AsyncStorage from "@react-native-community/async-storage";

console.disableYellowBox = true;

let customFonts = {
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
};

const LoginStack = createStackNavigator();
const SellerStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="LogIn"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
        </LoginStack.Navigator>
    );
};

const SellerStackScreen = ({navigation}: any) => {
    return (
        <SellerStack.Navigator>
            <SellerStack.Screen
                name="HomeSellerPage"
                component={HomeSellerPage}
                options={{
                    title: '',
                    headerStyle: {
                        height: 120
                    },
                    headerTitle: () => (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <LogoAndTitle courier={true}/>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                marginLeft: 15,
                            }}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        >
                            <Feather
                                name={'menu'}
                                size={size34}
                                color={'rgba(112, 112, 112, 0.4)'}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View/>
                    )
                }}
            />
            <SellerStack.Screen
                name="DeliveryOrdersScreen"
                component={DeliveryOrdersScreen}
                options={{
                    title: '',
                    headerStyle: {
                        height: 120
                    },
                    headerTitle: () => (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <LogoAndTitle courier={true}/>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                marginLeft: 15,
                            }}
                            onPress={() => navigation.navigate('HomeSellerPage')}
                        >
                            <AntDesign
                                style={{paddingLeft: 8}}
                                name={'left'}
                                size={size16}
                                color={'#464646'}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View/>
                    )
                }}
            />
            <SellerStack.Screen
                name="OldOrdersScreen"
                component={OldOrdersScreen}
                options={{
                    title: '',
                    headerStyle: {
                        height: 120
                    },
                    headerTitle: () => (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <LogoAndTitle courier={true}/>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                marginLeft: 15,
                            }}
                            onPress={() => navigation.navigate('HomeSellerPage')}
                        >
                            <AntDesign
                                style={{paddingLeft: 8}}
                                name={'left'}
                                size={size16}
                                color={'#464646'}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View/>
                    )
                }}
            />
            <SellerStack.Screen
                name="BarcodeScanner"
                component={BarcodeScanner}
                options={{
                    headerShown: false
                }}
            />
        </SellerStack.Navigator>
    );
};

export default function App() {

    // useEffect(() => {
    //     (async () => {
    //         let getToken = await AsyncStorage.getItem('Token');
    //         console.log('navigation', navigation);
    //         console.log('getToken', getToken);
    //         // if (getToken !== undefined && getToken !== 'undefined' && getToken !== null && getToken !== 'null') {
    //         //     props.navigation.navigate('Home');
    //         // }
    //     })();
    // })

    let [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    drawerStyle={{
                        flex: 1,
                        width: "100%",
                    }}
                    drawerContent={(props) => {
                        return (
                            <SellerProfile {...props}/>
                        )
                    }}
                >
                    <Drawer.Screen
                        name="Auth"
                        component={LoginStackScreen}
                    />
                    <Drawer.Screen
                        name="Home"
                        component={SellerStackScreen}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

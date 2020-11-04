import React from 'react';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeSellerPage from "./src/screens/sellers/HomeSellerPage";
import DeliveryOrdersScreen from './src/screens/sellers/screens/DeliveryOrdersScreen';
import ScannerScreen from './src/screens/sellers/screens/ScannerScreen';
import {SellerProfile} from "./src/screens/sellers/components/SellerProfile";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {DrawerActions} from '@react-navigation/native';
import {LogoAndTitle} from './src/share/components/LogoAndTitle';
import {TouchableOpacity, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {size34} from "./src/share/consts";

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
                }}
            />
            <SellerStack.Screen
                name="DeliveryOrdersScreen"
                component={DeliveryOrdersScreen}
                options={{
                    title: ''
                }}
            />
            <SellerStack.Screen
                name="ScannerScreen"
                component={ScannerScreen}
                options={{
                    title: ''
                }}
            />
        </SellerStack.Navigator>
    );
};

export default function App() {

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

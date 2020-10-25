// @ts-ignore
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import HomeSellerPage from '../screens/sellers/HomeSellerPage';
import DeliveryOrdersScreen from "../screens/sellers/screens/DeliveryOrdersScreen";
import ScannerScreen from '../screens/sellers/screens/ScannerScreen';

export default createStackNavigator(
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

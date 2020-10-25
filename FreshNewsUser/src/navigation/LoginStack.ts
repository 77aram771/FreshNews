// @ts-ignore
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import LoginScreen from '../screens/login/LoginScreen';

export default createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            header: () => null,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            cardStyle: {
                backgroundColor: '#ffffff',
            },
        },
    },
);

// @ts-ignore
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import CourierScreen from '../screens/courier/CourierScreen';
import ConfirmScreen from '../screens/courier/ConfirmScreen';
import CourierProfile from '../screens/courier/components/CourierProfile';
import TakeOrderScreen from '../screens/courier/TakeOrderScreen';

export default createStackNavigator(
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
      ...TransitionPresets.ModalSlideFromBottomIOS,
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

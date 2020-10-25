import {NavigationScreenProp, NavigationState} from 'react-navigation';

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

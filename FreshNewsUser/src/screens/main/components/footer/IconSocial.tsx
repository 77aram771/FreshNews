import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {size16} from '../../../../share/consts';

export const IconSocial = ({
  style,
  name,
  callBack,
}: {
  style?: StyleProp<ViewStyle>;
  name: string;
  callBack: () => void;
}) => {
  return (
    <TouchableOpacity onPress={callBack}>
      <Icon style={style} color={'#707070'} name={name} size={size16} />
    </TouchableOpacity>
  );
};

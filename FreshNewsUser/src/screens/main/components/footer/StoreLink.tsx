import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';

export const StoreLink = ({
  style,
  callBack,
  source,
}: {
  style?: StyleProp<ViewStyle>;
  callBack: () => void;
  source: object;
}) => {
  return (
    <TouchableOpacity onPress={callBack}>
      {/*<FastImage resizeMode={'contain'} source={source} style={style} />*/}
    </TouchableOpacity>
  );
};

import {StyleProp, Text, View, ViewStyle} from 'react-native';

import React from 'react';
import {MontserratBold} from '../../../share/fonts';
import {size20} from '../../../share/consts';

export const HeaderText = ({
  style,
  title,
}: {
  style?: StyleProp<ViewStyle>;
  title: string;
}) => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 29}}>
      <Text
        style={[
          {
            fontFamily: MontserratBold,
            fontSize: size20,
            color: '#000000',
          },
          style,
        ]}>
        {title}
      </Text>
    </View>
  );
};

import React from 'react';
import {StyleProp, View, ViewStyle, Image} from 'react-native';

export const LogoAndTitle = ({
                                 style,
                                 courier,
                             }: {
    style?: StyleProp<ViewStyle>;
    courier?: boolean;
}) => {
    return (
        <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
            {!courier ? (
                <Image
                    source={require('../../../assets/iconImages/LogoTitle.png')}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
            ) : (
                <Image
                    source={require('../../../assets/iconImages/logo_grey.png')}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
            )}
        </View>
    );
};

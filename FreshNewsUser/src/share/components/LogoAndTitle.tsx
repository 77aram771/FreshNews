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
                        width: 100,
                        height: 70,
                    }}
                />
            ) : (
                <Image
                    source={require('../../../assets/iconImages/logo_grey.png')}
                    style={{
                        width: 100,
                        height: 70,
                    }}
                />
            )}
        </View>
    );
};

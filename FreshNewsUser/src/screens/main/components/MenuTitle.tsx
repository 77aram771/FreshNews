import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
import {MontserratRegular} from '../../../share/fonts';
import {size12} from '../../../share/consts';

export const MenuTitle = ({
                              title,
                              titleStyle,
                              handleClick
                          }: {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    handleClick?: any;
}) => {
    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <Text style={[styles.footerTitle, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    footerTitle: {
        paddingTop: 30,
        fontFamily: MontserratRegular,
        fontSize: size12,
        color: '#707070',
    },
});

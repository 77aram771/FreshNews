import React from 'react';
import {
    KeyboardTypeOptions,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import {MontserratMedium} from '../fonts';
import {size20, WINDOW_WIDTH} from '../consts';
import Icon from 'react-native-vector-icons/Fontisto';

export const CustomInput = ({
                                value,
                                style,
                                onChangeText,
                                placeholder,
                                phone,
                                textInputStyle,
                                maxLength,
                                keyboardType,
                                leftIcon,
                                placeholderTextColor,
                                editable,
                                multiline,
                                numberOfLines,
                                headerStyleWidth,
                                headerStyleText,
                                onChangeView
                            }: {
    value: string;
    style?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    onChangeText: (item: string) => void;
    placeholder?: string;
    phone?: boolean;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    leftIcon?: boolean;
    placeholderTextColor?: string;
    editable?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    headerStyleWidth?: number;
    headerStyleText?: number;
    onChangeView?: () => void
}) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#F5F4F4',
            borderRadius: 10,
            //justifyContent: 'center',
            width: headerStyleWidth === undefined && headerStyleWidth === "undefined" ? undefined : headerStyleWidth,
        },
        phoneCode: {
            borderRadius: 10,
            flexDirection: 'row',
            backgroundColor: '#EBEBEB',
            padding: 16,
        },
        plusSeven: {
            fontFamily: MontserratMedium,
            fontSize: 14,
            color: '#000000',
        },
        textInput: {
            width: headerStyleText === undefined && headerStyleText === "undefined" ? WINDOW_WIDTH / 1.6 : headerStyleText,
            fontFamily: MontserratMedium,
            textAlign: 'center',
            fontSize: 14,
        },
    });

    //console.log('onChangeView', onChangeView)

    return (
        <View
            style={[
                styles.container,
                style,
            ]}
        >
            {phone ? (
                <View style={styles.phoneCode}>
                    <Text style={styles.plusSeven}>+ 7</Text>
                </View>
            ) : null}
            {leftIcon ? (
                <View style={styles.phoneCode}>
                    <Icon name={'map-marker'} size={size20} color={'#8CC83F'}/>
                </View>
            ) : null}
            <TextInput
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={editable}
                keyboardType={keyboardType}
                maxLength={maxLength}
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                value={value}
                onChangeText={item => onChangeText(item)}
                style={[styles.textInput, textInputStyle]}
                onSubmitEditing={onChangeView}
            />
        </View>
    );
};



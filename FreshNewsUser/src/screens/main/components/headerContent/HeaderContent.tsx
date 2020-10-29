import React from 'react';
import {CustomInput} from '../../../../share/components/CustomInput';
import {
    size18,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import {
    StyleSheet,
    View,
    Linking,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
} from 'react-native';
import {imagesPaths} from '../../../../share/info';
import {MontserratRegular} from '../../../../share/fonts';
import {NavigationProps} from '../../../../share/interfaces';
import {observer} from 'mobx-react';
import shopsStore from '../../../../stores/ShopsStore';

interface HeaderContentInterface {
    getGeocodeAsync: any,
    navigation: any,
}

@observer
export default class HeaderContent extends React.Component<HeaderContentInterface, NavigationProps> {

    render() {

        const {
            animatedValue,
            isShowBackgroundInput,
            clientAddress,
            onChangeClientAddress
        } = shopsStore;

        const viewOpacity = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 0],
        });

        return (
            <View>
                {!isShowBackgroundInput ? (
                    <Animated.View
                        style={{
                            opacity: viewOpacity,
                        }}
                    >
                        <ImageBackground
                            style={{
                                width: WINDOW_WIDTH,
                                height: WINDOW_WIDTH / 1.5
                            }}
                            source={imagesPaths.backgroundListImage}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <Text style={styles.headerTitle}>
                                    Быстрая доставка свежих{'\n'} овощей и фруктов на дом 24/7{' '}
                                    {'\n'}
                                    Москва
                                </Text>
                                <CustomInput
                                    editable={true}
                                    placeholder={'Куда доставляем?'}
                                    placeholderTextColor={'#7C7878'}
                                    leftIcon={true}
                                    style={{marginBottom: size18, marginTop: 46,}}
                                    textInputStyle={{
                                        textAlign: 'center',
                                        paddingLeft: 0,
                                    }}
                                    getGeocodeAsync={() => this.props.getGeocodeAsync()}
                                    value={clientAddress}
                                    onChangeText={text => {onChangeClientAddress(text)}}
                                    headerStyleWidth={WINDOW_WIDTH - 40}
                                    headerStyleText={WINDOW_WIDTH / 1.3}
                                />
                            </View>
                        </ImageBackground>
                    </Animated.View>
                ) : (
                    <View
                        style={{
                            height: WINDOW_WIDTH / 5,
                        }}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: MontserratRegular,
        textAlign: 'center',
    },
});

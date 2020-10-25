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

@observer
export default class HeaderContent extends React.Component<NavigationProps> {

    linkToAppStore() {
        Linking.openURL('https://www.apple.com/ru/ios/app-store/').catch(() =>
            alert('Ошибка!'),
        );
    }

    linkToGooglePlay() {
        Linking.openURL('https://play.google.com/store/apps?hl=ru').catch(() =>
            alert('Ошибка!'),
        );
    }

    render() {

        const {
            animatedValue,
            isShowBackgroundInput,
            onChangeView,
            clientAddress,
        } = shopsStore;

        const viewHeight = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [WINDOW_WIDTH / 1.5, WINDOW_WIDTH / 3, WINDOW_WIDTH / 5],
        });

        const viewOpacity = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 0],
        });

        return (
            <View>
                {!isShowBackgroundInput ? (
                    <Animated.View
                        style={{
                            //height: viewHeight,
                            opacity: viewOpacity,
                            //zIndex: 200
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
                                }}>
                                <Text style={styles.headerTitle}>
                                    Быстрая доставка свежих{'\n'} овощей и фруктов на дом 24/7{' '}
                                    {'\n'}
                                    Москва
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => onChangeView()}
                                >
                                    <CustomInput
                                        editable={false}
                                        placeholder={'Куда доставляем?'}
                                        placeholderTextColor={'#7C7878'}
                                        leftIcon={true}
                                        style={{marginBottom: size18, marginTop: 46,}}
                                        textInputStyle={{
                                            textAlign: 'center',
                                            paddingLeft: 0,
                                        }}
                                        value={clientAddress}
                                        onChangeText={item => {
                                            onChangeView()
                                        }}
                                        headerStyleWidth={WINDOW_WIDTH - 40}
                                        headerStyleText={WINDOW_WIDTH / 1.3}
                                    />
                                </TouchableOpacity>
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

import React from 'react';
import {MenuTitle} from '../MenuTitle';
import {StyleSheet, View, Linking, Text, Image} from 'react-native';
import {
    size12,
    size20,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import {StoreLink} from './StoreLink';
import {MontserratRegular} from '../../../../share/fonts';
import {IconsPanel} from './IconsPanel';
import {imagesPaths} from '../../../../share/info';
import {observer} from "mobx-react";

@observer
export default class FooterComponent extends React.PureComponent {
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
        return (
            <View style={styles.footerContainer}>
                <MenuTitle title={'Стать партнером'}/>
                <MenuTitle title={'Стать курьером'}/>
                <MenuTitle title={'Юридическим лицам'}/>
                <MenuTitle title={'Доставка'}/>
                <MenuTitle title={'Пользовательское соглашение'}/>
                <MenuTitle title={'Вопросы и ответы'}/>
                <MenuTitle title={'Обратная связь'}/>
                <View style={{flexDirection: 'row'}}>
                    <StoreLink
                        style={styles.appStore}
                        callBack={this.linkToAppStore}
                        source={imagesPaths.appStoreImage}
                    />
                    <StoreLink
                        style={styles.googlePlay}
                        callBack={this.linkToGooglePlay}
                        source={imagesPaths.googlePlayImage}
                    />
                </View>
                <Text style={styles.footerTitle}>Мы в социальных сетях</Text>
                <IconsPanel/>
                <View
                    style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={{
                            fontFamily: MontserratRegular,
                            fontSize: size12,
                            color: '#707070',
                        }}>
                        Created & provide by
                    </Text>
                    <Image
                        style={{marginLeft: 8}}
                        source={imagesPaths.scriptaItImage}
                        width={WINDOW_WIDTH / 5}
                        height={size20}
                    />
                </View>
                <Text
                    style={{
                        paddingTop: 18,
                        fontFamily: MontserratRegular,
                        fontSize: size12,
                        color: '#707070',
                    }}>
                    Все права защищены ООО «Свежие новости» (с) 2019
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#F5F4F4',
        alignItems: 'flex-start',
        paddingLeft: 30,
        flex: 1,
        paddingTop: 16,
        paddingBottom: 30,
    },
    appStore: {
        width: WINDOW_WIDTH / 3,
        height: WINDOW_HEIGHT / 17,
        alignItems: 'flex-start',
    },
    googlePlay: {
        width: WINDOW_WIDTH / 2,
        height: WINDOW_HEIGHT / 17,
    },
    footerTitle: {
        paddingTop: 30,
        fontFamily: MontserratRegular,
        fontSize: size12,
        color: '#707070',
    },
});

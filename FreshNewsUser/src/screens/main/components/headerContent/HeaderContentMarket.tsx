import React, {Component} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../share/consts';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {imagesPaths} from '../../../../share/info';
import {MontserratRegular} from '../../../../share/fonts';
import {observer} from 'mobx-react';

interface HeaderContentInterface {
    navigation: any,
    name: string
}

@observer
export default class HeaderContentMarket extends Component<HeaderContentInterface, any> {

    render() {
        return (
            <ImageBackground
                style={{
                    width: WINDOW_WIDTH,
                    height: WINDOW_HEIGHT / 2
                }}
                resizeMode={"cover"}
                source={imagesPaths.backgroundListImage}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View style={{marginBottom: 30}}>
                        <Text style={styles.headerTitle}>
                            Рынок
                        </Text>
                        <Text style={styles.headerName}>
                            {`${this.props.name}`}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
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
        fontSize: 18,
        fontFamily: MontserratRegular,
        textAlign: 'center',
        marginBottom: 5
    },
    headerName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: MontserratRegular,
        textAlign: 'center',
    },
});

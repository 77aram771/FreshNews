import React, {Component} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../share/consts';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {imagesPaths} from '../../../../share/info';
import {MontserratMedium, MontserratRegular} from '../../../../share/fonts';
import {observer} from 'mobx-react';

interface HeaderContentInterface {
    navigation: any,
    discount: number,
    code: number,
}

@observer
export default class HeaderContentMarketShares extends Component<HeaderContentInterface, any> {

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
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View style={{marginBottom: 15}}>
                        <Text style={styles.headerTitle}>
                            СКИДКА
                        </Text>
                        <Text style={styles.headerName}>
                            {`-${this.props.discount}%`}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>
                            СКИДКА
                        </Text>
                        <Text style={styles.headerName}>
                            {`${this.props.code}`}
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
        fontSize: 15,
        fontFamily: MontserratRegular,
        textAlign: 'center',
    },
    headerName: {
        color: '#FFFFFF',
        fontSize: 30,
        fontFamily: MontserratMedium,
        textAlign: 'center',
    },
});

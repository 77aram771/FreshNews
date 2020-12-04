import React, {Component} from 'react';
import {View} from 'react-native';
// @ts-ignore
import {SafeAreaView} from 'react-navigation';
import {HEADER_HEIGHT, size34} from '../consts';
import SideBar from '../../screens/main/components/sideBar/SideBar';
import {observer} from "mobx-react";

interface HeaderProps {
    style?: any;
    headerRight?: object;
    headerLeft?: object;
    navigation?: object;
    marginTopHeader?: number;
    headerMid?: object;
}

@observer
export default // @ts-ignore
class Header extends Component<HeaderProps> {
    render() {
        const {
            style,
            headerLeft,
            headerRight,
            marginTopHeader,
            headerMid,
            navigation
        } = this.props;

        return (
            <SafeAreaView
                style={[
                    {
                        backgroundColor:
                            style !== undefined && style !== 'undefined'
                                ? style.backgroundColor !== undefined && style.backgroundColor !== 'undefined'
                                ? style.backgroundColor
                                : 'white'
                                : 'white',
                        borderWidth: 0.4,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        width: '100%',
                    },
                    style,
                ]}
            >
                <View
                    style={{
                        marginTop: marginTopHeader,
                        height: 80,
                        backgroundColor:
                            style !== undefined && style !== 'undefined'
                                ? style.backgroundColor !== undefined && style.backgroundColor !== 'undefined'
                                ? style.backgroundColor
                                : 'white'
                                : 'white',
                        // paddingTop: size34 * 2,
                        justifyContent: "space-between",
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {headerLeft ? (
                        <View
                            style={[
                                {
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 16,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                },
                            ]}>
                            {headerLeft}
                        </View>
                    ) : null}
                    {headerMid ? (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                top: 0,
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}>
                            {headerMid}
                        </View>
                    ) : null}
                    {headerRight ? (
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                top: 0,
                                justifyContent: 'center',
                            }}>
                            {headerRight}
                        </View>
                    ) : null}
                </View>
                <SideBar
                    navigation={navigation}
                />
            </SafeAreaView>
        );
    }
}

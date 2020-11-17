import React, {Component} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {observer} from "mobx-react";

interface HeaderProps {
    headerRight?: object;
    headerLeft?: object;
    headerMid?: object;
}

@observer
export default class Header extends Component<HeaderProps> {
    render() {
        const {
            headerLeft,
            headerRight,
            headerMid,
        } = this.props;

        return (
            <SafeAreaView
                style={{
                    borderWidth: 0.4,
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    width: '100%',
                }}
            >
                <View
                    style={{
                        height: 80,
                        backgroundColor: 'white',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        flexDirection: "row",
                        width: '100%',
                    }}
                >
                    {headerLeft ? (
                        <View style={{marginLeft: 15}}>
                            {headerLeft}
                        </View>
                    ) : null}
                    {headerMid ? (
                        <>
                            {headerMid}
                        </>
                    ) : null}
                    {headerRight ? (
                        <View style={{marginRight: 15}}>
                            {headerRight}
                        </View>
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
}

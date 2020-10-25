import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import Header from './Header';

import {LogoAndTitle} from './LogoAndTitle';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {observer} from 'mobx-react';
import {size12, size34} from '../consts';
import modalsStore from "../../stores/ModalsStore";

interface MineHeaderProps {
    navigation?: object;
}

@observer
export default class MainHeader extends React.Component<MineHeaderProps> {

    render() {
        const {
            navigation
        } = this.props;

        const {onChangeView, isShowSideBar} = modalsStore;
        return (
            <Header
                headerLeft={
                    !isShowSideBar ? (
                        <TouchableOpacity style={{marginLeft: 8}} onPress={onChangeView}>
                            <Feather
                                name={'menu'}
                                size={size34}
                                color={'rgba(112, 112, 112, 0.4)'}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onChangeView}>
                            <EvilIcons name={'close'} size={size34 * 1.5} color={'#464646'}/>
                        </TouchableOpacity>
                    )
                }
                headerMid={<LogoAndTitle/>}
                navigation={navigation}
            />
        );
    }
}
const styles = StyleSheet.create({});

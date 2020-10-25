import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';
import {
    size20,
    size28, size34,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../../../../share/consts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MontserratSemiBold} from "../../../../share/fonts";
import modalsStore from '../../../../stores/ModalsStore';

@observer
export default class CourierInformation extends Component {

    alertsToggleHandle(state: boolean) {
        this.setState({alertsIsOn: state});
    }
    render() {
        const {onShowCourierInformation} = modalsStore;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onShowCourierInformation}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 20,
                        paddingHorizontal: 16,
                        width: WINDOW_WIDTH * 0.9,
                        height: WINDOW_HEIGHT / 1.5,
                        alignItems: 'center',
                    }}>
                    <EvilIcons
                        onPress={onShowCourierInformation}
                        name={'close'}
                        size={size28}
                        color={'#707070'}
                        style={{position: 'absolute', right: 20, top: 20, zIndex: 100}}
                    />
                    <View style={{width: WINDOW_WIDTH * 0.9, paddingHorizontal: 15}}>
                        <Text style={{
                            color: '#BABABA',
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            paddingTop: size34,
                            paddingBottom: size28,
                        }}>
                            Стать курьером
                        </Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

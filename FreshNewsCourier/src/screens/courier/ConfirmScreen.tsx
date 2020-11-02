import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import courierStore from '../../stores/CourierStore';
import {observer} from 'mobx-react';
import {NavigationProps} from '../../share/interfaces';
import Header from '../../share/components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {
    size12,
    size16,
    size20,
    size34,
    size44,
    WINDOW_WIDTH,
} from '../../share/consts';
import {LogoAndTitle} from '../../share/components/LogoAndTitle';
import {MontserratSemiBold} from '../../share/fonts';
import {ClientAddress} from './components/ClientAddress';
import {PhoneComponent} from './components/PhoneComponent';
import {ActionButton} from '../../share/components/ActionButton';

@observer
export default class ConfirmScreen extends React.Component<NavigationProps, {
    navigation: any
}> {
    render() {

        const {item} = this.props.navigation.state.params;

        const {phone} = item.client

        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Header
                    headerLeft={
                        <TouchableOpacity
                            style={{marginLeft: 8}}
                            onPress={() => this.props.navigation.navigate('CourierProfile')}
                        >
                            <Feather
                                name={'menu'}
                                size={size34}
                                color={'rgba(112, 112, 112, 0.4)'}
                            />
                        </TouchableOpacity>
                    }
                    headerMid={
                        <LogoAndTitle courier={true}/>
                    }
                />
                <View
                    style={{
                        marginTop: size44 * 2,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size20,
                            textAlign: 'center',
                        }}
                    >
                        Вы уверены что {'\n'} заказ доставлен?
                    </Text>
                    <ClientAddress
                        style={{alignItems: 'center', marginTop: size34 * 2}}
                        item={item.client}
                    />
                    <PhoneComponent phone={phone} style={{marginTop: size20}}/>
                    <ActionButton
                        style={{
                            marginTop: 50,
                        }}
                        onPress={() => {
                            courierStore.getCourierDataFinish(item.id);
                            this.props.navigation.goBack();
                        }}
                        text={'Завершить доставку'}
                    />
                    <ActionButton
                        style={{
                            paddingVertical: 16,
                            backgroundColor: '#F5F4F4',
                            borderRadius: 10,
                            width: WINDOW_WIDTH * 0.9,
                            alignItems: 'center',
                            marginTop: size16,
                        }}
                        onPress={() => alert('Связаться с менеджером')}
                        text={'Связаться с менеджером'}
                        textStyle={{
                            color: '#000000',
                            fontFamily: MontserratSemiBold,
                            fontSize: size12,
                        }}
                    />
                </View>
            </View>
        );
    }
}

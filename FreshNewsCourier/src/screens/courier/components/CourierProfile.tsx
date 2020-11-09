import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import {observer} from 'mobx-react';
import {MontserratRegular, MontserratSemiBold} from '../../../share/fonts';
import {
    size12,
    size16,
    size20,
    size28,
    size34,
    size36,
    size44,
    WINDOW_WIDTH,
} from '../../../share/consts';
import {NavigationProps} from '../../../share/interfaces';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from "@react-native-community/async-storage";
import {toJS} from "mobx";
import modalsStore from "../../../stores/ModalsStore";
import userInfo from '../../../stores/UserInfo';

@observer
export default class CourierProfile extends React.Component<NavigationProps> {

    state = {
        offline: true,
    };

    logOut() {
        AsyncStorage.removeItem('Token')
        modalsStore.onChangeView()
        this.props.navigation.navigate('Login')
    }

    render() {

        const {offline} = this.state;
        const {userData} = userInfo;

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#464646',
                }}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        width: WINDOW_WIDTH,
                        paddingTop: size20,
                        paddingLeft: size20,
                    }}
                >
                    <EvilIcons name={'close'} size={size34 * 1.5} color={'#949494'}/>
                </TouchableOpacity>

                <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
                    <Text
                        style={{
                            fontFamily: MontserratRegular,
                            fontSize: size12,
                            color: '#FFFFFF',
                        }}
                    >
                        Ваш профиль
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size16,
                            color: '#FFFFFF',
                            paddingTop: size12,
                        }}
                    >
                        {`${userData.name} ${userData.surname}`}
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratRegular,
                            fontSize: size12,
                            color: '#FFFFFF',
                            paddingTop: size28,
                        }}
                    >
                        Телефон
                    </Text>
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size16,
                            color: '#FFFFFF',
                            paddingTop: size12,
                        }}
                    >
                        {`+${userData.phone}`}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => this.setState({offline: false})}
                        style={{
                            paddingVertical: size16,
                            backgroundColor: !offline ? '#8CC83F' : '#585858',
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: MontserratRegular,
                                fontSize: size12,
                                paddingHorizontal: size44,
                            }}
                        >
                            Оффлайн
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({offline: true})}
                        style={{
                            paddingVertical: size16,
                            backgroundColor: offline ? '#8CC83F' : '#585858',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                        }}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: MontserratRegular,
                                fontSize: size12,
                                paddingHorizontal: size44,
                            }}
                        >
                            Работаю
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: size34,
                        marginBottom: size44,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => alert('Поддержка')}
                        style={{
                            paddingVertical: size16,
                            backgroundColor: '#585858',
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: MontserratRegular,
                                fontSize: size12,
                                paddingHorizontal: size36,
                            }}
                        >
                            Поддержка
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.logOut()}
                        style={{
                            paddingVertical: size16,
                            backgroundColor: '#8CC83F',
                            borderRadius: 10,
                            marginLeft: size16,
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: MontserratRegular,
                                fontSize: size12,
                                paddingHorizontal: size44,
                            }}
                        >
                            Выход
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

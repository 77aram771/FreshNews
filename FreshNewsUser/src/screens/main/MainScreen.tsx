import React from 'react';
import {Animated, BackHandler, View} from 'react-native';
import {NavigationProps} from '../../share/interfaces';
import {observer} from 'mobx-react';
import ShopsList from './components/shops/ShopsList';
import {HEADER_HEIGHT, WINDOW_WIDTH} from '../../share/consts';
import {CustomInput} from '../../share/components/CustomInput';
import MainHeader from '../../share/components/MainHeader';
import basketStore from '../../stores/BasketStore';
import userInfo from '../../stores/UserInfo';
import shopsStore from '../../stores/ShopsStore';
import modalsStore from "../../stores/ModalsStore";
import paymentStore from "../../stores/PaymentStore";

@observer
export default class MainScreen extends React.Component<NavigationProps> {

    componentDidMount() {
        basketStore.getCartUserInfo()
        userInfo.getUserData();
        paymentStore.orderUserTime();
        shopsStore.getAllOrders();
    }

    render() {

        const {
            animatedValue,
            isShowBackgroundInput,
            clientAddress,
            onChangeClientAddress,
            onChangeView
        } = shopsStore;

        const {onCloseSideBarAndShowAuth} = modalsStore;

        const viewOpacity = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
        });

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        height: HEADER_HEIGHT
                    }}
                />
                <MainHeader
                    navigation={this.props.navigation}
                />
                <Animated.View
                    style={{
                        top: WINDOW_WIDTH / 4,
                        position: 'absolute',
                        zIndex: 1,
                        opacity: viewOpacity,
                    }}
                >
                    <CustomInput
                        editable={isShowBackgroundInput}
                        placeholderTextColor={'#000000'}
                        textInputStyle={{
                            width: WINDOW_WIDTH / 1.2,
                        }}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.28,
                            shadowRadius: 1.0,
                            elevation: 1,
                            backgroundColor: '#FFFFFF',
                        }}
                        placeholder={'Адрес!!!'}
                        value={clientAddress}
                        onChangeText={item => onChangeClientAddress(item)}
                        onChangeView={onChangeView}
                        headerStyleWidth={WINDOW_WIDTH - 90}
                        headerStyleText={WINDOW_WIDTH / 1.6}
                    />
                </Animated.View>
                <ShopsList navigation={this.props.navigation}/>
            </View>
        );
    }
}

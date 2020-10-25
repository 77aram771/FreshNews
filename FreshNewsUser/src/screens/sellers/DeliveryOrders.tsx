import React, {Component} from 'react';
import {View} from "react-native";
import {NavigationProps} from "../../share/interfaces";
import {DeliveryOrdersItem} from "./components/DeliveryOrdersItem";

export default class DeliveryOrders extends Component<NavigationProps, any> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12
                }}
            >
                <DeliveryOrdersItem navigation={this.props.navigation} number={4444} color={'#d96363'} time={3}/>
                <DeliveryOrdersItem navigation={this.props.navigation} number={3427} color={'#8cc83f'} time={10}/>
            </View>
        )
    }
}

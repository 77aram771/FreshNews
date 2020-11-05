import React, {Component} from 'react';
import {View} from "react-native";
import {DeliveryOrdersItem} from "./components/DeliveryOrdersItem";

export default class DeliveryOrders extends Component<any, any> {
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
                {
                    this.props.startOrder.map((item: any, index: any) => {
                        console.log('item', item);
                        return (
                            <View key={index}>
                                <DeliveryOrdersItem
                                    navigation={this.props.navigation}
                                    number={item.id}
                                />
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

import React, {Component} from 'react';
import {View, Text} from "react-native";
import {DeliveryOrdersItem} from "./components/DeliveryOrdersItem";
import {MontserratSemiBold} from "../../share/fonts";

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
                    this.props.startOrder.length > 0
                        ? (
                            this.props.startOrder.map((item: any, index: any) => {
                                return (
                                    <View key={index}>
                                        <DeliveryOrdersItem
                                            navigation={this.props.navigation}
                                            id={item.id}
                                            status={item.status}
                                        />
                                    </View>
                                )
                            })
                        ) : (
                            <Text
                                style={{
                                    fontFamily: MontserratSemiBold,
                                    fontSize: 20,
                                    color: '#000',
                                    marginBottom: 10
                                }}
                            >
                                Нет заказов
                            </Text>
                        )
                }
            </View>
        )
    }
}

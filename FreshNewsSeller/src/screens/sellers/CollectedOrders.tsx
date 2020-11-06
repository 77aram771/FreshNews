import React, {Component} from "react";
import {Animated, Text, View} from "react-native";
import { CollectedOrdersItem } from "./components/CollectedOrdersItem";

export default class CollectedOrders extends Component<any, any>{

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
                    this.props.buildOrder.map((item: any, index: any) => {
                        return (
                            <View key={index}>
                                <CollectedOrdersItem
                                    navigation={this.props.navigation}
                                    id={item.id}
                                    name={item.name}
                                    status={item.status}
                                />
                            </View>
                        )
                    })
                }
            </View>
        )
    }

}

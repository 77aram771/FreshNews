import React, {Component} from "react";
import {Animated, Text, View} from "react-native";
import {NavigationProps} from "../../share/interfaces";
import {AllCollectedOrdersItem} from "./components/AllCollectedOrdersItem";

export default class AllCollectedOrders extends Component<NavigationProps, any>{

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
                    this.props.finishOrders.map((item: any, index: any) => {
                        return (
                            <View key={index}>
                                <AllCollectedOrdersItem name={item.name}/>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

}

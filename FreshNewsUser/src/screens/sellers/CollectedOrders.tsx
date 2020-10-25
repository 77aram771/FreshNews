import React, {Component} from "react";
import {Animated, Text, View} from "react-native";
import {NavigationProps} from "../../share/interfaces";
import { CollectedOrdersItem } from "./components/CollectedOrdersItem";

export default class CollectedOrders extends Component<NavigationProps, any>{

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
                <CollectedOrdersItem number={3425} text={'Курьер спешит к вам'}/>
                <CollectedOrdersItem number={3427} text={'Забрал заказ'}/>
            </View>
        )
    }

}

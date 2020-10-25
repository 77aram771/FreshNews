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
                <AllCollectedOrdersItem number={3425}/>
                <AllCollectedOrdersItem number={3426}/>
                <AllCollectedOrdersItem number={3427}/>
                <AllCollectedOrdersItem number={3428}/>
                <AllCollectedOrdersItem number={3429}/>
                <AllCollectedOrdersItem number={3430}/>
                <AllCollectedOrdersItem number={3430}/>
            </View>
        )
    }

}

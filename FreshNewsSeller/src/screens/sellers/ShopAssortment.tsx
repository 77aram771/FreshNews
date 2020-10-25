import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {NavigationProps} from "../../share/interfaces";
// @ts-ignore
import {SuperGridSectionList} from 'react-native-super-grid';
import {size20, WINDOW_WIDTH} from "../../share/consts";
import {ShopAssortmentItem} from "./components/ShopAssortmentItem";
import {MontserratSemiBold} from "../../share/fonts";

export default class ShopAssortment extends Component<NavigationProps, any> {

    state = {
        allData: [
            {
                id: 1,
                title: 'Овощи',
                data: [
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 12
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 211
                    },
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 5
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 6
                    },
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 88
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 200
                    },
                ]
            },
            {
                id: 2,
                title: 'Фрукты',
                data: [
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 5
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 77
                    },
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 3
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 888
                    },
                    {
                        img: require('../../../assets/images/cucumber.png'),
                        title: 'Помидоры «Бакинские»',
                        quantity: 200
                    },
                    {
                        img: require('../../../assets/images/onion.png'),
                        title: 'Дыня сладкая узбекская',
                        quantity: 444
                    },
                ]
            }

        ],
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                }}
            >
                <SuperGridSectionList
                    itemDimension={WINDOW_WIDTH / 2.5}
                    sections={this.state.allData}
                    style={{
                        marginBottom: 15
                    }}
                    renderItem={({item: {img, title, quantity}}: any) => (
                        <ShopAssortmentItem img={img} number={quantity} title={title}/>
                    )}
                    renderSectionHeader={({section}: any) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                />

                <TouchableOpacity
                    onPress={() => alert('Тест!')}
                    style={{
                        width: WINDOW_WIDTH - 40,
                        height: 45,
                        backgroundColor: '#8cc83f',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: 45
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: '600',
                            fontFamily: MontserratSemiBold
                        }}
                    >
                        ПОКАЗАТЬ ВСЕ ТОВАРЫ
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        color: '#000',
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        marginLeft: 16,
        marginBottom: 12,
    },
});

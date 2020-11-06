import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
// @ts-ignore
import {SuperGridSectionList} from 'react-native-super-grid';
import {size20, WINDOW_WIDTH} from "../../share/consts";
import {ShopAssortmentItem} from "./components/ShopAssortmentItem";
import {MontserratSemiBold} from "../../share/fonts";

export default class ShopAssortment extends Component<any, any> {

    state = {
        allData: null,
    }

    componentDidMount() {
        this.setState({
            allData: [
                {
                    title: 'Овощи',
                    data: this.props.products
                },
            ]
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                }}
            >
                {
                    this.state.allData !== null
                        ? (
                            <SuperGridSectionList
                                itemDimension={WINDOW_WIDTH / 2.5}
                                sections={this.state.allData}
                                style={{marginBottom: 15}}
                                renderItem={(item: any) => {
                                    return (
                                        <ShopAssortmentItem image={item.item.image} number={item.quantity} title={item.item.name}/>
                                    )
                                }}
                                renderSectionHeader={({section}: any) => (
                                    <Text style={styles.sectionHeader}>{section.title}</Text>
                                )}
                            />
                        )
                        : <View/>
                }
                <TouchableOpacity
                    onPress={() => alert('Тест!')}
                    style={{
                        width: WINDOW_WIDTH - 40,
                        height: 45,
                        backgroundColor: '#8cc83f',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: 15
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

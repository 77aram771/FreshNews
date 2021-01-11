import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {size16, size20} from '../../../../../share/consts';
import {MontserratRegular, MontserratSemiBold} from '../../../../../share/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {observer} from 'mobx-react';
import basketStore from "../../../../../stores/BasketStore";
import {SvgUri} from "react-native-svg";

@observer
export default // @ts-ignore
class BasketListItem extends Component<{
    data: { id: number, name: string; price: string; productCount: number, weight: number, quantity: number, product: object };
    index: number;
    onRefresh?: any
}> {

    state = {
        itemQuantity: 0,
    }

    componentDidMount() {
        this.setState({
            itemQuantity: this.props.data.quantity
        })
    };

    async countUpFunction(id: number) {
        this.setState({itemQuantity: ++this.props.data.quantity});
        setTimeout(() => {
            basketStore.getUpdateCartItem(id, this.state.itemQuantity)
        }, 1000)
    };

    async countDownFunction(id: number) {
        this.state.itemQuantity !== 1
            ? this.setState({itemQuantity: --this.props.data.quantity})
            : null;
        setTimeout(() => {
            basketStore.getUpdateCartItem(id, this.state.itemQuantity)
        }, 1000)
    };

    async handleDeleteItem(id: number) {
        await basketStore.getDeleteCartItem(id);
        setTimeout(() => {
            this.props.onRefresh();
        }, 500)
    }

    render() {
        const {id, weight, product} = this.props.data;
        const {image} = product;
        let img = image.substr(image.length - 3);
        return (
            <View style={styles.rowInfoContainer}>
                <View style={{flexDirection: 'column', flex: 2, paddingLeft: 8}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            img === 'svg'
                                ? <SvgUri
                                    width="30"
                                    height="30"
                                    uri={image}
                                    style={{marginRight: 5}}
                                />
                                : <Image
                                    resizeMode={'cover'}
                                    source={{uri:image}}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5,
                                        borderRadius: 5,
                                    }}
                                />
                        }
                        <Text style={{fontFamily: MontserratSemiBold, fontSize: size16}}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 16}}>
                        <Text style={styles.price}>
                            {Math.ceil(parseInt(product.price.replace(/\s/g, '')))} <Text style={{color: '#8CC83F'}}>₽
                            за</Text>
                        </Text>
                        <Text style={styles.weight}>
                            {weight} <Text style={{color: '#8CC83F'}}>гр.</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.handleDeleteItem(id)}>
                        <Text style={styles.deleteWord}>
                            Удалить
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.minusPlusContainer}>
                    <TouchableOpacity onPress={() => this.countDownFunction(id)}>
                        <FontAwesome5
                            name={'minus'}
                            size={size20}
                            color={'#8CC83F'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.number}>{this.state.itemQuantity}</Text>
                    <TouchableOpacity onPress={() => this.countUpFunction(id)}>
                        <FontAwesome5
                            name={'plus'}
                            size={size20}
                            color={'#8CC83F'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontFamily: MontserratRegular, fontSize: size16}}>
                        {Math.ceil(Number(product.price.replace(/\s/g, '')) * this.state.itemQuantity)} <Text
                        style={{color: '#8CC83F'}}> ₽</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        borderBottomColor: '#00000029',
        paddingBottom: 14,
        paddingTop: 14,
        paddingLeft: 10,
    },
    price: {
        fontFamily: MontserratRegular,
        fontSize: size16,
        color: '#000000',
    },
    weight: {
        fontFamily: MontserratRegular,
        fontSize: size16,
        color: '#000000',
        paddingLeft: 8,
    },
    deleteWord: {
        fontFamily: MontserratRegular,
        fontSize: size16,
        color: '#8E8E8E',
        textDecorationLine: 'underline',
        paddingTop: 8,
    },
    minusPlusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    number: {
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        paddingHorizontal: 11,
    },
});

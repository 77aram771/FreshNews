import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {observer} from 'mobx-react';
import {
    size12,
    size14,
    size16,
    size20,
} from '../../../../share/consts';
import {MontserratBold, MontserratRegular} from '../../../../share/fonts';
import ShopRating from './ShopRating';
import {SvgUri} from "react-native-svg";

interface headerInfoInterface {
    image: string,
    name: string,
    city: string,
    reviews_count: number,
    rating: number,
}

@observer
export default class HeaderInfo extends Component<headerInfoInterface> {
    render() {

        const {image, name, city, reviews_count, rating} = this.props;
        let formatImage = image.substr(image.length - 3);
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>

                    {
                        formatImage === 'svg'
                            ? <SvgUri
                                width={90}
                                height={90}
                                uri={image}
                            />
                            : <Image
                                resizeMode={'contain'}
                                source={{uri: image}}
                                style={{
                                    width: 90,
                                    height: 90,
                                }}
                            />
                    }
                    <Text style={styles.shopName}>{name}</Text>
                    <Text style={styles.serviceContainer}>
                        Доставка овощей и фруктов · {`${city}`}
                    </Text>
                    <ShopRating review={false} rating={rating}/>
                    <Text style={styles.reviews}>{reviews_count} отзыва</Text>
                    <Text onPress={() => alert('подробности')} style={styles.moreDetails}>
                        Подробнее
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    infoContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 27,
    },
    shopName: {
        marginTop: 10,
        color: '#FFFFFF',
        fontFamily: MontserratBold,
        fontSize: size20,
    },
    serviceContainer: {
        marginTop: 8,
        color: '#FFFFFF',
        fontFamily: MontserratRegular,
        fontSize: size12,
        marginBottom: 16,
    },
    reviews: {
        marginTop: 18,
        color: '#FFFFFF',
        fontFamily: MontserratRegular,
        fontSize: size16,
    },
    moreDetails: {
        marginTop: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: MontserratRegular,
        fontSize: size14,
    },
});

import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';

import {
    size12, size14,
    size16,
    size20,
    WINDOW_HEIGHT, WINDOW_WIDTH,
} from '../../../../share/consts';
import {
    MontserratBold,
    MontserratRegular,
    MontserratSemiBold,
} from '../../../../share/fonts';

export const ShopsListItem = ({
                                  logo,
                                  time,
                                  name,
                                  rating,
                                  reviews,
                                  onPressNavigation,
                                  backgroundImage,
                              }: {
    logo: string;
    time: string;
    name: string;
    rating: string;
    reviews: string;
    onPressNavigation: () => void;
    backgroundImage: string;
}) => {
    let formatImage = logo.substr(logo.length - 3);

    console.log('formatImage', formatImage);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPressNavigation}
        >
            <ImageBackground
                imageStyle={{borderRadius: 20}}
                source={{uri: backgroundImage}}
                style={{height: WINDOW_HEIGHT / 4}}
            >
                <View style={styles.imageBackgroundContent}>
                    <View style={styles.logoContainer}>
                        {
                            logo === undefined && logo === 'undefined'
                                ? (
                                    <SvgUri
                                        width="60"
                                        height="60"
                                        //uri={logo}
                                        uri={'http://thenewcode.com/assets/svg/accessibility.svg'}
                                    />
                                ) : (
                                    formatImage === 'svg'
                                        ? <SvgUri
                                            width="60"
                                            height="60"
                                            //uri={logo}
                                            uri={logo}
                                        />
                                        : <Image
                                            resizeMode={'contain'}
                                            source={{uri: logo}}
                                            style={{
                                                width: 60,
                                                height: 60,
                                            }}
                                        />
                                )
                        }
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            {
                                time === undefined && time === 'undefined'
                                    ? time
                                    : 0
                            }
                            {'  '}
                            <Text style={styles.minutes}>мин.</Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.authorRatingContainer}>
                <View style={{flex: 10}}>
                    <Text style={styles.author}>{name}</Text>
                </View>

                <Text style={styles.rating}>{rating}</Text>
            </View>
            <View style={styles.categoryReviewsContainer}>
                {/*{*/}
                {/*    category1 === undefined && category1 === 'undefined' && category2 === undefined && category2 === 'undefined'*/}
                {/*        ? (*/}
                {/*            <Text style={styles.category}>{`Нет категории`}</Text>*/}
                {/*        )*/}
                {/*        : (*/}
                {/*            <Text style={styles.category}>{`${category1.name}, ${category2.name} `}</Text>*/}
                {/*        )*/}
                {/*}*/}
                <Text style={styles.reviews}>{reviews}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
        flexDirection: 'column',
        paddingHorizontal: 18,
        justifyContent: 'center',
    },
    imageBackgroundContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        flex: 1,
    },
    logoContainer: {
        // backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 18,
        marginLeft: 15,
    },
    logo: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: size16,
        paddingVertical: 19,
        paddingHorizontal: 11,
    },
    timeContainer: {
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        marginLeft: 15,
        padding: 14,
        borderRadius: 10,
    },
    time: {
        fontFamily: MontserratBold,
        fontSize: size16,
        color: '#8CC83F',
    },
    minutes: {
        fontFamily: MontserratRegular,
        fontSize: size16,
        color: '#000000',
        fontWeight: 'normal',
    },
    authorRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 18,
        marginHorizontal: 20,
    },
    author: {
        fontSize: size20,
        fontFamily: MontserratSemiBold,
        color: '#000000',
    },
    rating: {
        color: '#8CC83F',
        fontSize: size20,
        fontFamily: MontserratBold,
    },
    categoryReviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginHorizontal: 20,
    },
    category: {
        color: '#000000',
        fontSize: size14,
        fontFamily: MontserratRegular,
    },
    reviews: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: size12,
    },
});

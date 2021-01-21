import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {size34, WINDOW_HEIGHT, WINDOW_WIDTH} from "../../../../../share/consts";
import {MontserratMedium, MontserratSemiBold} from "../../../../../share/fonts";
import shopsStore from "../../../../../stores/ShopsStore";
import StarRating from 'react-native-star-rating';

export const ModalReview = ({name, customStarCount, handleReviewText, handleReview, onCustomStarRatingPress}: any) => {

    const mock = [
        {
            id: 1,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 2,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 3,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 4,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 5,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 6,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 7,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 8,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
        {
            id: 9,
            text: 'test test',
            name: 'Aram',
            star: 4
        },
    ];

    const renderItem = (item: any) => {
        return (
            <View key={item.id} style={{
                width: WINDOW_WIDTH - 100,
                padding: 15,
                flexDirection: "column",
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: '#d6d4d4',
                borderRadius: 10
            }}>
                <View style={{
                    // padding: 5,
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <Text>{item.name}</Text>
                    <StarRating
                        disabled={true}
                        emptyStar="ios-star-outline"
                        fullStar="ios-star"
                        halfStar="ios-star-half"
                        iconSet="Ionicons"
                        maxStars={5}
                        rating={item.star}
                        fullStarColor="gold"
                        emptyStarColor="grey"
                        halfStarEnabled
                        starSize={18}
                    />
                </View>
                <View style={{
                    // borderRadius: 10,
                    borderStyle: "solid",
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    padding: 5
                }}>
                    <Text>{item.text}</Text>
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 6,
                    // paddingBottom: 15,
                    width: WINDOW_WIDTH - 40,
                    height: WINDOW_HEIGHT / 1.15
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{flex: 1, width: '100%', marginTop: 10}}
                >
                    <TouchableOpacity
                        style={{marginLeft: 'auto', paddingRight: 10, marginBottom: 5}}
                        onPress={() => shopsStore.onShowShopReviewModal()}
                    >
                        <EvilIcons name={'close'} size={size34 * 1.5} color={'#464646'}/>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '100%',
                            flex: 1,
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <ScrollView
                            style={{flex: 1}}
                            contentContainerStyle={{
                                width: '90%',
                                flexGrow: 1,
                                justifyContent: 'flex-start',
                            }}
                        >
                            {mock.map(item => {
                                return (renderItem(item))
                            })}
                        </ScrollView>

                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: '100%',
                                marginBottom: 20
                            }}
                        >
                            <Text style={{fontSize: 14, fontFamily: MontserratMedium}}>Оставте отзив об <Text
                                style={{fontSize: 16, fontFamily: MontserratSemiBold}}>{name}</Text>
                            </Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={40}
                                rating={customStarCount}
                                fullStarColor="gold"
                                emptyStarColor="grey"
                                selectedStar={rating => onCustomStarRatingPress(rating)}
                            />
                            <View style={{
                                borderColor: 'grey',
                                borderWidth: 1,
                                padding: 5,
                                width: '90%',
                                marginTop: 10,
                                marginBottom: 10
                            }}>
                                <TextInput
                                    style={{
                                        height: WINDOW_HEIGHT / 7,
                                        justifyContent: "flex-start"
                                    }}
                                    blurOnSubmit
                                    returnKeyType="done"
                                    returnKeyLabel='done'
                                    underlineColorAndroid="transparent"
                                    placeholder="Добавить отзыв"
                                    placeholderTextColor="grey"
                                    numberOfLines={10}
                                    multiline={true}
                                    maxLength={200}
                                    onChangeText={item => handleReviewText(item)}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => handleReview()}
                                style={{
                                    width: '70%',
                                    height: 50,
                                    borderRadius: 10,
                                    backgroundColor: '#8CC83F',
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 20,
                                    fontFamily: MontserratSemiBold
                                }}>Отправить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

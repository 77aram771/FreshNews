import React from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {size14, size16, size24, WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../../share/consts';
import {MontserratSemiBold,} from '../../../../../share/fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import modalsStore from "../../../../../stores/ModalsStore";
import StarRating from "react-native-star-rating";

export const ReviewModal = ({name, customStarCount, handleReviewText, handleReview, onCustomStarRatingPress}: any) => {

    const {onShowReviewModal} = modalsStore;

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onShowReviewModal}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    borderRadius: 20,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{marginTop: 10, justifyContent: "center", alignItems: "center"}}
                >
                    <TouchableOpacity
                        style={{marginLeft: 'auto', paddingTop: 16, paddingRight: 16}}
                        onPress={onShowReviewModal}>
                        <EvilIcons name={'close'} size={size24} color={'#464646'}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontFamily: MontserratSemiBold,
                            fontSize: size16,
                            marginTop: 15,
                        }}
                    >
                        Оцените заказ в <Text style={{color: '#8CC83F'}}>{name}</Text>
                    </Text>
                    <View
                        style={{
                            paddingTop: 30,
                            width: WINDOW_WIDTH * 0.9,
                            alignItems: 'center',
                        }}>
                        <View style={{marginBottom: 20}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={40}
                                rating={customStarCount}
                                fullStarColor="gold"
                                emptyStarColor="grey"
                                selectedStar={rating => onCustomStarRatingPress(rating)}
                            />
                        </View>
                        <View style={{
                            padding: 5,
                            width: '90%',
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 5,
                            backgroundColor: '#F5F4F4'

                        }}>
                            <TextInput
                                style={{
                                    height: WINDOW_HEIGHT / 7,
                                    justifyContent: "flex-start",
                                    padding: 5
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
                    </View>
                    <TouchableOpacity
                        onPress={() => handleReview()}
                        // onPress={onShowReviewModal}
                        style={{
                            backgroundColor: '#8CC83F',
                            width: WINDOW_WIDTH * 0.9,
                            alignItems: 'center',
                            paddingVertical: size24,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontFamily: MontserratSemiBold,
                                fontSize: size14,
                                color: '#FFFFFF',
                            }}
                        >
                            Отправить отзыв
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

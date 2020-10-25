import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';
import {
  size14,
  size16,
  size24,
  WINDOW_WIDTH,
} from '../../../../../share/consts';
import {
  MontserratRegular,
  MontserratSemiBold,
} from '../../../../../share/fonts';
import ShopRating from '../ShopRating';
import {CustomInput} from '../../../../../share/components/CustomInput';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import modalsStore from "../../../../../stores/ModalsStore";

@observer
export default class ReviewModal extends Component {
  state = {
    reviewText: '',
  };
  render() {
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
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#ffffff',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <TouchableOpacity
            style={{marginLeft: 'auto', paddingTop: 16, paddingRight: 16}}
            onPress={onShowReviewModal}>
            <EvilIcons name={'close'} size={size24} color={'#464646'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: MontserratSemiBold,
              fontSize: size16,
              marginTop: 15,
            }}>
            Оцените заказ в <Text style={{color: '#8CC83F'}}>Supermango</Text>
          </Text>
          <View
            style={{
              paddingTop: 30,
              width: WINDOW_WIDTH * 0.9,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <ShopRating review={true} />
            </TouchableOpacity>
            <CustomInput
              multiline={true}
              numberOfLines={3}
              placeholder={'Текст отзыва'}
              placeholderTextColor={'#000000'}
              value={this.state.reviewText}
              onChangeText={value => this.setState({reviewText: value})}
              textInputStyle={{
                flex: 1,
                fontSize: size14,
                textAlignVertical: 'top',
                fontFamily: MontserratRegular,
              }}
              style={{
                justifyContent: 'flex-start',
                marginTop: 16,
                marginBottom: 16,
                marginHorizontal: 8,
                maxHeight: WINDOW_WIDTH / 2,
                height: WINDOW_WIDTH / 3,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={onShowReviewModal}
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
              }}>
              Отправить отзыв
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

// const styles = StyleSheet.create({});

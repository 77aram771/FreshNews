import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {size20, size24} from '../../../../share/consts';
import {MontserratSemiBold} from '../../../../share/fonts';

interface IProps {
    review: boolean;
    rating: number;
}

@observer
export default class ShopRating extends Component<IProps> {

    render() {
        const {rating, review} = this.props
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {!review ? (
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: size20,
                            fontFamily: MontserratSemiBold,
                            marginRight: 6,
                        }}
                    >
                        {rating}
                    </Text>
                ) : null}
                <Icon rating={1} max={1}/>
                <Icon rating={2} max={2}/>
                <Icon rating={3} max={3}/>
                <Icon rating={4} max={4}/>
                <Icon rating={5} max={5}/>
            </View>
        );
    }
}

const Icon = ({rating, max}: { rating: number; max: number }) => {
    const half = max - 0.5;
    return (
        <IconFontAwesome
            style={{marginHorizontal: 6}}
            color={'#FFC107'}
            name={
                rating >= max && rating >= half
                    ? 'star'
                    : rating === half
                    ? 'star-half-o'
                    : 'star-o'
            }
            size={size24}
        />
    );
};

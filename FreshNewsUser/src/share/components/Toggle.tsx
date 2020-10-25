import React from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import {size12, size34, size44} from '../consts';

interface IProps {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
}

const knobOffset = 25;

export class Toggle extends React.Component<IProps> {
    static propTypes = {
        isOn: PropTypes.bool,
        onToggle: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isOn: false,
    };

    state = {
        isOn: this.props.isOn,
        animatedValue: new Animated.Value(this.props.isOn ? knobOffset : 0),
    };

    componentDidUpdate(prevProps: any) {
        if (prevProps.isOn !== this.props.isOn) {
            this.setState({isOn: this.props.isOn}, () => {
                Animated.timing(this.state.animatedValue, {
                    toValue: this.state.isOn ? knobOffset : 0,
                    easing: Easing.elastic(0.7),
                    duration: 60,
                    useNativeDriver: true,
                }).start();
            });
        }
    }

    handlePress() {
        this.setState({isOn: !this.state.isOn}, () =>
            this.props.onToggle(this.state.isOn),
        );
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor: this.state.isOn ? '#8CC83F' : '#F5F4F4',
                    width: size44 + size12,
                    height: size34 * 0.9,
                    borderRadius: 10,
                    borderColor: '#E5E5EA',
                    justifyContent: 'center',
                }}
                onPress={() => this.handlePress()}>
                <Animated.View
                    style={{
                        backgroundColor: '#8CC83F',
                        width: size34,
                        //height: size34,
                        borderColor: 'white',
                        borderRadius: 10,
                        transform: [
                            {
                                translateX: this.state.animatedValue,
                            },
                        ],
                    }}
                />
            </TouchableOpacity>
        );
    }
}

// @ts-ignore
import {action, observable} from 'mobx';
import {Animated, Text} from 'react-native';
import React from "react";

class ModalsStore {
    @observable animatedValue: any = new Animated.Value(0);
    @observable isShowSideBar: boolean = false;

    @action
    onChangeView = () => {
        if (!this.isShowSideBar) {
            this.isShowSideBar = true;
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            this.isShowSideBar = false;
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
}

const modalsStore = new ModalsStore();
export default modalsStore;

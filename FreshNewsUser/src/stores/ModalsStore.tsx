// @ts-ignore
import {action, observable} from 'mobx';
import {Animated, Text} from 'react-native';
import React from "react";

class ModalsStore {
    @observable isVisibleAuthSideBar: boolean = false;
    @observable animatedValue: any = new Animated.Value(0);
    @observable isShowSideBar: boolean = false;
    @observable isShowProductPage: boolean = false;
    @observable isShowCheckOutDialog: boolean = false;
    @observable isShowReviewModal: boolean = false;
    @observable isShowMyDataModal: boolean = false;
    @observable isShowAuthPageModal: boolean = false;
    @observable isShowCourierProfileModal: boolean = false;
    // New Modal
    @observable isShowCourierInformation: boolean = false;
    @observable isShowLegalEntities: boolean = false;
    @observable isShowDelivery: boolean = false;
    @observable isShowQuestionsAndAnswers: boolean = false;
    @observable isShowFeedback: boolean = false;
    @observable isShowTermsOfUse: boolean = false;

    @action
    onShowCourierProfileModal = () => {
        this.isShowCourierProfileModal = !this.isShowCourierProfileModal;
    };

    onCloseViewAndShowMyDataModal = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowMyDataModal);
    };

    @action
    onCloseSideBarAndShowAuth = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    @action
    onShowAuthModal = () => {
        this.isShowAuthPageModal = !this.isShowAuthPageModal;
    };

    @action
    onShowMyDataModal = () => {
        this.isShowMyDataModal = !this.isShowMyDataModal;
    };

    @action
    onShowReviewModal = () => {
        this.isShowReviewModal = !this.isShowReviewModal;
    };

    @action
    onShowCheckOutDialog = () => {
        this.isShowCheckOutDialog = !this.isShowCheckOutDialog;
    };

    @action
    onShowProductPage = () => {
        this.isShowProductPage = !this.isShowProductPage;
    };

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

    @action
    onShowCourierInformation = () => {
        this.isShowCourierInformation = !this.isShowCourierInformation;
    }

    onCloseViewAndShowCourierInformationModal = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowCourierInformation);
    };

    @action
    onShowLegalEntities = () => {
        this.isShowLegalEntities = !this.isShowLegalEntities;
    }

    onCloseViewAndShowLegalEntities = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowLegalEntities);
    };

    @action
    onShowDelivery = () => {
        this.isShowDelivery = !this.isShowDelivery;
    }

    onCloseViewAndShowDelivery = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowDelivery);
    };

    @action
    onShowQuestionsAndAnswers = () => {
        this.isShowQuestionsAndAnswers = !this.isShowQuestionsAndAnswers;
    }

    onCloseViewAndShowQuestionsAndAnswers = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowQuestionsAndAnswers);
    };

    @action
    onShowFeedback = () => {
        this.isShowFeedback = !this.isShowFeedback;
    }

    onCloseViewAndShowFeedback = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowFeedback);
    };

    @action
    onShowTermsOfUse = () => {
        this.isShowTermsOfUse = !this.isShowTermsOfUse;
    }

    onCloseViewAndShowTermsOfUse = () => {
        this.isShowSideBar = false;
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(this.onShowTermsOfUse);
    };
}

const modalsStore = new ModalsStore();
export default modalsStore;

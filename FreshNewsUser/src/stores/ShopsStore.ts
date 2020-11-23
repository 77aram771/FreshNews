import {action, observable, toJS} from 'mobx';
import {Animated} from 'react-native';
import axios from 'axios';
import {SERVER_BASE} from "../share/consts";
import AsyncStorage from "@react-native-community/async-storage";

class ShopsStore {
    @observable selectedCategory: number = 0;
    @observable clientAddress: string = '';
    @observable animatedValue = new Animated.Value(0);
    @observable isShowBackgroundInput: boolean = false;
    @observable getShopLoader: boolean = false;
    @observable getShopData: any = [];
    @observable getShopSection: any = [];
    @observable getShopInfo: any = [];
    @observable getShopsItem: any = [];
    @observable getShopShares: any = [];
    @observable isShowShopInformation: boolean = false;
    @observable isShowAddAddressModal: boolean = false;
    @observable isShowAddCreditCart: boolean = false;
    @observable getShopItemInfo: any = [];
    @observable allOrders: any = [];
    @observable errorData: any = null;

    @action
    selectCategory = (index: number) => {
        this.selectedCategory = index;
    };

    @action
    onChangeClientAddress = (item: string) => {
        this.clientAddress = item;
    };

    @action
    getUserAddress = async (address: any) => {
        this.clientAddress = address
    };

    @action
    onChangeView = () => {
        if (!this.isShowBackgroundInput) {
            this.isShowBackgroundInput = true;
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }).start()
        } else {
            this.isShowBackgroundInput = false;
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start();
        }
    };

    @action
    getShopsHome = async () => {
        this.getShopData = [];
        await axios.get(`${SERVER_BASE}/home?search`)
            .then((res) => {
                this.getShopData = res.data;

            })
            .catch((error) => {
                console.log('error getShopsHome', error);
                this.errorData = error
            })
    }

    @action
    getShopsSections = async () => {
        this.getShopSection = [];
        console.log(`${SERVER_BASE}/sections`);
        await axios.get(`${SERVER_BASE}/sections`)
            .then((res) => {
                this.getShopSection = res.data;
            })
            .catch((error) => {
                console.log('error getShopsSections', error);
                this.errorData = error
            })
    }

    @action
    getShop = async (id: number) => {
        this.getShopLoader = true;
        this.getShopInfo = [];
        await axios.get(`${SERVER_BASE}/shop/${id}`)
            .then((res) => {
                console.log('getShop==---==', res)
                this.getShopInfo = res.data;
                // if (this.getShopData.shops.data) {
                //     this.getShopLoader = false;
                // }
            })
            .catch((error) => {
                console.log('error getShop', error);
                this.errorData = error
            })
    }

    @action
    getShops = async (id: number) => {
        this.getShopLoader = true;
        this.getShopInfo = [];
        await axios.get(`${SERVER_BASE}/shops/${id}`)
            .then((res) => {
                this.getShopsItem = res.data;
            })
            .catch((error) => {
                console.log('error getShops', error);
                this.errorData = error
            })
    }

    @action
    getPromoCode = async (id: number) => {
        this.getShopLoader = true;
        this.getShopShares = [];
        await axios.get(`${SERVER_BASE}/promocode/${id}`)
            .then((res) => {
                this.getShopShares = res.data;
            })
            .catch((error) => {
                console.log('error getPromoCode', error);
                this.errorData = error
            })
    }

    @action
    getShopItem = (id: number) => {
        this.getShopItemInfo = [];
        this.getShopItemInfo = toJS(this.getShopInfo).products.find(item => item.id === id)
        this.isShowShopInformation = !this.isShowShopInformation;
    }

    @action
    onShowShopInformation = () => {
        this.isShowShopInformation = !this.isShowShopInformation;
    };

    @action
    onShowAddCreditCart = () => {
        this.isShowAddCreditCart = !this.isShowAddCreditCart;
    };

    @action
    onShowAddAddressModal = () => {
        this.isShowAddAddressModal = !this.isShowAddAddressModal;
    };

    @action
    getAllOrders = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/orders`, {headers})
            .then((res) => {
                this.allOrders = res.data;
            })
            .catch((error) => {
                console.log('error getPromoCode', error);
                this.errorData = error
            })
    }
}

const shopsStore = new ShopsStore();
export default shopsStore;

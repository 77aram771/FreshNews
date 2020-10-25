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
    @observable getShopInfo: any = [];
    @observable isShowShopInformation: boolean = false;
    @observable getShopItemInfo: any = []
    @observable allOrders: any = []
    @observable Error: any = []

    @action
    selectCategory = (index: number) => {
        this.selectedCategory = index;
    };

    @action
    onChangeClientAddress = (item: string) => {
        this.clientAddress = item;
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
                console.log('res', res)
                this.getShopData = res.data;

            })
            .catch((e) => {
                console.log(e)
            })
    }

    @action
    getShop = async (id: number) => {
        this.getShopLoader = true;
        this.getShopInfo = [];
        await axios.get(`${SERVER_BASE}/shop/${id}`)
            .then((res) => {
                this.getShopInfo = res.data;
                if (this.getShopData.shops.data) {
                    this.getShopLoader = false;
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    @action
    getShopItem = (id: number) => {
        console.log('id', id)
        this.getShopItemInfo = [];
        this.getShopItemInfo = toJS(this.getShopInfo).products.find(item => item.id === id)
        this.isShowShopInformation = !this.isShowShopInformation;
    }

    @action
    onShowShopInformation = () => {
        this.isShowShopInformation = !this.isShowShopInformation;
    };

    @action
    getAllOrders = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/orders`, {headers})
            .then((res) => {
                console.log('res allOrders', res.data)
                this.allOrders = res.data;
            })
            .catch((e) => {
                console.log('orderUserTime error', e)
                this.Error = e
            })
    }

}

const shopsStore = new ShopsStore();
export default shopsStore;

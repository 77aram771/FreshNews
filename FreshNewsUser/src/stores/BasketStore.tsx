// @ts-ignore
import {action, observable, toJS} from 'mobx';
import {SERVER_BASE} from "../share/consts";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

class BasketStore {
    @observable productCount: number = 0;
    @observable cartUserInfo: any = [];
    @observable stackItem: any = [];
    @observable allPrice: number = 0;
    @observable errorData: any = null;

    @action
    getCartUserInfo = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/cart`, {headers})
            .then((res) => {
                let allPriceArray: any = [];
                this.stackItem = _(toJS(res.data))
                    .groupBy('product.shop.name')
                    .map((objs, key) => {
                        return ({
                            'id': new Date().getUTCMilliseconds(),
                            'marketName': key,
                            'marketPrice': _.sumBy(objs, item => item.quantity * Number(Math.ceil(item.price.replace(/\s/g, '')))),
                            'image': _.mapValues(objs, item => item.product.shop.image),
                        })
                    })
                    .value()
                console.log('getCartUserInfo stackItem', toJS(this.stackItem));
                this.cartUserInfo = res.data;
                this.cartUserInfo.reduce((sum: number, item: any) => {
                        return allPriceArray.push(parseInt(item.product.price.replace(/\s/g, '')) * toJS(item).quantity)
                    }, 0
                );
                this.allPrice = allPriceArray.reduce(function (accumulator: number, currentValue: number) {
                    return accumulator + currentValue;
                }, 0);

            })
            .catch((error) => {
                console.log('error getCartUserInfo', error);
                this.errorData = error
            })
    };

    @action
    getAddCartUser = async (id: number, count: number) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };

        fetch(`${SERVER_BASE}/cart/add/${id}?quantity=${count}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch((error) => {
                console.log('error getAddCartUser', error);
                this.errorData = error
            })
    }

    @action
    getDeleteCartItem = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(`${SERVER_BASE}/cart/remove/${id}`);
        fetch(`${SERVER_BASE}/cart/remove/${id}`, requestOptions)
            .then(res => {
                console.log('res getDeleteCartItem', res);
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch((error) => {
                console.log('error getDeleteCartItem', error);
                this.errorData = error
            })
    }

    @action
    getDeleteCarAllItem = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${SERVER_BASE}/cart/remove-all`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch((error) => {
                console.log('error getDeleteCarAllItem', error);
                this.errorData = error
            })
    }

    @action
    getUpdateCartItem = async (id: number, count: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${SERVER_BASE}/cart/update/${id}?quantity=${count}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch((error) => {
                console.log('error getUpdateCartItem', error);
                this.errorData = error
            })
    }
}

const basketStore = new BasketStore();
export default basketStore;

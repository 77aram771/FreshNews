// @ts-ignore
import {action, observable, toJS} from 'mobx';
import {SERVER_BASE} from "../share/consts";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class BasketStore {
    @observable productCount: number = 0;
    @observable cartUserInfo: any = []
    @observable allPrice: number = 0

    @action
    getCartUserInfo = async () => {
        //this.cartUserInfo = [];
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/cart`, {headers})
            .then((res) => {
                let allPriceArray: any = [];
                this.cartUserInfo = res.data;

                this.cartUserInfo.reduce((sum: number, item: any) => {
                        console.log('item', toJS(item));
                        return allPriceArray.push(Number(item.price.replace(/\s/g, '')) * toJS(item).quantity)
                    }, 0
                );

                let AllSum = allPriceArray.reduce(function (accumulator: number, currentValue: number) {
                    return accumulator + currentValue;
                }, 0);

                console.log('AllSum', AllSum)

                this.allPrice = AllSum;
            })
            .catch((e) => {
                console.log(e)
            })

    }

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
                console.log('res getAddCartUser', res)
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch(error => console.log('error', error));
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

        fetch(`${SERVER_BASE}/cart/remove/${id}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCartUserInfo()
                }
            })
            .catch(error => console.log('error', error));
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
            .catch(error => console.log('error', error));
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
            .catch(error => console.log('error', error));
    }
}

const basketStore = new BasketStore();
export default basketStore;
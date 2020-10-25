// @ts-ignore
import {action, observable, toJS} from 'mobx';
import axios from 'axios';
import {SERVER_BASE} from "../share/consts";
import AsyncStorage from "@react-native-community/async-storage";
class PaymentStore {
    @observable isSelectedPayment: string = 'online';
    @observable cartUserInfo: any = [];
    @observable time: any = [];
    @observable selectAddress: any = [];
    @observable selectTime: any = [];
    @observable Error: any = [];

    @action
    onSelectPayment = (value: string) => {
        this.isSelectedPayment = value
    };

    @action
    orderUserTime = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/orders/time`, {headers})
            .then((res) => {
                this.time = res.data;
            })
            .catch((e) => {
                console.log('orderUserTime error', e)
                this.Error = e
            })
    };

    @action
    orderUserCheckout = async (address: string, porch: string, floor: number, intercom: string, comment: string, date: string, time: string) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${str}`);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };



        fetch(`${SERVER_BASE}/orders/checkout?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}comment=${comment}&date=${date}&time=${time}`, requestOptions)
            .then(res => {
                console.log('res pay===--------', res)
            })
            .catch((e) => {
                console.log('orderUserTime error', e)
                this.Error = e
            })
    };

    @action
    getSelectAddress = async (address: any) => {
        this.selectAddress = address;
        console.log('address', address);
        setTimeout(() => {
            console.log('selectAddress', this.selectAddress);
        }, 1000)
    }

    @action
    getSelectTime = async (time: any) => {
        this.selectTime = time;
        console.log('time', time);
        setTimeout(() => {
            console.log('selectTime', this.selectTime);
        }, 1000)
    }
}

const paymentStore = new PaymentStore();
export default paymentStore;

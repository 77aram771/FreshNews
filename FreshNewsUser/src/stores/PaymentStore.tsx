import {action, observable} from 'mobx';
import axios from 'axios';
import {SERVER_BASE} from "../share/consts";
import AsyncStorage from "@react-native-community/async-storage";

class PaymentStore {
    @observable isSelectedPayment: string = 'online';
    @observable cartUserInfo: any = [];
    @observable order: any = null;
    @observable time: any = [];
    @observable selectAddress: any = [];
    @observable selectTime: any = [];
    @observable commentText: any = '';
    @observable errorData: any = null;

    @action
    onSelectPayment = (value: string) => {
        this.isSelectedPayment = value
    };

    @action
    orderUserTime = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        // @ts-ignore
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/orders/time`, {headers})
            .then((res) => {
                this.time = res.data;
                // console.log('this.time', toJS(this.time))
            })
            .catch((error) => {
                console.log('error orderUserTime', error);
                this.errorData = error
            })
    };

    @action
    getOrder = async (id: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        // @ts-ignore
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/orders/show/${id}`, {headers})
            .then((res) => {
                this.order = res.data;
            })
            .catch((error) => {
                console.log('error getOrder', error);
                this.errorData = error
            })
    };

    @action
    orderUserCheckout = async (address: string, porch: string, floor: number, intercom: string, comment: string, date: string, time: string) => {
        let getToken = await AsyncStorage.getItem('Token')
        // @ts-ignore
        let str = getToken.slice(1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${str}`);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(`${SERVER_BASE}/orders/checkout?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}comment=${this.commentText}&date=${date}&time=${time}`);
        // @ts-ignore
        fetch(`${SERVER_BASE}/orders/checkout?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}comment=${this.commentText}&date=${date}&time=${time}`, requestOptions)
            .then(res => {
                console.log('res pay===--------', res);
                console.log('res pay===-------- status', res.status);
                if (res.status !== 200) {
                    this.errorData = res;
                    console.log('this.errorData', this.errorData);
                }
            })
            .catch((error) => {
                console.log('error orderUserCheckout', error);
                this.errorData = error
            })
    };

    @action
    getSelectAddress = async (address: any) => {
        this.selectAddress = address;
    };

    @action
    getSelectTime = async (time: any) => {
        this.selectTime = time;
    };

    @action
    finishPayment = async (id: any, payment: any) => {
        let pay;
        if (payment === 'cardToCourier') {
            pay = 2
        } else if (payment === 'cash') {
            pay = 3
        } else if (payment === 'online') {
            pay = 1
        }
        let getToken = await AsyncStorage.getItem('Token');
        // @ts-ignore
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};

        let requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow'
        };
        // @ts-ignore
        fetch(`${SERVER_BASE}/transactions/?order_id=${id}&type=${pay}`, requestOptions)
            .then((res) => {
                console.log('res finishPayment', res)
                // this.order = res;
            })
            .catch((error) => {
                console.log('error getOrder', error);
                this.errorData = error
            })
    };

    @action
    handleComment = (text: string) => {
        this.commentText = text;
    };
}

const paymentStore = new PaymentStore();
export default paymentStore;

import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class SellerStore {
    @observable sellerData: any = null;
    @observable dataInfo: any = null;
    @observable infoOrder: any = null;
    @observable scanData: any = null;
    @observable errorData: any = null;

    @action
    getUserData = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/seller`, {headers})
            .then((res) => {
                this.sellerData = res.data;
            })
            .catch(error => {
                console.log('getUserData error', error);
                this.errorData = error;
            });
    };

    @action
    getDataInfo = async (id: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/seller/products/${id}`, {headers})
            .then((res) => {
                this.dataInfo = res.data;
            })
            .catch(error => {
                console.log('getDataInfo error', error);
                this.errorData = error;
            });
    };

    @action
    getInfoOrder = async (id: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/seller/orders/${id}`, {headers})
            .then((res) => {
                this.infoOrder  = res.data;
            })
            .catch(error => {
                console.log('getInfoOrder error', error);
                this.errorData = error;
            });
    };

    @action
    getScan = async (id: any, code: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/seller/orders/item/${id}?code=0${code}`, {headers})
            .then((res) => {
                this.scanData = res.data;
            })
            .catch(error => {
                console.log('getInfoOrder error', error);
                this.errorData = error;
            });
    };

    @action
    getAddItem = async (name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.post(`${SERVER_BASE}/seller/products/create?name=${name}&category_id=${category_id}&weight=${weight}&type=${type}&price=${price}&description=${description}&image=${image}`, {headers})
            .then((res) => {
                this.sellerData = res.data;
            })
            .catch(error => {
                console.log('getAddItem error', error);
                this.errorData = error;
            });
    };

    @action
    getEditItem = async (id: any, name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.post(`${SERVER_BASE}/seller/products/${id}?name=${name}&category_id=${category_id}&weight=${weight}&type=${type}&price=${price}&description=${description}&image=${image}`, {headers})
            .then((res) => {
                this.sellerData = res.data;
            })
            .catch(error => {
                console.log('getEditItem error', error);
                this.errorData = error;
            });
    };
}

const authStore = new SellerStore();
export default authStore;

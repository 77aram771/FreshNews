import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class CourierStore {
    @observable courierUserData: any = [];
    @observable courierData: any = [];

    @action
    getCourierData = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/courier/orders`, {headers})
            .then((res) => {
                this.courierUserData = res.data;
            })
            .catch((e) => {
                console.log(e)
            })
    };

    @action
    getCourierDataAll = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/courier/orders/pending`, {headers})
            .then((res) => {
                this.courierData = res.data;
            })
            .catch((e) => {
                console.log(e)
            })
    };

    @action
    getCourierDataAdd = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${SERVER_BASE}/courier/orders/take/${id}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch(error => console.log('error', error));
    };

    @action
    getCourierOrderConfirmation = async (id: number, code: number) => {
        console.log('id', id);
        console.log('code', code);
        let getToken = await AsyncStorage.getItem('Token');
        console.log('getToken', getToken);
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(`${SERVER_BASE}/courier/orders/items/${id}?code=0${code}`)

        axios.post(`${SERVER_BASE}/courier/orders/items/${id}?code=0${code}`)
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch(error =>  {
                console.log('getCourierOrderConfirmation error----------------', error)
            });
    }

    @action
    getCourierDataFinish = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${SERVER_BASE}/courier/orders/deliver/${id}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch(error => console.log('error', error));
    }

    @action
    getCourierCoordinate = async (id: number, lat: string, lon: string) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/courier/maps/time/${id}?lat=${lat}&lon=${lon}`, requestOptions)
            .then(response => response.text())
            // .then(res => console.log('getCourierCoordinate, res', res))
            .catch(error => console.log('error', error));
    }

    @action
    getCourierDeleteItem = async (id: number) => {
        console.log('id getCourierDeleteItem', id)
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.delete(`${SERVER_BASE}/courier/orders/items/${id}`, {headers})
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch(error =>  {
                console.log('getCourierDeleteItem error----------------', error)
            });
    }
}

const authStore = new CourierStore();
export default authStore;

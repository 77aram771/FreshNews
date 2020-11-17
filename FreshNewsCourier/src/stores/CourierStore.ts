import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class CourierStore {
    @observable courierUserData: any = null;
    @observable courierData: any = null;
    @observable errorData: any = null;

    @action
    getCourierData = async () => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/courier/orders`, {headers})
            .then((res) => {
                this.courierUserData = res.data;
            })
            .catch((err) => {
                console.log('getCourierData error', err);
                this.errorData = err;
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
                // console.log('res.data', res.data);
                this.courierData = res.data;
            })
            .catch((err) => {
                console.log('getCourierDataAll error', err);
                this.errorData = err;
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
            .then(response => response.json())
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch((err) => {
                console.log('getCourierDataAdd error', err);
                this.errorData = err;
            })
    };

    @action
    getCourierOrderConfirmation = async (id: number, code: number) => {
        console.log('id', id);
        console.log('code', code);
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${SERVER_BASE}/courier/orders/items/${id}?code=0${code}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log('res getCourierOrderConfirmation-------------------------', res);
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch((err) => {
                console.log('getCourierOrderConfirmation error', err);
                this.errorData = err;
            })
    };

    @action
    getCourierDataFinish = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/courier/orders/deliver/${id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
                else {
                    this.errorData = res;
                }
            })
            .catch((err) => {
                console.log('---------------------------------------------------');
                this.errorData = err;
                console.log('getCourierDataFinish error', err);
            })
    };

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
        // console.log(`${SERVER_BASE}/courier/maps/time/${id}?lat=${lat}&lon=${lon}`);
        fetch(`${SERVER_BASE}/courier/maps/time/${id}?lat=${lat}&lon=${lon}`, requestOptions)
            .then(response => response.json())
            // .then(res => console.log('getCourierCoordinate, res', res))
            .catch((err) => {
                // console.log('getCourierCoordinate error', err);
                // this.errorData = err;
            })
    };

    @action
    getCourierDeleteItem = async (id: number) => {
        console.log('id getCourierDeleteItem', id)
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        // const headers = {Authorization: `Bearer ${strTrue}`};
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(`${SERVER_BASE}/courier/orders/items/${id}`)
        fetch(`${SERVER_BASE}/courier/orders/items/${id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 200) {
                    this.getCourierData()
                    this.getCourierDataAll()
                }
            })
            .catch((err) => {
                console.log('getCourierDeleteItem error', err);
                this.errorData = err;
            })
    };
}

const authStore = new CourierStore();
export default authStore;

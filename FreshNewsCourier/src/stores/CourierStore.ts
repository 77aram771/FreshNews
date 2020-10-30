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
    }

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
    }

    @action
    getCourierDataAdd = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        var requestOptions = {
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
    }

    @action
    getCourierDataFinish = async (id: number) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        var requestOptions = {
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
        console.log('id', id);
        console.log('lat', lat);
        console.log('lon', lon);
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
        console.log(`${SERVER_BASE}/courier/maps/time/${id}?lat=${lat}&lon=${lon}`);
        fetch(`${SERVER_BASE}/courier/maps/time/${id}?lat=${lat}&lon=${lon}`, requestOptions)
            .then(res => {
                console.log('getCourierCoordinate res', res)
            })
            .catch(error => console.log('error', error));
    }
}

const authStore = new CourierStore();
export default authStore;

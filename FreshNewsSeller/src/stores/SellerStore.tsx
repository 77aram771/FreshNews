import {action, observable} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";

class SellerStore {
    @observable sellerData: any = [];
    @observable dataInfo: any = null;
    @observable infoOrder: any = null;
    @observable scanData: any = null;
    @observable errorData: any = null;

    @action
    getUserData = async () => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("https://fructonosback.ru/api/seller", requestOptions)
            .then(response => response.json())
            .then((res) => {
                this.sellerData = res;
            })
            .catch(error => {
                console.log('getUserData error', error);
                this.errorData = error;
            });
    };

    @action
    getDataInfo = async (id: any) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/seller/products/${id}`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                // console.log('res getDataInfo', res);
                this.dataInfo = res;
            })
            .catch(error => {
                console.log('getDataInfo error', error);
                this.errorData = error;
            });
    };

    @action
    getInfoOrder = async (id: any) => {
        this.infoOrder = [];
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/seller/orders/${id}`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                // console.log('res getInfoOrder', res);
                this.infoOrder = res;
            })
            .catch(error => {
                console.log('getInfoOrder error', error);
                this.errorData = error;
            });
    };

    @action
    getScan = async (id: any, code: any) => {
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
        fetch(`${SERVER_BASE}/seller/orders/item/${id}?code=0${code}`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                if (res.status_code === 200) {
                    this.scanData = res;
                } else {
                    this.errorData = res;
                }
            })
            .catch(error => {
                console.log('getScan error', error);
                this.errorData = error;
            });
    };

    @action
    getAddItem = async (name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: "image.jpg",
        });
        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: formData,
            redirect: 'follow'
        };
        console.log(`${SERVER_BASE}/seller/products/create?name=${name}&category_id=${category_id}&weight=${weight}&type=${type}&price=${price}&description=${description}`);
        fetch(`${SERVER_BASE}/seller/products/create?name=${name}&category_id=${category_id}&weight=${weight}&type=${type}&price=${price}&description=${description}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    console.log('result getAddItem status 200', res)
                } else {
                    console.log('result getAddItem', res);
                    this.errorData = res;
                }
            })
            .catch(error => {
                console.log('getAddItem error', error);
                this.errorData = error;
            });
    };

    @action
    getEditItem = async (id: any, name: any, category_id: any, weight: any, type: any, price: any, description: any, image: any) => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: "image.jpg",
        });
        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: formData,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/seller/products/${id}?name=${name}&category_id=${category_id}&weight=${weight}&type=${type}&price=${price}&description=${description}`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    console.log('result getEditItem status 200', res)
                } else {
                    console.log('result getEditItem', res);
                    this.errorData = res;
                }
            })
            .catch(error => {
                console.log('getEditItem error', error);
                this.errorData = error;
            });
    };
}

const sellerStore = new SellerStore();
export default sellerStore;

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
        console.log(`${SERVER_BASE}/seller/products/${id}`);
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
        this.infoOrder = [];
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        console.log(`${SERVER_BASE}/seller/orders/${id}`);
        axios.get(`${SERVER_BASE}/seller/orders/${id}`, {headers})
            .then((res) => {
                this.infoOrder = res.data.items;
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
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        const formData = new FormData();
        formData.append('Image', {
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
            .then(result => console.log(result))
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
        const formData = new FormData();
        formData.append('Image', {
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
            .then(result => console.log(result))
            .catch(error => {
                console.log('getEditItem error', error);
                this.errorData = error;
            });
    };

    @action
    getUserDataUpdate = async (name: string, email: string, surname: string, patronymic: string) => {
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

        fetch(`${SERVER_BASE}/profile?name=${name}&email=${email}&surname=${surname}&patronymic=${patronymic}`, requestOptions)
            .then(res => {
                if (toJS(res).status === 200) {
                    this.getUserData()
                }
            })
            .catch(error => {
                console.log('getUserDataUpdate error', error);
                this.errorData = error;
            });
    };

    @action
    getUserDataAddAddress = async (address: any, porch: any, floor: any, intercom: any) => {
        console.log('address', address);
        console.log('porch', porch);
        console.log('floor', floor);
        console.log('intercom', intercom);
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
        console.log(`${SERVER_BASE}/profile/add-address?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}`)
        fetch(`${SERVER_BASE}/profile/add-address?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}`, requestOptions)
            .then(res => {
                if (toJS(res).status === 200) {
                    this.getUserData()
                }
            })
            .catch(error => {
                console.log('getUserDataAddAddress error', error);
                this.errorData = error;
            });
    };

    @action
    getUserDataDeleteAddress = async (id: number) => {
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

        fetch(`${SERVER_BASE}/profile/remove-address/${id}`, requestOptions)
            .then(res => {
                if (toJS(res).status === 200) {
                    this.getUserData()
                }
            })
            .catch(error => {
                console.log('getUserDataAddAddress error', error);
                this.errorData = error;
            });
    };
}

const sellerStore = new SellerStore();
export default sellerStore;

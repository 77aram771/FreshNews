// @ts-ignore
import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class UserInfo {
    @observable userData: any = [];
    @observable notificationsData: any = null;
    @observable errorData: any = null;

    @action
    getUserData = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        axios.get(`${SERVER_BASE}/profile`, {headers})
            .then((res) => {
                this.userData = res.data;
            })
            .catch(error => {
                console.log('getUserData error', error);
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

    @action
    getUserNotifications = async () => {
        // this.notificationsData = [];
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${strTrue}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://fructonosback.ru/api/notifications", requestOptions)
            .then(response => response.json())
            .then(res => {
                // console.log('res, getUserNotifications', res)
                this.notificationsData = res
            })
            .catch(error => console.log('error', error));
    };

    @action
    getUserNotificationsRead = async () => {
        // this.notificationsData = [];
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

        fetch("https://fructonosback.ru/api/notifications/read", requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log('res, getUserNotificationsRead', res)
                // this.notificationsData = res
            })
            .catch(error => console.log('error', error));
    };

    @action
    getUserAddCreditCard = async (number: number, month: number, year: number, holder: string, code: number) => {
        console.log('number', number);
        console.log('month', month);
        console.log('year', year);
        console.log('holder', holder);
        console.log('code', code);
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
        console.log(`${SERVER_BASE}/profile/cards?number=${number}&month=${month}&year=${year}&holder=${holder}&holder=${code}`)
        // fetch(`${SERVER_BASE}/profile/cards?number=${number}&month=${month}&year=${year}&holder=${holder}&holder=${code}`, requestOptions)
        //     .then(res => {
        //         console.log('res, getUserAddCreditCard', res)
        //         if (toJS(res).status === 200) {
        //             this.getUserData()
        //         }
        //     })
        //     .catch(error => {
        //         console.log('getUserAddCreditCard error', error);
        //         this.errorData = error;
        //     });
    };
}

const authStore = new UserInfo();
export default authStore;

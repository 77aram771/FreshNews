// @ts-ignore
import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class UserInfo {
    @observable userData: any = [];
    @observable Еrror: any = null;

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
                this.Еrror = error;
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
                this.Еrror = error;
            });
    }

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
                this.Еrror = error;
            });
    }

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
                this.Еrror = error;
            });
    }
}

const authStore = new UserInfo();
export default authStore;
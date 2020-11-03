import {action, observable, toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";
import axios from "axios";

class SellerStore {
    @observable sellerData: any = [];
    @observable ЕrrorData: any = null;

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
                this.ЕrrorData = error;
            });
    };
}

const authStore = new SellerStore();
export default authStore;

// @ts-ignore
import {action, observable} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_BASE} from "../share/consts";

class UserInfo {
    @observable userData: any = [];
    @observable errorData: any = null;

    @action
    getUserInfo = async () => {
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/profile`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log('getUserData res', res)
                this.userData = res;
            })
            .catch(error => {
                console.log('getUserData error', error);
                this.errorData = error;
            });
    };
}

const userInfo = new UserInfo();
export default userInfo;

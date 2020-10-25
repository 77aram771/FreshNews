import {action, observable} from 'mobx';

class AuthStore {
  @observable phone: string = '';
  @observable code: string = '';

  @action
  changePhone = (phone: string) => {
    this.phone = phone;
  };

  @action
  changeCode = (code: string) => {
    this.code = code;
  };
}

const authStore = new AuthStore();
export default authStore;

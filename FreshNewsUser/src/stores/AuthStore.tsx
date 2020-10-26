import {action, observable} from 'mobx';

class AuthStore {
  @observable isUser: boolean = false;

  @action
  getUser = (status: boolean) => {
    this.isUser = status;
  };

}

const authStore = new AuthStore();
export default authStore;

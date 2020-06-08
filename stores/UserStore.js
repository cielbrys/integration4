import { decorate, observable, action } from "mobx";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
  }
  empty() {
    this.users = [];
  }

}

decorate(UserStore, {
  users: observable,
  empty: action,
});

export default UserStore;


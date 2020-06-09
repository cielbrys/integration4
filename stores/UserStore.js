import { decorate, observable, action } from 'mobx';
import UserModel from '../models/UserModel';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
  }
  empty() {
    this.users = [];
  }

  createUser = (user) => {
    const newUser = new UserModel(user);
    if (newUser) {
      addUser(newUser);
    }
  };

  addUser = (user) => {
    this.users.push(user);
  };
}

decorate(UserStore, {
  users: observable,
  empty: action,
  addUser: action,
});

export default UserStore;

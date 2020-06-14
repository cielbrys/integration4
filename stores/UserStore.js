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
      this.addUser(newUser);
    }
  };

  updateUserFromServer(json) {
    let user = this.users.find((user) => user.id === json.id);
    if (!user) {
      user = new UserModel({
        id: json.id,
        store: this.rootStore.userStore,
      });
    }
    if (json.isDeleted) {
      this.users.remove(user);
    } else {
      user.updateFromJson(json);
    }
    return user;
  }

  addUser = (user) => {
    this.users.push(user);
  };
  resolveUser = (id) => this.users.find((user) => user.id === id);
}

decorate(UserStore, {
  users: observable,
  empty: action,
  addUser: action,
});

export default UserStore;

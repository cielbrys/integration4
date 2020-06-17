import { decorate, observable, action } from 'mobx';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
    this.usersService = new UserService({ firebase: this.rootStore.firebase });
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
        store: this.rootStore,
      });
    }
    if (json.isDeleted) {
      this.users.remove(user);
    } else {
      user.updateFromJson(json);
    }
    return user;
  }

  getUser(email) {
    const user = this.usersService.getUserByEmail(email);
    return user;
  }

  loadUser = async (email) => {
    const jsonUser = await this.usersService.getUserByEmail(email);
    console.log('json', jsonUser);
    return this.updateUserFromServer(jsonUser);
  };

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

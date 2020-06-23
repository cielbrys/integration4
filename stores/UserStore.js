import { decorate, observable, action } from 'mobx';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import { convertSpeed } from 'geolib';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
    this.usersService = new UserService({ firebase: this.rootStore.firebase });
  }
  empty() {
    this.users = [];
  }

  createUser = async (user) => {
    return await this.usersService.create(user);
  };

  setSystem = async (user) => {
    console.log('emailuser:', user.email);
    await this.usersService.setSystem(user.asJson);
  };

  loadUsersForUser = async (user) => {
    const r = await this.usersService.getUsersForUser(user.email);
    r.forEach(async (friend) => {
      this.addFriend(friend, user);
    });
  };

  addFriend = (friend, user) => {
    user.addNewFriend(friend);
  };

  toogleVisible = async (value, user) => {
    user.toggleVisible(value);
    await this.usersService.setVisible(user.asJson);
  };

  setNewFriend = async (newFriendMail, user) => {
    console.log('friend', newFriendMail);
    const r = await this.usersService.addNewFriend(newFriendMail, user.asJson);
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

  getUser = async (email) => {
    console.log('getEmail,', email);
    const user = await this.usersService.getUserByEmail(email);
    return user;
  };

  loadUser = async (email) => {
    const jsonUser = await this.usersService.getUserByEmail(email);
    console.log('json', jsonUser);
    return this.updateUserFromServer(jsonUser);
  };

  updateUsername = async (user) => {
    await this.usersService.setName(user);
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

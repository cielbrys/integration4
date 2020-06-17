import { decorate, observable, action } from 'mobx';
import AuthService from '../services/AuthService';

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.currentTrip = false;
    this.loggedIn = false;
    this.authService = new AuthService({
      firebase: this.rootStore.firebase,
      onAuthStateChanged: this.onAuthStateChanged,
    });
  }

  setCurrentUser = (user) => {
    this.currentUser = user;
  };

  setCurrentTrip = (status) => {
    this.currentTrip = status;
  }

  login = async (email, password) => {
    return await this.authService.login(email, password);
  };
  logout = async () => {
    return await this.authService.logout();
  };
  register = async (user) => {
    const result = await this.authService.register(user);
    user.id = result.uid;
    //
    const newUser = this.rootStore.userStore.updateUserFromServer(user);

    await this.rootStore.userStore.createUser(newUser.asJson);
  };

  onAuthStateChanged = async (data) => {
    if (data) {
      console.log('ingelogd');
      this.loggedIn = true;
      // const user = this.rootStore.userStore.updateUserFromServer(data);
      //this.setCurrentUser(user);
    } else {
      console.log('niet ingelogd');
      this.setCurrentUser(undefined);
      this.rootStore.tripStore.empty();
      this.rootStore.userStore.empty();
      this.rootStore.locationStore.empty();
    }
  };
}

decorate(UiStore, {
  currentUser: observable,
  currentTrip: observable,
  loggedIn: observable,
  updateUserFromServer: action,
  onAuthStateChanged: action,
  setCurrentUser: action,
  setCurrentTrip: action
});

export default UiStore;

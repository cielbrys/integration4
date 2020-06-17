import { decorate, observable, action } from 'mobx';
import AuthService from '../services/AuthService';

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.loggedIn = false;
    this.tripFeeling = '';
    this.authService = new AuthService({
      firebase: this.rootStore.firebase,
      onAuthStateChanged: this.onAuthStateChanged,
    });
  }

  setCurrentUser = (user) => {
    this.currentUser = user;
  };

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

  loggedInTrue() {
    this.loggedIn = true;
  }

  onAuthStateChanged = async (data) => {
    if (data) {
      console.log('ingelogd:');
      const userJson = await this.rootStore.userStore.getUser(data.email);
      console.log('userJson:',userJson)
      const user = this.rootStore.userStore.updateUserFromServer(userJson);
      this.setCurrentUser(user);
      await this.rootStore.tripStore.loadTripsForUser(this.currentUser);
      this.loggedInTrue();
    } else {
      console.log('niet ingelogd');
      this.setCurrentUser(undefined);
      this.rootStore.tripStore.empty();
      this.rootStore.userStore.empty();
      this.rootStore.locationStore.empty();
    }
  };

  setTripFeeling(feeling) {
    this.tripFeeling = feeling;
  }
}

decorate(UiStore, {
  currentUser: observable,
  loggedIn: observable,
  updateUserFromServer: action,
  onAuthStateChanged: action,
  setCurrentUser: action,
  loggedInTrue: action,
  tripFeeling: observable,
  setTripFeeling: action,
});

export default UiStore;

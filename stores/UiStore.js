import { decorate, observable, action } from 'mobx';
import AuthService from '../services/AuthService';

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.currentTrip = false;
    this.loggedIn = false;
    this.tripFeeling = '';
    this.endLocation = undefined;
    this.meetLocation = undefined;
    this.authService = new AuthService({
      firebase: this.rootStore.firebase,
      onAuthStateChanged: this.onAuthStateChanged,
    });
  }

  setEndLocation(cords) {
    this.endLocation = cords;
  }

  setMeetLocation(cords) {
    this.meetLocation = cords;
  }

  setCurrentUser = (user) => {
    this.currentUser = user;
  };

  setCurrentTrip = (status) => {
    this.currentTrip = status;
  };

  login = async (email, password) => {
    return await this.authService.login(email, password);
  };
  logout = async () => {
    return await this.authService.logout();
  };
  register = async (user) => {
    const r = await this.authService.register(user);
    return r;
  };

  onAuthStateChanged = async (data) => {
    if (data) {
      console.log('ingelogd:', data);
      const userJson = await this.rootStore.userStore.getUser(data.email);
      const user = this.rootStore.userStore.updateUserFromServer(userJson);
      await this.rootStore.tripStore.loadTripsForUser(user);
      await this.rootStore.userStore.loadUsersForUser(user);
      await this.rootStore.locationStore.loadLocationsForUser(user);
      this.setCurrentUser(user);
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
  currentTrip: observable,
  loggedIn: observable,
  updateUserFromServer: action,
  onAuthStateChanged: action,
  setCurrentUser: action,
  setCurrentTrip: action,
  loggedInTrue: action,
  tripFeeling: observable,
  meetLocation: observable,
  setMeetLocation: action,
  setTripFeeling: action,
});

export default UiStore;

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
    const result = await this.authService.register(user);
    console.log('r:', result);
    user.id = result.uid;
    //
    const newUser = this.rootStore.userStore.updateUserFromServer(user);
    console.log('user:', newUser);
    await this.rootStore.userStore.createUser(newUser.asJson);
  };

  loggedInTrue() {
    this.loggedIn = true;
  }

  onAuthStateChanged = async (data) => {
    if (data) {
      console.log('ingelogd:', data.email);
      const userJson = await this.rootStore.userStore.getUser(data.email);
      const user = await this.rootStore.userStore.updateUserFromServer(
        userJson
      );
      this.setCurrentUser(user);
      await this.rootStore.userStore.loadUsersForUser(this.currentUser);
      await this.rootStore.tripStore.loadTripsForUser(this.currentUser);
      await this.rootStore.locationStore.loadLocationsForUser(this.currentUser);
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

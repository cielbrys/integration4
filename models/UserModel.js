import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class UserModel {
  constructor({
    id = v4(),
    users = [],
    locations = [],
    trips = [],
    store,
    system = 'km',
    visible = false,
    ...json
  }) {
    this.id = id;
    this.trips = trips;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.system = system;
    this.rootStore = store;
    this.visible = visible;
    this.friends = [];
    this.updateFromJson(json);
    this.rootStore.userStore.addUser(this);
  }

  changeName(newName) {
    this.name = newName;
    this.updateUsername(this);
  }

  updateUsername = async (newName) => {
    this.rootStore.userStore.updateUsername(newName);
  };

  addFriend(friend) {
    this.friends.push(friend);
  }

  changeSystem(newSystem) {
    this.system = newSystem;
  }

  changeEmail(newEmail) {
    this.email = newEmail;
  }

  addTrip(trip) {
    this.trips.push(trip);
  }

  setSocials(url) {
    this.socials = url;
  }

  toggleVisible(value) {
    this.visible = value;
  }

  updateFromJson = (json) => {
    this.name = json.name !== undefined ? json.name : this.name;
    this.email = json.email !== undefined ? json.email : this.email;
    this.system = json.system !== undefined ? json.system : this.system;
    this.status = json.status !== undefined ? json.status : this.status;
    this.socials = json.socials !== undefined ? json.socials : this.socials;
    this.visible = json.visible !== undefined ? json.visible : this.visible;
  };

  addUser(user) {
    this.users.push(user);
  }
  addLocation(location) {
    this.locations.push(location);
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      socials: this.socials,
      system: this.system,
      status: this.status,
      visible: this.visible,
    };
  }
}

decorate(UserModel, {
  name: observable,
  system: observable,
  socials: observable,
  visible: observable,
  toggleVisible: action,
  changeSystem: action,
  setSocials: action,
  asJson: computed,
  updateFromJson: action,
  changeName: action,
});

export default UserModel;

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
    ...json
  }) {
    this.id = id;
    this.trips = trips;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.users = users;
    this.updateFromJson(json);
  }

  changeName(newName) {
    this.name = newName;
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

  updateFromJson = (json) => {
    this.name = json.name !== undefined ? json.name : this.name;
    this.email = json.email !== undefined ? json.email : this.email;
    this.system = json.system !== undefined ? json.system : this.system;
    this.status = json.status !== undefined ? json.status : this.status;
    this.socials = json.socials !== undefined ? json.socials : this.socials;
    if (json.trips !== undefined) {
      const oldGroups = this.trips.concat();
      oldGroups.forEach((trip) => trip.unlinkUser(this));
      trips.forEach((trip) => {
        this.store.rootStore.tripStore
          .updateGroupFromServer(trip)
          .linkUser(this);
      });
    }
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
    };
  }
}

decorate(UserModel, {
  name: observable,
  system: observable,
  socials: observable,
  changeSystem: action,
  setSocials: action,
});

export default UserModel;

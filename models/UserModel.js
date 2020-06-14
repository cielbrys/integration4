import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class UserModel {
  constructor({
    id = v4(),
    photos = [],
    users = [],
    name,
    email,
    van,
    locations = [],
    trips = [],
    store,
    status = undefined,
    socials,
    ...json
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.van = van;
    this.status = status;
    this.trips = trips;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.photos = photos;
    this.users = users;
    this.socials = socials;
  }

  changeName(newName) {
    this.name = newName;
  }

  changeEmail(newEmail) {
    this.email = newEmail;
  }

  addTrip(trip) {
    this.trips.push(trip);
  }

  addUser(user) {
    this.users.push(user);
  }
  addLocation(location) {
    this.locations.push(location);
  }
}

decorate(UserModel, {
  name: observable,
});

export default UserModel;

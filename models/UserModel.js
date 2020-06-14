import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class UserModel {
  constructor({
    id = v4(),
    photos = [],
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
    this.photos = photos;
    this.users = users;
    this.updateFromJson(json);
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

  updateFromJson = ({
    email = undefined,
    name = undefined,
    van = undefined,
    trips = undefined,
    status = undefined,
    socials = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.email = email !== undefined ? email : this.email;
    this.van = van !== undefined ? van : this.van;
    this.status = status !== undefined ? status : this.status;
    this.socials = socials !== undefined ? socials : this.socials;
    if (trips !== undefined) {
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
}

decorate(UserModel, {
  name: observable,
});

export default UserModel;

import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class UserModel {
  constructor({
    id = v4(),
    photos,
    users,
    name,
    van,
    locations,
    trips,
    store,
    ...json
  }) {
    this.id = id;
    this.name = name;
    this.van = van;
    this.trips = trips;
    this.locations = locations;
    this.store = store;
    this.photos = photos;
    this.users = users;
    this.socials = socials;
  }
}

decorate(UserModel, {
  name: observable,
});

export default UserModel;

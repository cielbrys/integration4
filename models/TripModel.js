import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class TripModel {
  constructor({
    id = v4(),
    time,
    distance,
    photos = [],
    users,
    user,
    name,
    locations = [],
    store,
    ...json
  }) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.distance = distance;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.photos = photos;
    this.user = user;
    this.users = [];
    this.user.addTrip(this)
  }

  addUsers = (user) => {
    this.users.push(user);
  };
}

decorate(TripModel, {
  name: observable,
  users: observable,
  addUsers: action,
});

export default TripModel;

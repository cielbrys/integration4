import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class TripModel {
  constructor({ id = v4(), time, distance, photos, users, name, ...json }) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.distance = distance;
    this.locations = locations;
    this.store = store;
    this.photos = photos;
    this.users = users;
  }
}

decorate(TripModel, {
  name: observable,
});

export default TripModel;

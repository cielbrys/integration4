import { v4 } from 'uuid';
import { decorate, observable, configure, action } from 'mobx';

configure({ enforceActions: `observed` });

class LocationModel {
  constructor({ id = v4(), tripId = '', cords, name, user, store, ...json }) {
    this.id = id;
    this.name = name;
    this.cords = cords;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.rootStore = store;
    this.user = user;
    this.tripId = tripId;
    this.rootStore.locationStore.addLocation(this);
  }

  changeName(newName) {
    this.name = newName;
  }

  setTripId(id) {
    this.tripId = id;
    console.log('id:', this.tripId);
  }
}

decorate(LocationModel, {
  name: observable,
  tripId: observable,
  setTripId: action,
  changeName: action,
});

export default LocationModel;

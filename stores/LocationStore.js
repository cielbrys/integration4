import { decorate, observable, action } from 'mobx';
import LocationModel from '../models/LocationModel';

class LocationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.locations = [];
  }
  empty() {
    this.locations = [];
  }

  createLocation = (location) => {
    const newLocation = new LocationModel(location);
    if (location) {
      addLocation(newLocation);
    }
  };

  addLocation(location) {
    this.locations.push(location);
  }

  resolveLocation = (id) => this.locations.find((location) => location.id === id);
}

decorate(LocationStore, {
  locations: observable,
  empty: action,
});

export default LocationStore;

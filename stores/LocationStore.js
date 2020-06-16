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
      this.addLocation(newLocation);
    }
  };

  addLocation(location) {
    this.locations.push(location);
  }

  getLocationsForTrip = (id) => {
    let locations = [];
    this.locations.map((location) => {
      if (location.tripId === id) {
        locations.push(location);
      }
    });
    return locations;
  };

  resolveLocation = (id) =>
    this.locations.find((location) => location.id === id);
}

decorate(LocationStore, {
  locations: observable,
  empty: action,
  addLocation: action,
});

export default LocationStore;

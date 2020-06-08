import { decorate, observable, action } from 'mobx';

class LocationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.locations = [];
  }
  empty() {
    this.locations = [];
  }
}

decorate(LocationStore, {
  locations: observable,
  empty: action,
});

export default LocationStore;

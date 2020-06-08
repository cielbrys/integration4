import { decorate, observable, action } from "mobx";


class TripStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.trips = [];
  }
  empty() {
    this.trips = [];
  }
}

decorate(TripStore, {
  trips: observable,
  empty: action,
});

export default TripStore;

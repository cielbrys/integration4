import { decorate, observable, action } from 'mobx';
import TripModel from '../models/TripModel';

class TripStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.trips = [];
  }
  empty() {
    this.trips = [];
  }

  createTrip = (trip) => {
    const newTrip = new TripModel(trip);
    if (newTrip) {
      this.addTrip(newTrip);
    }
  };

  addTrip = (trip) => {
    this.trips.push(trip);
  };

  resolveTrip = (id) => this.trips.find((trip) => trip.id === id);
}

decorate(TripStore, {
  trips: observable,
  empty: action,
});

export default TripStore;

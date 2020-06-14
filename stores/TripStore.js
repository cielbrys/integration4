import { decorate, observable, action, computed } from 'mobx';
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

  get distanceDone() {
    let distance = 0;
    this.trips.map((trip) => {
      distance = trip.distance + distance;
    });
    return distance;
  }

  get timeDone() {
    let time = 0;
    this.trips.map((trip) => {
      time = Number(trip.duration) + time;
    });
    return time;
  }

  resolveTrip = (id) => this.trips.find((trip) => trip.id === id);
}

decorate(TripStore, {
  trips: observable,
  empty: action,
  distanceDone: computed,
});

export default TripStore;

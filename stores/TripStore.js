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
      return newTrip
    }
  };

  addTrip = (trip) => {
    this.trips.push(trip);
  };

  updateUserFromServer(json) {
    let trip = this.trips.find((trip) => trip.id === json.id);
    if (!trip) {
      trip = new TripModel({
        id: json.id,
        store: this.rootStore.tripStore,
      });
    }
    if (json.isDeleted) {
      this.trips.remove(trip);
    } else {
      trip.updateFromJson(json);
    }
    return trip;
  }

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
  addTrip: action,
  distanceDone: computed,
});

export default TripStore;

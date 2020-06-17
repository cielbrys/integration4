import { decorate, observable, action, computed } from 'mobx';
import TripModel from '../models/TripModel';
import TripService from '../services/TripService';

class TripStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.trips = [];
    this.tripsService = new TripService({ firebase: this.rootStore.firebase });
  }
  empty() {
    this.trips = [];
  }

  createTrip = async (trip) => {
    const newTrip = await this.tripsService.create(trip.asJson);
    console.log(newTrip);
  };

  addTrip = (trip) => {
    this.trips.push(trip);
  };

  loadTripsForUser = async (user) => {
    return await this.tripsService.getTripsForUser(user.id, async (tripId) => {
      await this.loadTrip(tripId);
    });
  };

  loadTrip = async (id) => {
    const jsonTrip = await this.tripsService.getById(id);
    this.updateTripFromServer(jsonTrip);
    return this.resolveTrip(id);
  };

  updateTripFromServer(json) {
    let trip = this.trips.find((trip) => trip.id === json.id);
    if (!trip) {
      trip = new TripModel({
        id: json.id,
        store: this.rootStore,
        user: this.rootStore.uiStore.currentUser,
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
      distance = distance + Number(trip.distance);
    });
    return distance.toFixed(2);
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

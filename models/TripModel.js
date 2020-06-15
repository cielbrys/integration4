import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class TripModel {
  constructor({
    id = v4(),
    stopTime = '',
    distance = undefined,
    photos = [],
    locations = [],
    store,
    ...json
  }) {
    this.id = id;
    this.stopTime = stopTime;
    this.duration = undefined;
    this.distance = distance;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.photos = photos;
    this.updateFromJson(json);
    this.user.addTrip(this);
    this.durationTime();
  }

  addUsers = (user) => {
    this.users.push(user);
  };

  updateFromJson = (json) => {
    this.name = json.name !== undefined ? json.name : this.name;
    this.user = json.user !== undefined ? json.user : this.user;
    this.users = json.users !== undefined ? json.users : this.users;
    this.distance = json.distance !== undefined ? json.distance : this.distance;
    this.stopTime = json.stopTime !== undefined ? json.stopTime : this.stopTime;
    this.startTime = json.startTime !== undefined ? json.startTime : this.startTime;
  };

  setStopTime() {
    this.stopTime = new Date();
  }

  durationTime() {
    if (this.stopTime !== '') {
      const seconds = Math.abs(this.stopTime - this.startTime) / 1000;
      const hours = (seconds / 60 / 60).toFixed(1);
      console.log(seconds);
      this.duration = hours;
    }
  }
}

decorate(TripModel, {
  name: observable,
  users: observable,
  stopTime: observable,
  addUsers: action,
  setStopTime: action,
  durationTime: action,
  setStopTime: action,
});

export default TripModel;

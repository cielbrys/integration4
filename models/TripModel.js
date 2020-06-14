import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class TripModel {
  constructor({
    id = v4(),
    startTime,
    stopTime = '',
    distance,
    photos = [],
    users,
    user,
    name,
    locations = [],
    store,
    ...json
  }) {
    this.id = id;
    this.name = name;
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.duration = undefined;
    this.distance = distance;
    this.locations = locations;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.photos = photos;
    this.user = user;
    this.users = [];
    this.user.addTrip(this);
    this.durationTime();
  }

  addUsers = (user) => {
    this.users.push(user);
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

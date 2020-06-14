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

  updateFromJson = ({
    startTime = undefined,
    stopTime = undefined,
    distance = undefined,
    users = undefined,
    user = undefined,
    name = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.user = user !== undefined ? user : this.user;
    this.users = users !== undefined ? users : this.users;
    this.distance = distance !== undefined ? distance : this.distance;
    this.stopTime = stopTime !== undefined ? stopTime : this.stopTime;
    this.startTime = startTime !== undefined ? startTime : this.startTime;
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

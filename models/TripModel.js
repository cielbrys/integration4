import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';
import haversine from 'haversine';

configure({ enforceActions: `observed` });

class TripModel {
  constructor({
    id = v4(),
    stopTime = new Date(),
    distance = 0,
    store,
    ...json
  }) {
    this.id = id;
    this.stopTime = new Date(stopTime);
    this.distance = distance;
    if (!store) {
      throw Error('voorzie een store');
    }
    this.rootStore = store;
    this.updateFromJson(json);
    this.user.addTrip(this);
    this.durationTime();
    this.rootStore.tripStore.addTrip(this);
  }

  addUsers = (user) => {
    this.users.push(user);
  };

  updateFromJson = (json) => {
    this.name = json.name !== undefined ? json.name : this.name;
    this.user = json.user !== undefined ? json.user : this.user;
    this.users = json.users !== undefined ? json.users : this.users;
    this.distance = json.distance !== undefined ? json.distance : this.distance;
    this.duration = json.duration !== undefined ? json.duration : this.duration;
    this.startTime =
      json.startTime !== undefined ? new Date(json.startTime) : this.startTime;
  };

  stopTrip = () => {
    this.durationTime();
  };

  durationTime() {
    if (this.stopTime !== '') {
      const seconds = Math.abs(this.stopTime - this.startTime) / 1000;
      const hours = (seconds / 60 / 60).toFixed(1);
      console.log(seconds);
      this.duration = hours;
    }
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      userId: this.user.id,
      distance: this.distance,
      duration: this.duration,
      time: this.duration,
      users: 0,
    };
  }
}

decorate(TripModel, {
  updateFromJson: action,
  name: observable,
  distance: observable,
  stopTime: observable,
  addUsers: action,
  stopTrip: action,
  setDistance: action,
  setStopTime: action,
  durationTime: action,
  setStopTime: action,
  asJson: computed,
});

export default TripModel;

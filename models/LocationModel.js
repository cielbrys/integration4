import { v4 } from 'uuid';
import { decorate, observable, configure, action } from 'mobx';

configure({ enforceActions: `observed` });

class LocationModel {
  constructor({ id = v4(), user, store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.rootStore = store;
    this.user = user;
    this.cords = {};
    this.updateFromJson(json);
    this.rootStore.locationStore.addLocation(this);
  }

  changeName(newName) {
    this.name = newName;
  }

  updateFromJson = (json) => {
    console.log('jsonLoca', json);
    this.name = json.name !== undefined ? json.name : this.name;
    this.tripId = json.tripId !== undefined ? json.tripId : '';
    if (json.latitude) {
      this.cords = {
        latitude: json.latitude,
        longitude: json.longitude,
      };
    }
  };

  setTripId(id) {
    this.tripId = id;
    this.rootStore.locationStore.updateLocation(this);
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      latitude: this.cords.latitude,
      longitude: this.cords.longitude,
      userId: this.user.id,
      tripId: this.tripId,
    };
  }
}

decorate(LocationModel, {
  name: observable,
  tripId: observable,
  setTripId: action,
  cords: observable,
  changeName: action,
  updateFromJson: action,
});

export default LocationModel;

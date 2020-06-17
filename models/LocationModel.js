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
    this.updateFromJson(json);
    this.rootStore.locationStore.addLocation(this);
  }

  changeName(newName) {
    this.name = newName;
  }

  updateFromJson = (json) => {
    this.name = json.name !== undefined ? json.name : this.name;
    this.tripId = json.tripId !== undefined ? json.tripId : this.tripId;
    if (json.cords) {
      this.cords = {
        latitude: json.cords[0],
        longitude: json.cords[1],
      };
    }
  };

  setTripId(id) {
    this.tripId = id;
    console.log('id:', this.tripId);
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      cords: this.cords,
      userId: this.user.id,
      tripId: this.tripId,
    };
  }
}

decorate(LocationModel, {
  name: observable,
  tripId: observable,
  setTripId: action,
  changeName: action,
  updateFromJson: action,
});

export default LocationModel;

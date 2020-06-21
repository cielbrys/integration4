import { decorate, observable, action } from 'mobx';
import LocationModel from '../models/LocationModel';
import LocationService from '../services/LocationService';

class LocationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.locations = [];
    this.locationsService = new LocationService({
      firebase: this.rootStore.firebase,
    });
  }
  empty() {
    this.locations = [];
  }

  createLocation = (location) => {
    const newLocation = new LocationModel(location);
    if (location) {
      this.addLocation(newLocation);
    }
  };

  updateLocation = async (location) => {
    const updateLocation = await this.locationsService.update(location.asJson);
    console.log(updateLocation);
  };

  addNewLocation = async (location) => {
    const newLocation = await this.locationsService.create(location.asJson);
    console.log(newLocation);
  };

  loadLocationsForUser = async (user) => {
    return await this.locationsService.getLocationsForUser(
      user.id,
      async (locationId) => {
        await this.loadLocation(locationId);
      }
    );
  };

  loadLocation = async (id) => {
    const jsonLocation = await this.locationsService.getById(id);
    this.updateLocationFromServer(jsonLocation);
    return this.resolveLocation(id);
  };

  updateLocationFromServer(json) {
    let location = this.locations.find((location) => location.id === json.id);
    if (!location) {
      location = new LocationModel({
        id: json.id,
        store: this.rootStore,
        user: this.rootStore.uiStore.currentUser,
      });
    }
    if (json.isDeleted) {
      this.locations.remove(location);
    } else {
      location.updateFromJson(json);
    }
    return location;
  }

  addLocation(location) {
    this.locations.push(location);
  }

  getLocationsForTrip = (id) => {
    console.log(id);
    let locations = [];
    this.locations.map((location) => {
      if (location.tripId === id) {
        locations.push(location);
      }
    });
    return locations;
  };

  deleteLocation = async (location) => {
    await this.locationsService.delete(location.asJson);
    this.removeLocation(location);
  };

  removeLocation(location) {
    this.locations.remove(location);
  }

  resolveLocation = (id) =>
    this.locations.find((location) => location.id === id);
}

decorate(LocationStore, {
  locations: observable,
  empty: action,
  addLocation: action,
  removeLocation: action,
});

export default LocationStore;

import LocationStore from './LocationStore';
import UserStore from './UserStore';
import TripStore from './TripStore';
import UiStore from './UiStore';
import { decorate, computed } from 'mobx';

class RootStore {
  constructor() {
    this.locationStore = new LocationStore(this);
    this.userStore = new UserStore(this);
    this.tripStore = new TripStore(this);
    this.uiStore = new UiStore(this);
  }
}

decorate(RootStore, {
  unreadLength: computed,
});

export default RootStore;

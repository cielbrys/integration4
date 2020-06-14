import LocationStore from './LocationStore';
import UserStore from './UserStore';
import TripStore from './TripStore';
import UiStore from './UiStore';
import { decorate } from 'mobx';
import * as firebase from 'firebase/app';
import Constans from 'expo-constants';

class RootStore {
  constructor() {
    this.firebase = getFirebase();
    this.locationStore = new LocationStore(this);
    this.userStore = new UserStore(this);
    this.tripStore = new TripStore(this);
    this.uiStore = new UiStore(this);
  }
}

const getFirebase = () => {
  const config = {
    apiKey: Constans.manifest.extra.REACT_APP_apiKey,
    authDomain: Constans.manifest.extra.REACT_APP_authDomain,
    databaseURL: Constans.manifest.extra.REACT_APP_databaseURL,
    projectId: Constans.manifest.extra.REACT_APP_projectId,
    storageBucket: Constans.manifest.extra.REACT_APP_storageBucket,
    messagingSenderId: Constans.manifest.extra.REACT_APP_messagingSenderId,
    appId: Constans.manifest.extra.REACT_APP_appId,
  };

  // prevent multiple app inits
  return !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();
};

decorate(RootStore, {});

export default RootStore;

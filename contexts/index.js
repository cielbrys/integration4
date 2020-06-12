import { createContext } from 'react';
import RootStore from '../stores';
import UserModel from '../models/UserModel';

const store = new RootStore();

window.store = store;

const userJson = {
  store: store,
  name: 'ciel',
  email: 'ciel@gmail.com',
  van: 'VW',
  socials: {},
};

const user = new UserModel(userJson);
store.uiStore.setCurrentUser(user);

const trip = {
  name: 'test',
  time: 60,
  distance: 100,
  photos: {},
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

const trip2 = {
  name: 'Anotherone',
  time: 150,
  distance: 238,
  photos: {},
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

store.tripStore.createTrip(trip);
store.tripStore.createTrip(trip2);

export const storeContext = createContext(store);

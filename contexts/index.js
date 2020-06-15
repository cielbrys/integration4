import { createContext } from 'react';
import RootStore from '../stores';
import UserModel from '../models/UserModel';

const store = new RootStore();

window.store = store;

const userJson = {
  store: store,
  name: 'Ciel',
  email: 'ciel@gmail.com',
  van: 'VW',
  socials: {},
  status: 'beginner',
};

const user = new UserModel(userJson);
store.uiStore.setCurrentUser(user);

const fakeStartTime = new Date('June 12 2020 13:00');
const fakeStopTime = new Date('June 13 2020 13:00');
const fakeStopTime2 = new Date('June 13 2020 14:00');

const trip = {
  name: 'Trip to Blabla',
  startTime: fakeStartTime,
  stopTime: fakeStopTime,
  distance: 100,
  photos: {},
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

const trip2 = {
  name: 'Anotherone',
  startTime: fakeStartTime,
  distance: 238,
  stopTime: fakeStopTime2,
  photos: {},
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

store.tripStore.createTrip(trip);
store.tripStore.createTrip(trip2);

export const storeContext = createContext(store);

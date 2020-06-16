import { createContext } from 'react';
import RootStore from '../stores';
import UserModel from '../models/UserModel';
import TripModel from '../models/TripModel';

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
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

const trip2 = {
  name: 'Anotherone',
  startTime: fakeStartTime,
  distance: 238,
  stopTime: fakeStopTime2,
  user: store.uiStore.currentUser,
  locations: {},
  store: store,
};

new TripModel(trip)
new TripModel(trip2)

export const storeContext = createContext(store);

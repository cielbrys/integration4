import RootStore from './index';
import TripStore from './TripStore';
import UserModel from '../models/UserModel';

test('Create a new Trip', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const tripStore = new TripStore(store);
  const trip = {
    name: 'test',
    time: 60,
    distance: 100,
    photos: {},
    user: user,
    locations: {},
    store: store,
  };
  tripStore.createTrip(trip);
  expect(tripStore.trips.length).toBe(1);
});

test('Empty trips', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const tripStore = new TripStore(store);
  const trip = {
    name: 'test',
    time: 60,
    distance: 100,
    photos: {},
    user: user,
    locations: {},
    store: store,
  };
  tripStore.createTrip(trip);
  expect(tripStore.trips.length).toBe(1);
  tripStore.empty();
  expect(tripStore.trips.length).toBe(0);
});

test('Reslove trip', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const tripStore = new TripStore(store);
  const trip = {
    id: 123,
    name: 'test',
    time: 60,
    distance: 100,
    photos: {},
    user: user,
    locations: {},
    store: store,
  };
  tripStore.createTrip(trip);
  expect(tripStore.resolveTrip(123).id).toBe(123);
});

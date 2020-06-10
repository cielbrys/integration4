import RootStore from './index';
import TripStore from './TripStore';
import UserModel from '../models/UserModel';
import LocationStore from './LocationStore';

test('Create a new Location', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const locationStore = new LocationStore(store);
  const location = {
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  };
  locationStore.createLocation(location);
  expect(locationStore.locations.length).toBe(1);
});

test('Empty locations', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const locationStore = new LocationStore(store);
  const location = {
    id: 123,
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  };
  locationStore.createLocation(location);
  expect(locationStore.locations.length).toBe(1);
  locationStore.empty();
  expect(locationStore.locations.length).toBe(0);
});

test('Reslove location', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const locationStore = new LocationStore(store);
  const location = {
    id: 123,
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  };
  locationStore.createLocation(location);
  expect(locationStore.resolveLocation(123).id).toBe(123);
});

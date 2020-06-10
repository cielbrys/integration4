import RootStore from '../stores/index';
import UserModel from './UserModel';
import TripModel from './TripModel';
import LocationModel from './LocationModel';

test('Create a new user', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });

  expect(user.name).toBe('ciel');
  expect(user.van).toBe('VW');
  expect(user.locations.length).toBe(0);
});

test("Can't create a user without a store", () => {
  expect(
    () =>
      new UserModel({
        name: 'ciel',
        van: 'VW',
        socials: {},
      })
  ).toThrow('voorzie een store');
});

test('Change username', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  expect(user.name).toBe('ciel');
  user.changeName('Ciel2');
  expect(user.name).toBe('Ciel2');
});

test('Change email', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    email: 'ciel@gmail.com',
    van: 'VW',
    socials: {},
  });
  expect(user.email).toBe('ciel@gmail.com');
  user.changeEmail('ciel2@gmail.com');
  expect(user.email).toBe('ciel2@gmail.com');
});

test('add trip', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    email: 'ciel@gmail.com',
    van: 'VW',
    socials: {},
  });
  expect(user.trips.length).toBe(0);
  const trip = new TripModel({
    name: 'test',
    time: 60,
    distance: 100,
    user: user,
    store: store,
  });
  user.addTrip(trip);
  expect(user.trips.length).toBe(1);
});

test('add location', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    email: 'ciel@gmail.com',
    van: 'VW',
    socials: {},
  });
  expect(user.locations.length).toBe(0);
  const location = new LocationModel({
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  });
  user.addLocation(location);
  expect(user.locations.length).toBe(1);
});

test('add User', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    email: 'ciel@gmail.com',
    van: 'VW',
    socials: {},
  });
  expect(user.users.length).toBe(0);
  const user2 = new UserModel({
    store,
    name: 'Tuur',
    email: 'tuur@gmail.com',
    van: 'VW',
    socials: {},
  });
  user.addUser(user2);
  expect(user.users.length).toBe(1);
});

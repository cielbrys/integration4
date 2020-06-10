import RootStore from '../stores/index';
import TripModel from './TripModel';
import UserModel from './UserModel';

test('Create a new Trip', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });

  const trip = new TripModel({
    name: 'test',
    time: 60,
    distance: 100,
    photos: {},
    user: user,
    locations: {},
    store: store,
  });
  expect(trip.name).toBe('test');
  expect(trip.time).toBe(60);
  expect(trip.user.name).toBe('ciel');
});

test("Can't create a location without a store", () => {
  expect(() => new TripModel({ name: 'test' })).toThrow('voorzie een store');
});

test('Add user to trip', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });

  const user2 = new UserModel({
    store,
    name: 'Tuur',
    van: 'opel',
    email: 'tuur@gmail.com',
    socials: {},
  });

  const trip = new TripModel({
    name: 'test',
    time: 60,
    distance: 100,
    user: user,
    store: store,
  });
  trip.addUsers(user2);
  expect(trip.users.length).toBe(1);
});

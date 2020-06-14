import RootStore from './index';
import TripStore from './TripStore';
import UserModel from '../models/UserModel';
import UserStore from './UserStore';

test('Create a new User', () => {
  const store = new RootStore();
  const userStore = new UserStore(store);
  const user = {
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  };
  userStore.createUser(user);
  expect(userStore.users.length).toBe(1);
});

test('Empty users', () => {
  const store = new RootStore();
  const userStore = new UserStore(store);
  const user = {
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  };
  userStore.createUser(user);
  expect(userStore.users.length).toBe(1);
  userStore.empty();
  expect(userStore.users.length).toBe(0);
});

test('Reslove User', () => {
  const store = new RootStore();
  const userStore = new UserStore(store);
  const user = {
    store,
    id: 123,
    name: 'ciel',
    van: 'VW',
    socials: {},
  };
  userStore.createUser(user);
  expect(userStore.resolveUser(123).id).toBe(123);
});

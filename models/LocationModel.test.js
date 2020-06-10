import RootStore from '../stores/index';
import LocationModel from './LocationModel';
import UserModel from './UserModel';

test('Create a new LocationModel', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    email: 'cielbrys@gmail.com',
    van: 'VW',
    socials: {},
  });
  const location = new LocationModel({
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  });
  expect(location.name).toBe('test');
  expect(location.description).toBe('This is a test');
  expect(location.adress.x).toBe(51.8845);
  expect(location.adress.y).toBe(3.2554);
  expect(location.user.name).toBe('ciel');
});

test("Can't create a location without a store", () => {
  expect(() => new LocationModel({ name: 'test' })).toThrow(
    'voorzie een store'
  );
});
test('Change location name', () => {
  const store = new RootStore();
  const user = new UserModel({
    store,
    name: 'ciel',
    van: 'VW',
    socials: {},
  });
  const location = new LocationModel({
    name: 'test',
    description: 'This is a test',
    adress: { x: 51.8845, y: 3.2554 },
    store: store,
    user: user,
  });
  expect(location.name).toBe('test');
  location.changeName('newName');
  expect(location.name).toBe('newName');
});

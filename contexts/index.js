import { createContext } from 'react';
import RootStore from '../stores';
import UserModel from '../models/UserModel';
import TripModel from '../models/TripModel';
import LocationModel from '../models/LocationModel';

const store = new RootStore();

window.store = store;



export const storeContext = createContext(store);

import { v4 } from 'uuid';
import { decorate, observable, configure, action } from 'mobx';

configure({ enforceActions: `observed` });

class LocationModel {
  constructor({ id = v4(), description, adress, name, user, store, ...json }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.adress = adress;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.rootStore = store;
    this.user = user;
  }

  changeName(newName) {
    this.name = newName;
  }
}

decorate(LocationModel, {
  name: observable,
  changeName: action,
});

export default LocationModel;

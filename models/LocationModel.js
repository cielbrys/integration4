import { v4 } from 'uuid';
import { decorate, observable, action, computed, configure } from 'mobx';

configure({ enforceActions: `observed` });

class LocationModel {
  constructor({ id = v4(), time, description, adress, name, user, ...json }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.adress = adress;
    this.rootStore = store;
    this.user = user;
  }
}

decorate(LocationModel, {
  name: observable,
});

export default LocationModel;

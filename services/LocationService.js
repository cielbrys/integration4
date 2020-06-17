import 'firebase/firestore';

class LocationService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
    this.logOutActions = [];
  }

  logout() {
    this.logOutActions.forEach((unsub) => {
      unsub();
    });
    this.logOutActions = [];
  }

  getById = async (id) => {
    console.log(id);
    return (await this.db.collection('locations').doc(id).get()).data();
  };

  create = async (location) => {
    location.timestamp = firestore.Timestamp.fromDate(new Date());
    const locationRef = await this.db.collection('locations').doc(location.id);
    await locationRef.set(location);
    return location;
  };

  getLocationsForUser = async (userId, onLocationAdd) => {
    const r = await this.db
      .collectionGroup('locations')
      .where('userId', '==', userId);
    const unsub = r.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        console.log('change', change.type);
        if (change.type === 'added') {
          console.log('id', change.doc.ref.parent['CP']['segments'][6]);
          const locationId = change.doc.ref.parent['CP']['segments'][6];
          onLocationAdd(locationId);
        }
      });
    });
    this.logOutActions.push(unsub);
  };
}

export default LocationService;

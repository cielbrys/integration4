import 'firebase/firestore';

class TripService {
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

  getAll = async () => {
    const snapshot = await this.db.collection('trips').get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    console.log(id);
    return (await this.db.collection('trips').doc(id).get()).data();
  };

  create = async (trip) => {
    const tripRef = await this.db.collection('trips').doc(trip.id);
    await tripRef.set(trip);
    return trip;
  };

  getTripsForUser = async (userId, onGroupAdded) => {
    const r = await this.db
      .collectionGroup('trips')
      .where('userId', '==', userId);
    const unsub = r.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        console.log('change', change.type);
        if (change.type === 'added') {
          console.log('id', change.doc.ref.parent["CP"]["segments"][6]);
          const tripId = change.doc.ref.parent["CP"]["segments"][6];
          onGroupAdded(tripId);
        }
      });
    });
    this.logOutActions.push(unsub);
  };
}

export default TripService;

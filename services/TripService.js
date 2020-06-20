import 'firebase/firestore';
import { firestore } from 'firebase/app';

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

  getById = async (id) => {
    console.log(id);
    return (await this.db.collection('trips').doc(id).get()).data();
  };

  create = async (trip) => {
    trip.timestamp = firestore.Timestamp.fromDate(new Date());
    const tripRef = await this.db.collection('trips').doc(trip.id);
    await tripRef.set(trip);
    return trip;
  };

  delete = async (trip) => {
    const tripRef = await this.db.collection('trips').doc(trip.id);
    await tripRef.delete();
  };


  getTripsForUser = async (userId, onGroupAdded) => {
    const r = await this.db
      .collectionGroup('trips')
      .where('userId', '==', userId)
      .orderBy('timestamp');
    const unsub = r.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        console.log('change', change.type);
        console.log('id', change.doc.ref.id);
        if (change.type === 'added') {
          const tripId = change.doc.ref.id;
          onGroupAdded(tripId);
        }
      });
    });
    this.logOutActions.push(unsub);
  };
}

export default TripService;

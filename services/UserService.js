import 'firebase/firestore';

class UserService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  create = async (user) => {
    return await this.db.collection('users').doc(user.email).set(user);
  };

  addNewFriend = async (friendMail, user) => {
    const friend = await this.getUserByEmail(friendMail);
    if (!friend) {
      throw new Error(`User ${friendMail} does not exist`);
    }
    await this.db
      .collection('users')
      .doc(user.email)
      .collection('users')
      .doc(friend.email)
      .set({ email: friend.email });

    return friend;
  };

  setSystem = async (user) => {
    await this.db
      .collection('users')
      .doc(user.email)
      .update({ system: user.system });
  };

  setVisible = async (user) => {
    await this.db
      .collection('users')
      .doc(user.email)
      .update({ visible: user.visible });
  };

  getUserByEmail = async (email) => {
    const data = (await this.db.collection('users').doc(email).get()).data();
    console.log('data:', data);
    console.log(data);
    if (!data.id) {
      data.id = data.userId; // quick fix to make it compatible with koens db
    }
    console.log('user', email);
    return data;
  };

  getUsersForUser = async (user) => {
    const contacts = await this.db
      .collection('users')
      .doc(user.email)
      .collection('users')
      .get();
    return contacts.docs.map((u) => u.data());
  };

  getAll = async () => {
    const snapshot = await this.db.collection('users').get();
    return snapshot.docs
      .map((o) => o.data())
      .map((u) => {
        u.id = u.userId; // quick fix to make it compatible with koens db
        return u;
      });
  };
}

export default UserService;

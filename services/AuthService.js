import 'firebase/auth';

class AuthService {
  constructor({ firebase, onAuthStateChanged }) {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.auth.onAuthStateChanged((data) => {
      if (data) {
        data.id = data.uid;
        data.name = data.displayName;
      }
      onAuthStateChanged(data);
    });
  }

  login = async (email, password) => {
    const data = await this.auth.signInWithEmailAndPassword(email, password);
    return data;
  };

  logout = async () => {
    return await this.auth.signOut();
  };

  register = async ({ name, email, password, ...json }) => {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.db.collection('users').doc(userCredential.user.email).set({
      name: name,
      email: userCredential.user.email,
      id: userCredential.user.uid,
      system: json.system,
      visible: false,
      socials: json.socials,
      status: json.status,
    });

    return userCredential.user;
  };

  isRegistered = async (email) => {
    const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
    if (signInMethods.length > 0) {
      return true;
    }
    return false;
  };
}

export default AuthService;

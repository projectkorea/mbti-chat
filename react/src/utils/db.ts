import { db } from './myBase.js';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

function saveUser(userObj: User): void {
  const user = {
    createdAt: new Date(),
    uid: userObj.uid,
    name: userObj.displayName,
    photoUrl: userObj.photoURL,
    email: userObj.email,
  };

  addDoc(collection(db, 'user'), user);
}

export { saveUser };

import { db } from './myBase.js';

function saveUser(userObj) {
  const user = {
    createdAt: new Date(),
    uid: userObj.uid,
    name: userObj.displayName,
    photoUrl: userObj.photoURL,
    email: userObj.email,
  };

  db.collection('user').add(user);
}

export { saveUser };

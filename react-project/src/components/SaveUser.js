import { dbService } from "myBase";

function saveUser(userObj) {
  const user = {
    createdAt: new Date(),
    uid: userObj.uid,
    name: userObj.displayName,
    photoUrl: userObj.photoURL,
    email: userObj.email,
  };

  dbService.collection(`user`).add(user);
}

export default saveUser;

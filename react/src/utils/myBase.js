import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  runTransaction,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { mbtiArray } from 'utils/mbtiContent.js';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_ID,
  VITE_APP_ID,
  VITE_MEASURE_ID,
  VITE_KAKAO_APP_KEY_REST,
  VITE_NAVER_APP_CLIENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);

export const firebaseInstance = app;
export const authService = getAuth(app);
export const createUser = createUserWithEmailAndPassword.bind(this, authService);
export const signInEmail = signInWithEmailAndPassword.bind(this, authService);
export const signInAndRedirect = signInWithPopup.bind(this, authService);
export const GoogleProvider = GoogleAuthProvider;
export const FacebookProvider = FacebookAuthProvider;
export const db = getFirestore(app);
export const functionsService = getFunctions(app);
export const countService = app.firestore;

export { VITE_KAKAO_APP_KEY_REST, VITE_NAVER_APP_CLIENT_ID };

export const MyBase = (() => {
  const infoDocRef = doc(db, 'info', 'w7wZ15buqtjglLIpYMjx');

  const _getColRef = (colName) => {
    return collection(db, colName);
  }

  const _getRef = (ref) => {
    switch (ref) {
      case 'info':
        return infoDocRef;
      default:
        return null;
    }
  };

  const _getDocRef = (colName, docName) => {
    return doc(db, colName, docName);
  };

  const get = async (ref, key) => {
    const _ref = _getRef(ref);
    const snap = await getDoc(_ref);
    if (snap.exists()) {
      const value = snap.data();
      console.log('Document data:', value);
      return value[key];
    } else {
      console.log('No such document!');
    }
  };

  const increaseCount = async (docName, key) => {
    try {
      const _ref = _getDocRef('info', docName);
      await runTransaction(db, async (transaction) => {
        const infoDoc = await transaction.get(_ref);
        if (!infoDoc.exists()) {
          throw 'Document does not exist!';
        }

        const newValue = (infoDoc.data()[key] || 0) + 1;
        transaction.update(_ref, { [key]: newValue });
      });
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  };

  const getPf = () => {
    const { displayName, photoURL } = authService.currentUser;
    return { displayName, photoURL };
  };

  const updatePf = ({ displayName, photoURL }) => {
    updateProfile(authService.currentUser, {
      displayName,
      photoURL,
    });
  };

  const updateRealTime = async () => {
    const recentTime = Date.now() - 1000 * 60 * 60 * 24;

    for (const element of mbtiArray) {
      const q = query(collection(db, `mbti-chat-${element.type}`), where('createdAt', '>', recentTime));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size) {
        element.realTime = 'on';
      }
    }
  };

  async function _updateCount(element, docName) {
    const _ref = _getDocRef('info', docName);
    const snap = await getDoc(_ref);
    if (snap.exists()) {
      const result = snap.data();
      element[docName] = result[element.type] || 0
      console.log('Document data:', element.type, result[element.type]);
    } else {
      console.log('No such document!');
    }
  }

  const updateMbtiArray = async () => {
    try {
      for (const element of mbtiArray) {
        await _updateCount(element, 'msg');
        await _updateCount(element, 'people');
      }
    } catch (error) {
      console.error('Error updating counts from database:', error);
    }
  };

  const addChat = async (mbtiType, chatObj) => {
    try {
      const colRef = _getColRef(`mbti-chat-${mbtiType}`);
      
      // const { displayName } = authService.currentUser;
      // const element = mbtiArray.find((element) => element.type === displayName);

      await addDoc(colRef, chatObj);
      // await _updateCount(element, 'msg'); // 방 메세지 개수 업데이트
      console.log(`Chat object successfully added to mbti-chat-${mbtiType}`);
    } catch (error) {
      console.error('Error adding chat object:', error);
    }
  };

  const onChat = (mbtiType, limitNum, onUpdate) => {
    const colRef = _getColRef(`mbti-chat-${mbtiType}`);
    const chatQuery = query(colRef, orderBy('createdAt', 'desc'), limit(limitNum));

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (onUpdate) {
        onUpdate(chatArray);
      }
    });

    return unsubscribe;
  };

  const getPrevChat = async (mbtiType, docKey, onLimit, limitNum) => {
    const colRef = _getColRef(`mbti-chat-${mbtiType}`);

    const first = query(colRef, orderBy('createdAt', 'desc'), limit(onLimit));
    const documentSnapshots = await getDocs(first);

    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const next = query(colRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(limitNum));
    const nextSnapshots = await getDocs(next);

    const chatArray = nextSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return chatArray;
  };

  const getRoomDocCount = async (mbtiType) => {
    const colRef = _getColRef(`mbti-chat-${mbtiType}`);
    const snapshot = await getCountFromServer(colRef);
    const count = snapshot.data().count;
    return count;
  };

  const getFreeBoardInfo = async () => {
    const colRef = _getColRef('board');
    const first = query(colRef, orderBy('lastUpdatedAt', 'desc'), limit(10));

    const documentSnapshots = await getDocs(first);

    return documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  }
    //  db
      // .collection(`chat-room`)
      // .orderBy("createdAt", "desc")
      // .onSnapshot((snapshot) => {
      //   const roomArray = snapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...doc.data(),
      //   }));
      //   setRooms(roomArray);
      // });

  return {
    get,
    increaseCount,
    getPf,
    updatePf,
    updateRealTime,
    updateMbtiArray,
    addChat,
    onChat,
    getPrevChat,
    getRoomDocCount,
    getFreeBoardInfo,
  };
})();

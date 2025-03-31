import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  User
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
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { mbtiArray } from 'src/utils/mbtiContents';

// Add type definitions for Vite env variables
declare global {
  interface ImportMetaEnv {
    VITE_API_KEY: string;
    VITE_FIREBASE_ADMIN_AUTH_DOMAIN: string;
    VITE_FIREBASE_ADMIN_PROJECT_ID: string;
    VITE_FIREBASE_ADMIN_STORAGE_BUCKET: string;
    VITE_FIREBASE_ADMIN_MESSAGING_ID: string;
    VITE_FIREBASE_ADMIN_APP_ID: string;
    VITE_FIREBASE_ADMIN_MEASURE_ID: string;
    VITE_KAKAO_APP_KEY_REST: string;
    VITE_NAVER_APP_CLIENT_ID: string;
  }

  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

const {
  VITE_API_KEY,
  VITE_FIREBASE_ADMIN_AUTH_DOMAIN,
  VITE_FIREBASE_ADMIN_PROJECT_ID,
  VITE_FIREBASE_ADMIN_STORAGE_BUCKET,
  VITE_FIREBASE_ADMIN_MESSAGING_ID,
  VITE_FIREBASE_ADMIN_APP_ID,
  VITE_FIREBASE_ADMIN_MEASURE_ID,
  VITE_KAKAO_APP_KEY_REST,
  VITE_NAVER_APP_CLIENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_FIREBASE_ADMIN_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_ADMIN_PROJECT_ID,
  storageBucket: VITE_FIREBASE_ADMIN_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_ADMIN_MESSAGING_ID,
  appId: VITE_FIREBASE_ADMIN_APP_ID,
  measurementId: VITE_FIREBASE_ADMIN_MEASURE_ID,
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
export const countService = null as unknown; // Replacing with null but typed to avoid 'any' error

export { VITE_KAKAO_APP_KEY_REST, VITE_NAVER_APP_CLIENT_ID };

// Define interface for MBTI type
interface MbtiType {
  type: string;
  realTime?: string;
  [key: string]: string | number | undefined;
}

// Define interface for chat message
interface ChatMessage {
  id: string;
  createdAt: number;
  [key: string]: string | number | boolean | object | undefined;
}

export const FirebaseService = (() => {
  const infoDocRef = doc(db, 'info', 'w7wZ15buqtjglLIpYMjx');

  const getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => {
    return collection(db, collectionName);
  }

  const getSpecialRef = (refType: string) => {
    switch (refType) {
      case 'info':
        return infoDocRef;
      default:
        return null;
    }
  };

  const getDocumentRef = (collectionName: string, documentName: string) => {
    return doc(db, collectionName, documentName);
  };

  const getDocumentField = async (refType: string, fieldKey: string) => {
    const docRef = getSpecialRef(refType);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log('Document data:', data);
      return data[fieldKey];
    } else {
      console.log('No such document!');
      return null;
    }
  };

  const incrementCounter = async (documentName: string, fieldKey: string) => {
    try {
      const docRef = getDocumentRef('info', documentName);
      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(docRef);
        if (!document.exists()) {
          throw 'Document does not exist!';
        }

        const newValue = (document.data()[fieldKey] || 0) + 1;
        transaction.update(docRef, { [fieldKey]: newValue });
      });
      console.log('Transaction successfully committed!');
    } catch (error) {
      console.log('Transaction failed: ', error);
    }
  };

  const getUserProfile = () => {
    const { displayName, photoURL } = authService.currentUser as User;
    return { displayName, photoURL };
  };

  const updateUserProfile = ({ displayName, photoURL }: { displayName: string, photoURL: string }) => {
    updateProfile(authService.currentUser as User, {
      displayName,
      photoURL,
    });
  };

  const updateMbtiRealTimeStatus = async () => {
    const recentTime = Date.now() - 1000 * 60 * 60 * 24;

    for (const mbtiType of mbtiArray) {
      const q = query(
        collection(db, `mbti-chat-${mbtiType.type}`), 
        where('createdAt', '>', recentTime)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size) {
        mbtiType.realTime = 'on';
      }
    }
  };

  async function updateMbtiTypeCount(mbtiType: MbtiType, countType: string) {
    const docRef = getDocumentRef('info', countType);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const result = snapshot.data();
      mbtiType[countType] = result[mbtiType.type] || 0;
      console.log('Document data:', mbtiType.type, result[mbtiType.type]);
    } else {
      console.log('No such document!');
    }
  }

  const loadMbtiStatistics = async () => {
    try {
      for (const mbtiType of mbtiArray) {
        await updateMbtiTypeCount(mbtiType, 'msg');
        await updateMbtiTypeCount(mbtiType, 'people');
      }
    } catch (error) {
      console.error('Error updating counts from database:', error);
    }
  };

  const addChatMessage = async (mbtiType: string, chatData: DocumentData) => {
    try {
      const chatCollectionRef = getCollectionRef(`mbti-chat-${mbtiType}`);
      await addDoc(chatCollectionRef, chatData);
      console.log(`Chat message successfully added to mbti-chat-${mbtiType}`);
    } catch (error) {
      console.error('Error adding chat message:', error);
    }
  };

  const subscribeToChatMessages = (mbtiType: string, messageLimit: number, onUpdateCallback: (messages: ChatMessage[]) => void) => {
    const chatCollectionRef = getCollectionRef(`mbti-chat-${mbtiType}`);
    const chatQuery = query(
      chatCollectionRef, 
      orderBy('createdAt', 'desc'), 
      limit(messageLimit)
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatMessage[];
      
      if (onUpdateCallback) {
        onUpdateCallback(messages);
      }
    });

    return unsubscribe;
  };

  const fetchPreviousMessages = async (mbtiType: string, currentLimit: number, additionalLimit: number) => {
    const chatCollectionRef = getCollectionRef(`mbti-chat-${mbtiType}`);

    const firstQuery = query(
      chatCollectionRef, 
      orderBy('createdAt', 'desc'), 
      limit(currentLimit)
    );
    const firstQuerySnapshot = await getDocs(firstQuery);

    const lastVisibleMessage = firstQuerySnapshot.docs[firstQuerySnapshot.docs.length - 1];

    const nextQuery = query(
      chatCollectionRef, 
      orderBy('createdAt', 'desc'), 
      startAfter(lastVisibleMessage), 
      limit(additionalLimit)
    );
    const nextQuerySnapshot = await getDocs(nextQuery);

    return nextQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatMessage[];
  };

  const getChatRoomMessageCount = async (mbtiType: string) => {
    const chatCollectionRef = getCollectionRef(`mbti-chat-${mbtiType}`);
    const countSnapshot = await getCountFromServer(chatCollectionRef);
    return countSnapshot.data().count;
  };

  const getRecentBoardPosts = async () => {
    const boardCollectionRef = getCollectionRef('board');
    const recentPostsQuery = query(
      boardCollectionRef, 
      orderBy('lastUpdatedAt', 'desc'), 
      limit(10)
    );

    const querySnapshot = await getDocs(recentPostsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  return {
    getDocumentField,
    incrementCounter,
    getUserProfile,
    updateUserProfile,
    updateMbtiRealTimeStatus,
    loadMbtiStatistics,
    addChatMessage,
    subscribeToChatMessages,
    fetchPreviousMessages,
    getChatRoomMessageCount,
    getRecentBoardPosts,
  };
})();

export const MyBase = FirebaseService;

// useStore.js
import { create } from 'zustand';

interface RealTimeState {
  mbtiArray: string[];
  dbInit: boolean;
  realTimeInit: boolean;
  setMbtiArray: (mbtiArray: string[]) => void;
  setDbInit: (value: boolean) => void;
  setRealTimeInit: (value: boolean) => void;
}

const useRealTimeStore = create<RealTimeState>((set) => ({
  mbtiArray: [],
  dbInit: false,
  realTimeInit: false,
  setMbtiArray: (mbtiArray: string[]) => set({ mbtiArray }),
  setDbInit: (value: boolean) => set({ dbInit: value }),
  setRealTimeInit: (value: boolean) => set({ realTimeInit: value }),
}));

interface User {
  id?: string;
  name?: string;
  email?: string;
  mbti?: string;
  profileImage?: string;
}

interface UserState {
  initDone: boolean;
  setInitDone: (value: boolean) => void;
  user: User | null;
  isSignInWithEmail: boolean;
  setUser: (user: User) => void;
  setIsSignInWithEmail: (value: boolean) => void;
  typeChoose: boolean;
  setTypeChoose: (value: boolean) => void;
  canMakeRoom: boolean;
  setCanMakeRoom: (value: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  initDone: false,
  setInitDone: (value: boolean) => set({ initDone: value }),
  user: null,
  isSignInWithEmail: false,
  setUser: (user: User) => {
    set({ user })
    localStorage.setItem("user", JSON.stringify(user));
  },
  setIsSignInWithEmail: (value: boolean) => set({ isSignInWithEmail: value }),
  typeChoose: false,
  setTypeChoose: (value: boolean) => set({ typeChoose: value }),
  canMakeRoom: false,
  setCanMakeRoom: (value: boolean) => set({ canMakeRoom: value }),
}));


export { useUserStore, useRealTimeStore };
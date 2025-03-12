// useStore.js
import { create } from 'zustand';

const useRealTimeStore = create((set) => ({
  mbtiArray: [], // mbtiArray 상태 추가
  dbInit: false, // dbInit 상태 추가
  realTimeInit: false, // realTimeInit 상태 추가
  setMbtiArray: (mbtiArray) => set({ mbtiArray }), // mbtiArray 상태를 업데이트하는 함수 추가
  setDbInit: (value) => set({ dbInit: value }), // dbInit 상태를 업데이트하는 함수 추가
  setRealTimeInit: (value) => set({ realTimeInit: value }), // realTimeInit 상태를 업데이트하는 함수 추가
}));

// const useAuthStore = create((set) => ({
// }));

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const useUserStore = create((set) => ({
  initDone: false,
  setInitDone: (value) => set({ initDone: value }),
  user: null,
  isSignInWithEmail: false,
  setUser: (user) => {
    set({ user })
    localStorage.setItem("user", JSON.stringify(user));
  },
  setIsSignInWithEmail: (value) => set({ isSignInWithEmail: value }),
  typeChoose: false,
  setTypeChoose: (value) => set({ typeChoose: value }),
  canMakeRoom: false,
  setCanMakeRoom: (value) => set({ canMakeRoom: value }),
}));


export { useUserStore, useBearStore, useRealTimeStore };
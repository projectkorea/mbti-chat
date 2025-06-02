import { useEffect } from "react";
import { authService } from "utils/myBase.js";
import {
  checkType,
  checkFromEmailLogin,
} from "utils/authService.js";
import { useUserStore } from "store/useStore.js";
import { User } from "firebase/auth";

const useUserAuth = (): null => {
  const { setUser, setIsSignInWithEmail, setTypeChoose, setCanMakeRoom } = useUserStore();

  useEffect(() => {
    authService.onAuthStateChanged((authUser: User | null) => {
      if (authUser) {
        setUser(authUser);
        const signInWithEmail = checkFromEmailLogin(authUser);
        const typeChosen = checkType(authUser);

        setIsSignInWithEmail(signInWithEmail);
        setTypeChoose(typeChosen);
      } else {
        setUser(null);
        setIsSignInWithEmail(false);
        setTypeChoose(false);
        setCanMakeRoom(false);
      }
    });
  }, []);
  return null;
};

export default useUserAuth;

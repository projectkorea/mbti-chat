import { useEffect } from "react";
import { authService } from "utils/myBase.js";
import {
  checkType,
  checkCanMakeRoom,
  checkFromEmailLogin,
} from "utils/authService.js";
import { useUserStore } from "store/useStore.js";

const useUserAuth = () => {
  const { setUser, setIsSignInWithEmail, setTypeChoose, setCanMakeRoom } = useUserStore();

  useEffect(() => {
    authService.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        const signInWithEmail = checkFromEmailLogin(authUser);
        const typeChosen = checkType(authUser);
        // const roomCreationAllowed = checkCanMakeRoom(authUser);

        setIsSignInWithEmail(signInWithEmail);
        setTypeChoose(typeChosen);
        // setCanMakeRoom(roomCreationAllowed);
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

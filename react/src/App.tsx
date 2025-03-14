import Router from "routes/Router.jsx";
import useUserAuth from "hooks/useUserAuth.jsx";
import useMbtiArray from "hooks/useMbtiArray.jsx";
import Loading from "components/common/Loading.jsx";
import { useUserStore } from "store/useStore.js";

function App() {
  const { initDone } = useUserStore();

  useUserAuth();
  useMbtiArray();

  return initDone ? <Router /> : <Loading />;
}

export default App;

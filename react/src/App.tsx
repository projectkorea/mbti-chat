import Router from "routes/Router.jsx";
import useUserAuth from "hooks/useUserAuth";
import useMbtiArray from "hooks/useMbtiArray";
import Loading from "components/common/Loading.jsx";
import { useUserStore } from "store/useStore";

function App() {
  const { initDone } = useUserStore();

  useUserAuth();
  useMbtiArray();

  return initDone ? <Router /> : <Loading />;
}

export default App;

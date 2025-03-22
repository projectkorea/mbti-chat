import Router from "routes/Router.jsx";
import useUserAuth from "hooks/useUserAuth";
import useInitializeMbtiData from "src/hooks/useInitializeMbtiData";
import Loading from "components/common/Loading.jsx";
import { useUserStore } from "store/useStore";

function App() {
  const { initDone } = useUserStore();

  useUserAuth();
  useInitializeMbtiData();

  return initDone ? <Router /> : <Loading />;
}

export default App;

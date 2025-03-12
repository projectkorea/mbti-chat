import { useEffect } from "react";
import { MyBase } from "../utils/myBase.js";
import { useUserStore } from "../store/useStore.js";

const useMbtiArray = () => {
  const { setInitDone } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      await MyBase.updateMbtiArray();
      await MyBase.updateRealTime();
      setInitDone(true);
    };

    fetchData();
  }, [setInitDone]);
};

export default useMbtiArray;

import { useEffect } from "react";
import { MyBase } from "utils/myBase.js";
import { useUserStore } from "store/useStore.js";

const useInitializeMbtiData = () => {
  const { setInitDone } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      await MyBase.loadMbtiStatistics();
      await MyBase.updateMbtiRealTimeStatus();
      setInitDone(true);
    };

    fetchData();
  }, [setInitDone]);
};

export default useInitializeMbtiData;

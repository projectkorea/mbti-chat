import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useTitleAndColName = () => {
  const location = useLocation();
  const [title, setTitle] = useState("전체");
  const [colName, setColName] = useState("all");

  useEffect(() => {
    const url = location.pathname;
    const pathSegment = url.substring(url.lastIndexOf("/") + 1);
    const newColName = pathSegment === "chat" ? "all" : pathSegment;
    let newTitle = "전체";

    if (pathSegment !== "chat") {
      if (pathSegment.length > 5) {
        newTitle = location.state?.title || ""; // location.state가 없는 경우를 대비하여 기본값 설정
      } else {
        newTitle = pathSegment.toUpperCase();
      }
    }

    setTitle(newTitle);
    setColName(newColName);
  }, [location]);

  return { title, colName };
};

export default useTitleAndColName;

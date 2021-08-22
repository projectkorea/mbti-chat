import { mbtiArray } from "contents";
import { dbService } from "myBase";

function Admin() {
  const resetBtn = () => {
    mbtiArray.map((element) => {
      const msgNumber = element.type + "-msg";
      const peopleNumber = element.type + "-people";
      dbService
        .collection("info")
        .doc("w7wZ15buqtjglLIpYMjx")
        .update({
          [msgNumber]: 0,
          [peopleNumber]: 0,
        });
    });
  };

  return <button onClick={resetBtn}>DB 리셋하기</button>;
}

export default Admin;

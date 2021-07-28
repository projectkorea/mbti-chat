import Router from "components/Router";
import { authService } from "myBase";
import { useEffect, useState } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        console.log("USEEFFECT 작동: user가 있다.");
      }
      setInit(true);
      console.log("USEEFFECT 작동: 초기화했다.");
    });
  }, []);

  return (
    <>
      {console.log("APP랜더링")}
      {init ? (
        <Router isLoggedin={Boolean(userObj)} setUserObj={setUserObj} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default App;

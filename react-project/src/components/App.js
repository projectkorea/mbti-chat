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
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {console.log(userObj)}
      {init ? (
        <Router
          isLoggedin={Boolean(userObj)}
          setUserObj={setUserObj}
          userObj={userObj}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default App;

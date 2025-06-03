import { useContext, useEffect, useState } from "react";
import "./App.css";
// import Landing from "./pages/Landing/Landing";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { useNavigate } from "react-router-dom";

function App() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
        navigate("/signup");
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
      return authUser;
    });
  }, [dispatch]);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;

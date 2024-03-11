import { Route, Routes, useNavigate } from "react-router-dom";
import "./mainRoute.css";
import { useEffect } from "react";
import Page404 from "../../pages/page404/page404";
import store from "../../../redux/store";
import LogIn from "../../pages/logIn/logIn";
import Home from "../../pages/Home/Home";
import Settings from "../../pages/settings/settings";
import Practice from "../../pages/Practice/Practice";
import MyWords from "../../pages/myWords/myWords";
import Info from "../../pages/info/info";

function MainRoute(): JSX.Element {
  const nav = useNavigate();
  useEffect(() => {
    !store.getState().users.user[0]?.id && nav("/login");
  }, [nav]);
  store.subscribe(() => {
    !store.getState().users.user[0]?.id && nav("/login");
  });
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/myWords/:id" element={<MyWords />} />
        <Route path="/info" element={<Info />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;

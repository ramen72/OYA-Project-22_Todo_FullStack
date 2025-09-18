import "./assets/css/tailwind.css";
import api from "./api";
import { Routes, Route } from "react-router";
import { useEffect } from "react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  // useEffect(() => {
  //   api.get(`/users`).then((data) => {
  //     // console.log(data.data);
  //   });
  // });
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/verify/:token`} element={<VerifyEmail />} />
        <Route path={`/forgot-password/:token`} element={<ForgotPassword />} />
        <Route path={`/reset/:token`} element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;

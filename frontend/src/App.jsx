import "./assets/css/tailwind.css";
import { Routes, Route } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Registration />} /> */}
        <Route element={<CommonLayout />}>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/verify/:token`} element={<VerifyEmail />} />
          <Route path={`/forgot-password`} element={<ForgotPassword />} />
          <Route path={`/reset-password/:token`} element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

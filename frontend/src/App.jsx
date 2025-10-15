import "./assets/css/tailwind.css";
import { Routes, Route } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CommonLayout from "./components/layout/CommonLayout";
import HomePage from "./pages/HomePage";
import CreateTodoPage from "./pages/CreateTodoPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={`*`} element={<ErrorPage />} />
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/verify/:token`} element={<VerifyEmail />} />
          <Route path={`/forgot-password`} element={<ForgotPassword />} />
          <Route path={`/reset-password/:token`} element={<ResetPassword />} />
          <Route path={`/create-todo`} element={<CreateTodoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import GeneratePassword from "./pages/GeneratePassword";
import ListUsersPage from "./pages/ListUsersPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
      <Route path="/reset-password" element={<ResetPasswordPage />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/generate-password" element={<GeneratePassword />}/>
      <Route path="/list-users" element={<ListUsersPage />}/>

      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default App;

import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { Radar } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("User: ", authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Radar className="size-40 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
        ></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Radar, User } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { selectedTheme } = useThemeStore();

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
    <div data-theme={selectedTheme}>
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

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;

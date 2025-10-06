import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { axiosInstance } from "./lib/axios";

const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;

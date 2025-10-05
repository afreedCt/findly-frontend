import React, { use, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import "./bootstrap.min.zephyr.css";
import ViewPost from "./components/ViewPost";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AllPosts from "./components/AllPosts";
import Account from "./components/Account";
import MyClaims from "./components/MyClaims";
import Messages from "./components/Messages";
import AdminAllPosts from "./components/AdminAllPosts";
import Donation from "./pages/Donation";
import AllUsers from "./components/AllUsers";
import MyPosts from "./pages/MyPosts";
import MatchPosts from "./pages/MatchPosts";
import Footer from "./components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";
import AdminAllClaims from "./components/AdminAllClaims";
import AllReports from "./pages/AllReports";
import Dashboard from "./components/Dashboard";
import { useContext } from "react";
import { userContext } from "./context/ContextAPI";
import dotenv from 'dotenv'

// dotenv.config()
// import CreatePost from "./components/CreatePost";
const App = () => {
  const { user } = useContext(userContext);
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  // console.log(process.env.REACT_APP_RAZORPAY_KEY)
  // console.log(razorpayKey)

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        theme="colored"
        draggable
      />{" "}
      <Routes>
        <Route
          path={"/"}
          element={
            user?.role == "admin" ? (
              <Navigate to={"/admin-dashboard"} />
            ) : user?.role == "user" ? (
              <UserDashboard />
            ) : (
              <Home />
            )
          }
        />
        {/* <Route path={'/login'}  element={!user?<AuthPage isLogin/>:<UserDashboard/>}/> */}
        <Route path={"/login"} element={<AuthPage isLogin />} />
        <Route
          path={"/register"}
          element={!user ? <AuthPage /> : <UserDashboard />}
        />
        <Route
          path={"/view-post/:id"}
          element={
            user && user.role == "user" ? (
              <ViewPost />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/user-dashboard"}
          element={
            user && user.role == "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin-dashboard"}
          element={
            user && user.role == "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/all-posts"}
          element={
            user && user.role == "user" ? (
              <AllPosts />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/account"}
          element={user ? <Account /> : <AuthPage isLogin />}
        />
        <Route
          path={"/claims"}
          element={
            user && user.role == "user" ? (
              <MyClaims />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/messages"}
          element={
            user && user.role == "user" ? (
              <Messages />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin/all-posts"}
          element={
            user && user.role == "admin" ? (
              <AdminAllPosts />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/donation"}
          element={
            user && user.role == "user" ? (
              <Donation />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin/all-users"}
          element={
            user && user.role == "admin" ? (
              <AllUsers />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/my-posts"}
          element={
            user && user?.role == "user" ? (
              <MyPosts />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/match-posts/:id"}
          element={
            user && user?.role == "user" ? (
              <MatchPosts />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin/all-claims"}
          element={
            user && user?.role == "admin" ? (
              <AdminAllClaims />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin/all-reports"}
          element={
            user && user?.role == "admin" ? (
              <AllReports />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path={"/admin/dashboard"}
          element={
            user && user?.role == "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

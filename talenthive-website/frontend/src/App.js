import React, { useEffect } from "react";
import { Routes, Route, useLocation, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./pages";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Search from "./pages/Search";
import HireTalent from "./pages/HireTalent";
import ProfileAccount from "./pages/ProfileAccount";
import ProfileDashboard from "./pages/ProfileDashboard";
import EditProfile from "./pages/EditProfile";
import JobDetail from "./pages/JobDetail";
import JobsApplied from "./pages/JobsApplied";
import ManageWorkers from "./pages/ManageWorkers";
import ManageEmployers from "./pages/ManageEmployers";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/hire-talent",
        element: <HireTalent />,
      },
      {
        path: "/profile",
        children: [
          {
            path: "account",
            element: <ProfileAccount />,
          },
          {
            path: "dashboard",
            element: <ProfileDashboard />,
          },
          {
            path: "edit",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/jobs",
        children: [
          {
            path: "detail",
            element: <JobDetail />,
          },
          {
            path: "apply",
            element: <JobsApplied />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "workers",
            element: <ManageWorkers />,
          },
          {
            path: "employers",
            element: <ManageEmployers />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

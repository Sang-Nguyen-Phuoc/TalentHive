import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Home, { homePageLoader } from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Search from "./pages/Search";
import HireTalent from "./pages/HireTalent";
import ProfileAccount from "./pages/ProfileAccount";
import ProfileDashboard from "./pages/ProfileDashboard";
import JobDetail from "./pages/JobDetail";
import JobsApplied from "./pages/JobsApplied";
import ManageWorkers from "./pages/ManageWorkers";
import ManageEmployers from "./pages/ManageEmployers";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
        loader: homePageLoader,
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
        path: "/dashboard/jobs",
        element: <HireTalent />,
      },
      {
        path: "/profile",
        element: <Navigate to="account" />,
        children: [
          {
            path: "account",
            element: <ProfileAccount />,
          },
          {
            path: "dashboard",
            element: <ProfileDashboard />,
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
        path: "/admin",
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
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

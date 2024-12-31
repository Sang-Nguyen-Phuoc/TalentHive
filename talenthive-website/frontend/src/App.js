import React from "react";
import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SearchPage from "./pages/Search";
import HireTalent, { HireTalentLoader } from "./pages/HireTalent";
import ProfileAccount, { changePasswordAction, profileLoader } from "./pages/ProfileAccount";
import ProfileDashboard, { profileDashboardLoader } from "./pages/ProfileDashboard";
import JobDetail, { jobDetailLoader } from "./pages/JobDetail";
import ManageWorkers, { candidateListLoader } from "./pages/ManageWorkers/ManageWorkers";
import ManageEmployers, { employerListLoader } from "./pages/ManageEmployers/ManageEmployers";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import CompanyAccess from "./pages/CompanyAccess/CompanyAccess";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import JobsApplied, { appliedJobsLoader } from "./pages/JobsApplied/AppliedJobsPage";
import EmployerDashboard, { employerDashboardLoader } from "./pages/ProfileDashboard/EmployerDashboard";
import CandidateDashboard, { candidateDashboardLoader } from "./pages/ProfileDashboard/CandidateDashboard";
import JobApplications, { applicationLoader } from "./pages/JobApplications";
import ApplicationDetail, { applicationDetailLoader, appliedJobDetailLoader } from "./pages/JobsApplied/ApplicationDetail";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import EnterCompanyAccessingCode from "./pages/CompanyAccess/EnterCompanyAccessingCode";

const RedirectToProfile = () => {
    const { user } = useUser(); // Lấy id từ context
    const navigate = useNavigate();

    useEffect(() => {
        if (user?._id) {
            navigate(`/profile/${user._id}`); // Điều hướng đến profile với id của user
        }
    }, [user, navigate]);

    return null; // Không cần render UI
};

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        path: "/",
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
            {
                path: "/hire-talent",
                element: <HireTalent />,
                loader: HireTalentLoader,
            },
            {
                path: "/applied-jobs",
                element: <JobsApplied />,
                loader: appliedJobsLoader,
                children: [
                    {
                      path: "application/:id",
                      element: <ApplicationDetail />,
                      loader: appliedJobDetailLoader,
                    }
                ]
            },
            {
                path: "/employer/:id/dashboard",
                element: <EmployerDashboard />,
                loader: employerDashboardLoader,
            },
            {
                path: "/candidate/:id/dashboard",
                element: <CandidateDashboard />,
                loader: candidateDashboardLoader,
            },
            {
                path: "/profile/me",
                element: <RedirectToProfile />,
            },
            {
                path: "/profile/:id",
                children: [
                    {
                        path: "dashboard",
                        element: <ProfileDashboard />,
                        loader: profileDashboardLoader,
                    },
                    {
                        index: true,
                        element: <ProfileAccount />,
                        loader: profileLoader,
                    },
                    {
                        path: "change-password",
                        action: changePasswordAction,
                    },
                ],
            },
            {
                path: "/jobs",
                children: [
                    {
                        path: ":id/applications",
                        element: <JobApplications />,
                        loader: applicationLoader,
                    },
                    {
                        path: ":id",
                        element: <JobDetail />,
                        loader: jobDetailLoader,
                    },
                    {
                        path: "apply",
                        element: <JobsApplied />,
                    },
                ],
            },
        ],
    },
    {
        path: "/admin",
        element:   <AdminLayout />,
        children: [
            {
                path: "manage-candidates",
                element: <ManageWorkers />,
                loader: candidateListLoader,
                children: [
                    {
                        path: ":id",
                        element: <CandidateDashboard />,
                        loader: candidateDashboardLoader,
                    }
                ]
            },
            {
                path: "manage-employers",
                element: <ManageEmployers />,
                loader: employerListLoader,
                children: [
                    {
                        path: ":id",
                        element: <EmployerDashboard />,
                        loader: employerDashboardLoader,
                    }
                ]
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
                path: "/create-employer-profile",
                element: <CreateProfile />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/create-company-access",
                element: <CompanyAccess />,
            },
            {
                path: "/join-an-existing-company",
                element: <EnterCompanyAccessingCode />,
            }
        ],
    },
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;

// General
import Home from "./Home";
import AboutUs from "./AboutUs";
import Search from "./Search";

// Authentication
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

// User UI
import ProfileAccount from "./ProfileAccount";
import ProfileDashboard from "./ProfileDashboard";
import EditProfile from "./EditProfile";
import JobDetail from "./JobDetail";

// Employer UI
import HireTalent from "./HireTalent";

// Worker UI
import JobsApplied from "./JobsApplied";

// Admin UI
import ManageEmployers from "./ManageEmployers";
import ManageWorkers from "./ManageWorkers";


// Export for use
const routes = [
    { path: '/', conponent: Home , layout : null},
    { path: '/aboutus', conponent: AboutUs , layout : null},
    { path: '/search', conponent: Search , layout : null},

    { path: '/login', conponent: Login , layout : null},
    { path: '/signup', conponent: SignUp , layout : null},
    { path: '/forgot-password', conponent: ForgotPassword , layout : null},

    { path: '/profile-account', conponent: ProfileAccount , layout : null},
    { path: '/profile-dashboard', conponent: ProfileDashboard , layout : null},
    { path: '/edit-profile', conponent: EditProfile , layout : null},
    { path: '/jobdetail', conponent: JobDetail , layout : null},

    { path: '/hiretalent', conponent: HireTalent , layout : null},

    { path: '/jobsapplied', conponent: JobsApplied , layout : null},

    { path: '/ManageWorkers', conponent: ManageWorkers , layout : null},
    { path: '/manageemployers', conponent: ManageEmployers , layout : null},
]

export default routes
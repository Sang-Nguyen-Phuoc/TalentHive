// General
import Home from "./Home";
import AboutUs from "./AboutUs";
import Search from "./Search";

// Authentication
import Signin from "./Signin";
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
    { path: '/', conponent: Home },
    { path: '/about-us', conponent: AboutUs },
    { path: '/search', conponent: Search },

    { path: '/signin', conponent: Signin },
    { path: '/signup', conponent: SignUp },
    { path: '/forgot-password', conponent: ForgotPassword },

    { path: '/profile-account', conponent: ProfileAccount },
    { path: '/profile-dashboard', conponent: ProfileDashboard },
    { path: '/edit-profile', conponent: EditProfile },
    { path: '/job-detail', conponent: JobDetail },

    { path: '/hire-talent', conponent: HireTalent },

    { path: '/jobs-applied', conponent: JobsApplied },

    { path: '/manage-workers', conponent: ManageWorkers },
    { path: '/manage-employers', conponent: ManageEmployers },
]

export default routes
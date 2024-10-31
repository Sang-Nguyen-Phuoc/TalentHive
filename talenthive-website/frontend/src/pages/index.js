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
    { path: '/', component: Home },
    { path: '/about-us', component: AboutUs },
    { path: '/search', component: Search },

    { path: '/signin', component: Signin },
    { path: '/signup', component: SignUp },
    { path: '/forgot-password', component: ForgotPassword },

    { path: '/profile-account', component: ProfileAccount },
    { path: '/profile-dashboard', component: ProfileDashboard },
    { path: '/edit-profile', component: EditProfile },
    { path: '/job-detail', component: JobDetail },

    { path: '/hire-talent', component: HireTalent },

    { path: '/jobs-applied', component: JobsApplied },

    { path: '/manage-workers', component: ManageWorkers },
    { path: '/manage-employers', component: ManageEmployers },
]

export default routes
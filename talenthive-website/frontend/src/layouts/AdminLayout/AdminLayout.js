import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import ProgressBar from "../../components/LoadingProgressBar/ProgressBar";


const AdminLayout = () => {
    return (
        <div className="">
            <ProgressBar />
            <div style={{ backgroundImage: "linear-gradient(to right, var(--primary-color), #1a4a81)"}}>
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
}

export default AdminLayout;
import { Outlet } from "react-router";
import Logo from "../../components/Logo";

const AuthenticationLayout = () => {
    return (
        <div className="container mb-5">
            <Logo />
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
 
export default AuthenticationLayout;
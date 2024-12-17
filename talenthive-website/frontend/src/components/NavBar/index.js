import { useNavigate, Link } from "react-router-dom";
import { removeAccessToken } from "../../utils/authToken";
import styles from "../../styles/components/NavBar.module.css";
import { useUser } from "../../context/UserContext";
import { Dropdown } from "react-bootstrap";
import { ROLES } from "../../utils/Constants";

const NavBar = () => {
    const { user, role, logout } = useUser();
    const navigate = useNavigate();
    console.log("User in NavBar", user, role);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            logout();
            removeAccessToken();
            navigate("/");
        }
    };

    return (
        <header className="">
            <div className="container p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3 justify-content-center flex-wrap">
                    <img src={"/logo192.png"} alt="TalentHive" className="rounded-1" style={{ width: 75 }} />
                    <span className="fw-bold fs-1" style={{ color: "#fff" }}>
                        TalentHive
                    </span>
                </div>

                <nav className="d-flex align-items-center">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/about-us">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/">
                                Dashboard
                            </Link>
                        </li>
                        {role === ROLES.EMPLOYER ? (
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/hire-talent">
                                    Hire Talent
                                </Link>
                            </li>
                        ) : "" }
                    </ul>
                </nav>

                {role === "guest" ? (
                    <nav className="d-flex align-items-center">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5 link-opacity-75-hover fw-bold" to="/signin">
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5 link-opacity-75-hover fw-bold" to="/signup">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <div className="text-end ms-3 d-flex align-items-center gap-3 flex-wrap-reverse justify-content-center">
                        <p className="m-0 text-light fs-5 fw-bold">{user?.full_name || "No Name"}</p>
                        <Dropdown>
                            <Dropdown.Toggle
                                as="div"
                                className="d-block link-dark text-decoration-none"
                                id="dropdownUser1"
                            >
                                <img
                                    src={user?.avatar || "/logo192.png"}
                                    alt="mdo"
                                    width={50}
                                    height={50}
                                    className="rounded-circle shadow border bg-gradient"
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" className="text-small">
                                <Dropdown.Item>
                                    <Link className="text-decoration-none text-dark" to={`/profile/${user?._id}`}>
                                        Settings
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className="text-decoration-none text-dark" to={`/profile/${user?._id}`}>
                                        Profile
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#" onClick={handleLogout}>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
        </header>
    );
};

export default NavBar;

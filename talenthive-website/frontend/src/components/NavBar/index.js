import { Link } from "react-router-dom";
import ModalLogout from "../Modal/ModalLogout";
import { useUser } from "../../context/UserContext";
import { Dropdown } from "react-bootstrap";
import { ROLES } from "../../utils/Constants";
import { useState } from "react";

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const { user, role } = useUser();

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
                        {role === ROLES.EMPLOYER ? (
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/hire-talent">
                                    Hire Talent
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        {role === ROLES.CANDIDATE ? (
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5 link-opacity-75-hover" to="/applied-jobs">
                                    Applied Jobs
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
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
                        <p className="m-0 text-light fs-5 fw-bold">{user?.full_name || (role === "admin" ? "Admin" : "No Name")}</p>
                        <Dropdown>
                            <Dropdown.Toggle
                                as="div"
                                className="d-block link-dark text-decoration-none"
                                style={{ cursor: "pointer" }}
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
                                    <Link
                                        className="text-decoration-none text-dark"
                                        to={`/${role}/${user?._id}/dashboard`}
                                    >
                                        Dashboard
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className="text-decoration-none text-dark" to={`/profile/${user?._id}`}>
                                        Account
                                    </Link>
                                </Dropdown.Item>
                                {role === ROLES.ADMIN && (
                                    <>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>
                                            <Link
                                                className="text-decoration-none text-dark"
                                                to="/admin/manage-candidates"
                                            >
                                                Candidates Management
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link
                                                className="text-decoration-none text-dark"
                                                to="/admin/manage-employers"
                                            >
                                                Employers Management
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link
                                                className="text-decoration-none text-dark"
                                                to="/admin/manage-jobs"
                                            >
                                                Jobs Management
                                            </Link>
                                        </Dropdown.Item>
                                    </>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item href="#" onClick={() => setShowModal(true)}>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
            <ModalLogout show={showModal} setShow={setShowModal}/>
        </header>
    );
};

export default NavBar;

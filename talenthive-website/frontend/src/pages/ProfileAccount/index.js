import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { getUserById } from "../../services/userServices";
import { redirect, useLoaderData, useNavigation, useParams } from "react-router";
import { postChangePassword } from "../../services/authServices";
import { Form, useSubmit } from "react-router-dom";

export const profileLoader = async ({ params }) => {
    try {
        const data = await getUserById(params.id);
        return data;
    } catch (error) {
        console.error("Error while getting profile", error?.message || error);
        toast.error("Error while getting profile");
        throw error;
    }
};

export const changePasswordAction = async ({ request, params }) => {
    try {
        const formData = await request.formData();
        const { currentPassword, newPassword, confirmPassword } = Object.fromEntries(formData.entries());
        const data = await postChangePassword(currentPassword, newPassword, confirmPassword);
        toast.success("Password changed successfully");
        return redirect(`/profile/${params.id}`);
    } catch (error) {
        console.error("Error while changing password", error?.message || error);
        toast.error(`Error while changing password: ${error?.message || error}`);
        return redirect(`/profile/${params.id}`);
    }
};

const PasswordInput = ({ label, name, note }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <>
            <div className="mb-3 row d-flex align-items-center">
                <label htmlFor="password" className="col-sm-2 col-form-label fw-bold">
                    {label || "Password"}
                </label>
                <div className="col-sm-10">
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id={`input-${label.toLowerCase()}`}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            name={name}
                            required
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                        </button>
                    </div>
                </div>
            </div>
            {note && (
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                            {note}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

const ProfileAccount = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { id } = useParams();
    const data = useLoaderData();
    const userById = data?.user || {};
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const isOwner = userById?._id === user?._id;

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 10) errors.push("Password must be at least 10 characters.");
        if (!/[A-Z]/.test(password)) errors.push("Password must contain at least 1 uppercase letter.");
        if (!/[a-z]/.test(password)) errors.push("Password must contain at least 1 lowercase letter.");
        if (!/[0-9]/.test(password)) errors.push("Password must contain at least 1 number.");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least 1 symbol.");
        return errors;
    };

    const handleChangePasswordSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const submitData = {
            currentPassword: formData.get("currentPassword"),
            newPassword: formData.get("newPassword"),
            confirmPassword: formData.get("confirmPassword"),
        };
        const errors = validatePassword(submitData.newPassword);
        if (errors.length) {
            toast.error(errors.shift());
            return;
        }
        submit(submitData, { method: "post", action: `/profile/${id}/change-password` });
    };

    if (isLoading && navigation.state === "idle") {
        setIsLoading(false);
    }

    return (
        <div>
            <main className="container">
                <div className="row my-4">
                    <div className="col-lg-10 mx-auto p-lg-4 shadow rounded bg-white">
                        <h1 className="pb-4 fw-bold pt-4 pt-lg-0 border-bottom text-center">
                            {isOwner ? "Your Profile" : `${userById?.name || "User"}'s Profile`}
                        </h1>
                        <table className="table table-borderless">
                            <tbody>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Role:</td>
                                    <td>{userById?.role || <span className="text-muted">Not provided</span>}</td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Email:</td>
                                    <td>{userById?.email || <span className="text-muted">Not provided</span>}</td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Name:</td>
                                    <td>{userById?.full_name || <span className="text-muted">Not provided</span>}</td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Avatar:</td>
                                    <td>
                                        {userById?.avatar ? (
                                            <img
                                                className="shadow border-2 rounded-circle"
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                }}
                                                src={userById.avatar}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <span className="text-muted">No avatar available</span>
                                        )}
                                    </td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Phone:</td>
                                    <td>{userById?.phone || <span className="text-muted">Not provided</span>}</td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Address:</td>
                                    <td>{userById?.address || <span className="text-muted">Not provided</span>}</td>
                                </tr>
                                <tr className="table-light">
                                    <td className="fw-bold col-4">Introduction:</td>
                                    <td>
                                        {userById?.introduction || (
                                            <span className="text-muted">No introduction available</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {isOwner && (
                    <div className="row my-4">
                        <div className="col-lg-10 mx-auto p-lg-4 shadow rounded bg-white">
                            <h1 className="pb-4 fw-bold pt-4 pt-lg-0 border-bottom">Change Password</h1>
                            <Form className="container" onSubmit={handleChangePasswordSubmit}>
                                <PasswordInput label="Current Password" name="currentPassword" />
                                <PasswordInput
                                    label="New Password"
                                    name="newPassword"
                                    note={`*Note: Password must have at least 10 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol (!, @, #, $, ...).`}
                                />
                                <PasswordInput label="Confirm Password" name="confirmPassword" />
                                <hr className="m-0" />
                                <div className="pt-4 pb-4 pb-lg-0 row d-flex justify-content-evenly">
                                    <button
                                        type="submit"
                                        className="btn btn-primary d-flex align-items-center justify-content-center col-12 col-md-4 mb-2 mb-md-0"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            "Change Password"
                                        )}
                                    </button>

                                    <button type="reset" className="btn btn-secondary col-12 col-md-4">
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfileAccount;

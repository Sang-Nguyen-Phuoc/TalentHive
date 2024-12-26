import { Form, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { postUpdateEmployerProfile } from "../../services/authServices";
import { toast } from "react-toastify";

const CreateProfile = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [avatarPreview, setAvatarPreview] = useState(
        `https://robohash.org/set_set5/bgset_bg1/${Math.random()}?size=300x300`
    );
    const [loading, setLoading] = useState(false);

    const handleCreateProfileSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const bodyData = {
            full_name: data.full_name,
            introduction: data.introduction,
            address: data.address,
            phone: data.phone,
            avatar: avatarPreview === formData.get("avatarUrl") ? avatarPreview : formData.get("avatar"),
        };
        try {
            const dataResponse = await postUpdateEmployerProfile(bodyData);
            toast.success("Profile created successfully");
            navigate("/profile/me");
        } catch (error) {
            console.error("Error while creating profile", error?.message || error);
            toast.error("Error while creating profile");
        }
        setLoading(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setAvatarPreview(previewURL);
        }
    };

    const isValidImageUrl = (url, callback) => {
        try {
            // Kiểm tra xem URL có hợp lệ không
            const parsedUrl = new URL(url);
            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                callback(false);
                return;
            }

            // Tải thử ảnh
            const img = new Image();
            img.onload = () => callback(true); // Hợp lệ nếu tải thành công
            img.onerror = () => callback(false); // Không hợp lệ nếu không tải được
            img.src = url;
        } catch (error) {
            callback(false);
        }
    };

    const handleAvatalUrlChange = (e) => {
        const url = e.target.value;

        isValidImageUrl(url, (isValid) => {
            if (isValid) {
                if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                }
                setAvatarPreview(url);
            } else {
                toast.error("Invalid image URL. Please provide a valid image.");
            }
        });
    };

    return (
        <div className="shadow-lg p-0 p-sm-4 p-md-5 rounded-3">
            <Form className="container" onSubmit={handleCreateProfileSubmit}>
                <h1 className="pb-4 fw-bold pt-0 pt-lg-0 border-bottom text-center">Create Profile</h1>
                <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Your Role:
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            readOnly
                            className="form-control-plaintext"
                            id="role"
                            defaultValue={user?.role}
                            name="role"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Your email:
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="email"
                            readOnly
                            className="form-control-plaintext"
                            id="email"
                            defaultValue={user?.email}
                            name="email"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="full_name" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Your Name:
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            placeholder="enter your name"
                            defaultValue={user?.full_name}
                            name="full_name"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="avatar" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Avatar (Choose file or enter URL)
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="file"
                            className="form-control mb-3"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="avatarUrl"
                            name="avatarUrl"
                            placeholder="Enter URL for avatar image"
                            defaultValue={avatarPreview}
                            onChange={handleAvatalUrlChange}
                        />
                    </div>
                </div>
                {avatarPreview && (
                    <div className="row mb-3">
                        <div className="col-sm-3 col-xl-2"></div>
                        <div className="col-sm-9 col-xl-10">
                            <img src={avatarPreview} alt="avatar preview" className="img-fluid shadow rounded" />
                        </div>
                    </div>
                )}
                <div className="row mb-3">
                    <label htmlFor="introduction" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Introduction
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <textarea
                            className="form-control"
                            id="introduction"
                            name="introduction"
                            placeholder="write a brief introduction about yourself"
                        ></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Address
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="enter your address"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Phone
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="enter your phone number"
                        />
                    </div>
                </div>
                <div className="row pt-4 justify-content-center">
                    <div className="col-sm-8 col-xl-6 d-flex">
                        <button type="submit" className="btn btn-primary flex-fill">
                            {loading ? (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                "Create Profile"
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateProfile;

import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { postUpdateCandidate } from "../../services/userServices";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { motion } from "framer-motion";

const ModalUpdateCandidate = ({ show, onClose, candidate }) => {
    const navigate = useNavigate();
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        contact_email: candidate?.contact_email || "",
        full_name: candidate?.full_name || "",
        avatar: undefined,
        avatarUrl: candidate?.avatar || `https://robohash.org/set_set5/bgset_bg1/${user._id}?size=300x300`,
        phone: candidate?.phone || "",
        address: candidate?.address || "",
        city: candidate?.city || "",
        introduction: candidate?.introduction || "",
        skills: candidate?.skills || "",
        certification: candidate?.certification || "",
        work_experience: candidate?.work_experience || "",
    });
    const [previewAvatar, setPreviewAvatar] = useState(
        candidate?.avatar || `https://robohash.org/set_set5/bgset_bg1/${user._id}?size=300x300`
    );

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setFormData({
                ...formData,
                [name]: files[0],
                avatarUrl: "",
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bodyData = formData;
            bodyData.avatar = formData.avatar || formData.avatarUrl;
            const data = await postUpdateCandidate(bodyData);
            toast.success("Candidate information updated successfully");
            login();
            onClose();
            navigate(`/candidate/${user._id}/dashboard`);
        } catch (error) {
            console.error("Error while updating candidate", error?.message || error);
            toast.error("Error while updating candidate");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (previewAvatar) {
            URL.revokeObjectURL(previewAvatar);
        }
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewAvatar(previewURL);
        }
    };

    const isValidImageUrl = (url, callback) => {
        try {
            const parsedUrl = new URL(url);
            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                callback(false);
                return;
            }
            const img = new Image();
            img.onload = () => callback(true);
            img.onerror = () => callback(false);
            img.src = url;
        } catch (error) {
            callback(false);
        }
    };

    const handleAvatarUrlChange = (e) => {
        const url = e.target.value;
        isValidImageUrl(url, (isValid) => {
            if (isValid) {
                if (previewAvatar) {
                    URL.revokeObjectURL(previewAvatar);
                }
                setPreviewAvatar(url);
                setFormData({
                    ...formData,
                    avatar: undefined,
                    avatarUrl: url,
                });
            } else {
                toast.error("Invalid image URL");
            }
        });
    };

    return (
        <Modal show={show} onHide={() => onClose()} centered size="lg">
            <Modal.Header closeButton>
                <motion.h5
                    className="modal-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Update Candidate Information
                </motion.h5>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Personal Information */}
                        <div className="col-md-6">
                            <motion.h6
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Personal Information
                            </motion.h6>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="full_name"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Full Name
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="full_name"
                                    name="full_name"
                                    placeholder="Enter full name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="contact_email"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Email
                                </motion.label>
                                <motion.input
                                    type="email"
                                    className="form-control"
                                    id="contact_email"
                                    name="contact_email"
                                    placeholder="Enter email"
                                    value={formData.contact_email}
                                    onChange={handleInputChange}
                                    required
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="phone"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Phone
                                </motion.label>
                                <motion.input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="address"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    Address
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="city"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    City
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                />
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="col-md-6">
                            <motion.h6
                                className="text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Professional Information
                            </motion.h6>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="skills"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Skills (comma separated)
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="skills"
                                    name="skills"
                                    placeholder="E.g., React, JavaScript"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="certification"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Certification (comma separated)
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="certification"
                                    name="certification"
                                    placeholder="Enter certification"
                                    value={formData.certification}
                                    onChange={handleInputChange}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <motion.label
                                    htmlFor="work_experience"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Work Experience
                                </motion.label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="work_experience"
                                    name="work_experience"
                                    placeholder="Enter work experience"
                                    value={formData.work_experience}
                                    onChange={handleInputChange}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <h6 className="text-primary">Introduction</h6>
                        <div className="form-group">
                            <motion.label
                                htmlFor="introduction"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            >
                                Introduction
                            </motion.label>
                            <motion.textarea
                                className="form-control"
                                id="introduction"
                                name="introduction"
                                rows="4"
                                placeholder="Briefly introduce yourself"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            />
                        </div>
                    </motion.div>

                    {/* Avatar Image Upload */}
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        <h6 className="text-primary">Avatar Image (Choose file or enter URL)</h6>
                        <div className="form-group">
                            <motion.input
                                type="file"
                                className="form-control"
                                id="avatar"
                                name="avatar"
                                onChange={(e) => {
                                    handleAvatarChange(e);
                                    handleInputChange(e);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                            />
                            <motion.input
                                type="text"
                                className="form-control mt-3"
                                id="avatarUrl"
                                name="avatarUrl"
                                placeholder="Enter URL for avatar image"
                                value={formData.avatarUrl}
                                onChange={(e) => {
                                    handleAvatarUrlChange(e);
                                    handleInputChange(e);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            />
                            {previewAvatar && (
                                <motion.img
                                    src={previewAvatar}
                                    alt="avatar preview"
                                    className="img-fluid shadow rounded mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.6 }}
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <div className="mt-4 text-center">
                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            Update Candidate Info
                        </motion.button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateCandidate;

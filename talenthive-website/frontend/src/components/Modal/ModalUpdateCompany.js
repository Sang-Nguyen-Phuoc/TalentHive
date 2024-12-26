import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { postUpdateCompany } from "../../services/companyServices"; // Assume this service exists
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

const ModalUpdateCompany = ({ show, onClose, company }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [previewAvatar, setPreviewAvatar] = useState(
        company?.avatar || `https://robohash.org/${Math.random()}?size=300x300`
    );

    const [formData, setFormData] = useState({
        name: company?.name || "",
        avatar: undefined,
        avatarUrl: previewAvatar,
        introduction: company?.introduction || "",
        industry: company?.industry || "",
        addresses: company?.addresses || [""],
        website: company?.website || "",
        company_manager: company?.company_manager || "",
        employers: company?.employers || [],
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else if (name === "addresses") {
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
            await postUpdateCompany(bodyData);
            toast.success("Company information updated successfully");
            onClose();
            navigate(`/employer/${user._id}/dashboard`);
        } catch (error) {
            console.error("Error while updating company", error?.message || error);
            toast.error("Error while updating company");
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
            setFormData({
                ...formData,
                avatar: file,
            });
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

    const handleAddressChange = (index, event) => {
        const updatedAddresses = [...formData.addresses];
        updatedAddresses[index] = event.target.value;
        setFormData({
            ...formData,
            addresses: updatedAddresses,
        });
    };

    const handleRemoveAddress = (index) => {
        if (formData.addresses.length === 1) {
            return;
        }
        const updatedAddresses = [...formData.addresses];
        updatedAddresses.splice(index, 1);
        setFormData({
            ...formData,
            addresses: updatedAddresses,
        })
    };

    // Hàm thêm ô nhập địa chỉ mới
    const addAddressField = () => {
        setFormData({
            ...formData,
            addresses: [...formData.addresses, ""],
        })
    };

    return (
        <Modal show={show} onHide={() => onClose()} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Company Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Company Information */}
                        <div className="col-md-6">
                            <h6 className="text-primary">Company Information</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Company Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter company name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="industry">Industry</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="industry"
                                    name="industry"
                                    placeholder="Enter industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="website">Website</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="website"
                                    name="website"
                                    placeholder="Enter website URL"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="company_manager">Company Manager</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="company_manager"
                                    name="company_manager"
                                    placeholder="Enter company manager name"
                                    value={formData.company_manager}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Description and Avatar */}
                        <div className="col-md-6">
                            <h6 className="text-primary">Company Description</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="introduction">Introduction</label>
                                <textarea
                                    className="form-control"
                                    id="introduction"
                                    name="introduction"
                                    rows="4"
                                    placeholder="Introduce the company"
                                    value={formData.introduction}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="avatar">Company Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="avatar"
                                    name="avatar"
                                    accept=".jpg,.png,.jpeg"
                                    onChange={handleAvatarChange}
                                />
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Enter URL for avatar image"
                                    value={formData.avatarUrl}
                                    onChange={handleAvatarUrlChange}
                                />
                                {previewAvatar && (
                                    <img
                                        src={previewAvatar}
                                        alt="avatar preview"
                                        className="img-fluid shadow rounded border border-dark mt-4"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="mt-4">
                        <h6 className="text-primary">Addresses</h6>
                        <div className="form-group">
                            {formData.addresses.map((address, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className={`form-control ${index === 0 ? "rounded" : ""}`}
                                        id={`address-${index}`}
                                        name={`address-${index}`}
                                        placeholder="Enter your company address"
                                        value={address}
                                        required
                                        onChange={(event) => handleAddressChange(index, event)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleRemoveAddress(index)}
                                        style={{ display: index === 0 ? "none" : "block" }}
                                    >
                                        {" "}
                                        Remove{" "}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-info" onClick={addAddressField}>
                                + Add Address
                            </button>
                        </div>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" className="me-2" onClick={() => onClose()}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Update Company Information
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateCompany;

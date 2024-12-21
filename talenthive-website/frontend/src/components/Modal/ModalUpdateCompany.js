import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { postUpdateCompany } from "../../services/companyServices"; // Assume this service exists
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

const ModalUpdateCompany = ({ show, onClose, company }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    console.log("company", company);
    
    const [formData, setFormData] = useState({
        name: company?.name || "",
        avatar: company?.avatar || "",
        introduction: company?.introduction || "",
        industry: company?.industry || "",
        addresses: company?.addresses || [],
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
            setFormData({
                ...formData,
                [name]: value.split(",").map(item => item.trim()), // Convert to an array of addresses
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
            const data = await postUpdateCompany(bodyData); // Assume the API service to update company
            toast.success("Company information updated successfully");
            onClose();
            navigate(`/employer/${user._id}/dashboard`); // Assuming companyId is in the user object
        } catch (error) {
            console.error("Error while updating company", error?.message || error);
            toast.error("Error while updating company");
        }
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
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="mt-4">
                        <h6 className="text-primary">Addresses</h6>
                        <div className="form-group">
                            <label htmlFor="addresses">Addresses (comma-separated)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addresses"
                                name="addresses"
                                placeholder="Enter addresses"
                                value={formData.addresses.join(", ")}
                                onChange={handleInputChange}
                            />
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

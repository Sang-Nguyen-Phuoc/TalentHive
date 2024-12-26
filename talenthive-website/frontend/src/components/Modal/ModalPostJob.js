import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { postCreateJob } from "../../services/jobsServices";

const ModalPostJob = ({ show, setShow, company, jobTypes, jobCategories }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        job_type: "",
        job_category: "",
        min_salary: "",
        max_salary: "",
        salary_unit: "USD",
        address: "",
        description: "",
        skills: [""],
        requirements: [""],
        benefits: [""],
        expires_at: "",
        job_type: "",
        job_category: "",
        is_public: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleArrayChange = (index, field, value) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayField = (index, field) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = await postCreateJob(formData);
            navigate(`/jobs/${data.job._id}`);
        } catch (error) {
            console.error("Error while creating job", error?.message || error);
            toast.error("Error while creating job");
        }
        setLoading(false);
    };

    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Post a New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* Job Information */}
                    <h5 className="mb-3 fw-bold">Job Information</h5>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">
                                Title *
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Enter job title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="company_name" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="company_name"
                                name="company_name"
                                placeholder="company name"
                                value={company.name}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    {/* Job Type & Category */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="job_type" className="form-label">
                                Job Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="job_type"
                                name="job_type"
                                placeholder="e.g., Full-time"
                                value={formData.job_type}
                                onChange={handleChange}
                                list="jobTypesList"
                                required
                            />
                            <datalist id="jobTypesList">
                                {jobTypes.map((type, index) => (
                                    <option key={index} value={type.name} />
                                ))}
                            </datalist>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="job_category" className="form-label">
                                Job Category
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="job_category"
                                name="job_category"
                                placeholder="e.g., IT, Marketing"
                                value={formData.job_category}
                                onChange={handleChange}
                                list="jobCategoriesList"
                                required
                            />
                            <datalist id="jobCategoriesList">
                                {jobCategories.map((category, index) => (
                                    <option key={index} value={category.name} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    {/* Salary and address */}
                    <h5 className="mb-3 fw-bold">Salary & address</h5>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="min_salary" className="form-label">
                                Min Salary *
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="min_salary"
                                name="min_salary"
                                placeholder="e.g., 1000"
                                value={formData.min_salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="max_salary" className="form-label">
                                Max Salary *
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="max_salary"
                                name="max_salary"
                                placeholder="e.g., 2000"
                                value={formData.max_salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="salary_unit" className="form-label">
                                Salary Unit
                            </label>
                            <select
                                className="form-select"
                                id="salary_unit"
                                name="salary_unit"
                                value={formData.salary_unit}
                                onChange={handleChange}
                            >
                                <option value="USD">USD</option>
                                <option value="VND">VND</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            address *
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <h5 className="mb-3 fw-bold">Job Description</h5>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description *
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="description"
                            placeholder="Write a detailed job description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* Skills Input */}
                    <h5 className="mb-3 fw-bold">Skills</h5>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => handleArrayChange(index, "skills", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeArrayField(index, "skills")}
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={() => addArrayField("skills")}
                    >
                        + Add Skill
                    </button>

                    {/* Requirements Input */}
                    <h5 className="mb-3 fw-bold">Requirements</h5>
                    {formData.requirements.map((requirement, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Requirement"
                                value={requirement}
                                onChange={(e) => handleArrayChange(index, "requirements", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeArrayField(index, "requirements")}
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={() => addArrayField("requirements")}
                    >
                        + Add Requirement
                    </button>

                    {/* Benefits Input */}
                    <h5 className="mb-3 fw-bold">Benefits</h5>
                    {formData.benefits.map((benefit, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Benefit"
                                value={benefit}
                                onChange={(e) => handleArrayChange(index, "benefits", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeArrayField(index, "benefits")}
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={() => addArrayField("benefits")}
                    >
                        + Add Benefit
                    </button>

                    {/* Expiration Date */}
                    <div className="mb-3">
                        <label htmlFor="expires_at" className="form-label">
                            Expiration Date *
                        </label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="expires_at"
                            name="expires_at"
                            value={formData.expires_at}
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    {/* Is Public */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="is_public"
                            name="is_public"
                            checked={formData.is_public}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="is_public">
                            Make this job post public
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {loading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Post Job"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalPostJob;

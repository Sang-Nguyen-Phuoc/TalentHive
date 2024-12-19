import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Form, useNavigate } from "react-router-dom";
import { postCreateCompany } from "../../services/companyServices";
import { toast } from "react-toastify";

const CompanyAccess = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [addresses, setAddresses] = useState([""]);
    const handleJoinCompanySubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("data in handleJoinCompanySubmit", data);
        try {
            const companyData = {
                name: data.company_name,
                avatar: data.avatar,
                introduction: data.introduction,
                industry: data.industry,
                addresses: addresses,
                website: data.website ? data.website : undefined,
            }
            console.log({companyData});
            
            const dataResponse = await postCreateCompany(companyData);
            console.log({dataResponse});
            toast.success("Company created successfully");
            navigate("/hire-talent");
        } catch (error) {
            console.error("Error while creating company", error?.message || error);
            toast.error("Error while creating company");
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

    const handleAddressChange = (index, event) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = event.target.value;
        setAddresses(updatedAddresses);
    };

    const handleRemoveAddress = (index) => {
        if (addresses.length === 1) {
            return;
        }
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1);
        setAddresses(updatedAddresses);
    };

    // Hàm thêm ô nhập địa chỉ mới
    const addAddressField = () => {
        setAddresses([...addresses, ""]);
    };

    return (
        <div className="shadow-lg p-0 p-sm-4 p-md-5 rounded-3">
            <Form className="container" onSubmit={handleJoinCompanySubmit}>
                <h1 className="pb-4 fw-bold pt-0 pt-lg-0 border-bottom text-center">Create a new company</h1>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Your email
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
                        Your Name
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control-plaintext"
                            id="full_name"
                            placeholder="enter your name"
                            defaultValue={user?.full_name}
                            name="full_name"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="company_name" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Company Name*
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="company_name"
                            placeholder="enter your name"
                            name="company_name"
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="avatar" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Avatar
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="file"
                            className="form-control"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            
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
                        Introduction <span className="text-muted fw-lighter">(optional)</span>
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <textarea
                            className="form-control"
                            id="introduction"
                            name="introduction"
                            placeholder="write a brief introduction about your company"
                        ></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="industry" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Industry*
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="industry"
                            name="industry"
                            placeholder="enter your company industry"
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Addresses*
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        {addresses.map((address, index) => (
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

                <div className="row mb-3">
                    <label htmlFor="website" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Website <span className="text-muted fw-lighter">(optional)</span>
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="url"
                            className="form-control"
                            id="website"
                            name="website"
                            placeholder="enter your company website"
                        />
                    </div>
                </div>
                <div className="row pt-4 pb-4 justify-content-center">
                    <div className="col-sm-8 col-xl-6 d-flex">
                        <button type="submit" className="btn btn-primary flex-fill">
                            {loading ? (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                "Send request to create the company"
                            )}
                        </button>
                    </div>
                </div>
            </Form>
            <hr className="m-0" />
            <div className="row mt-4 pb-4 pb-sm-0">
                <div className="col-lg-9 col-xl-10">
                    Your company has provided you with an accession code to join their team. Please use the link below
                    to enter the code: <br />
                    <a href="/join-an-existing-company">Click here to enter your company's accession code</a>.
                </div>
            </div>
        </div>
    );
};

export default CompanyAccess;

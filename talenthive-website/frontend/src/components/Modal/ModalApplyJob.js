import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { postApplyJob } from "../../services/jobsServices";
import { useUser } from "../../context/UserContext";
import { getCandidateById } from "../../services/userServices";

const ModalApplyJob = ({ show, setShow, job, application }) => {
    
    const { user } = useUser();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: application?.full_name || "",
        email: application?.email || "",
        phone: application?.phone || "",
        skills: application?.skills || "",
        worker_experience: application?.worker_experience || "",
        certification: application?.certification || "",
        cover_letter: application?.cover_letter || "",
        cv: application?.cv || null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cv") {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleUseProfile = async () => {
        
        const candidate = await getCandidateById(user._id);
        const profile = candidate.user;
        setFormData({
            full_name: profile.full_name,
            email: profile.contact_email,
            phone: profile.phone,
            skills: profile.skills,
            worker_experience: profile.work_experience,
            certification: profile.certification,
            cover_letter: profile.introduction,
            cv: null,
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            // Gửi formDataToSend lên server
            const data = await postApplyJob(job._id, formData);

            toast.success("Application submitted successfully");

            setShow(false);
        } catch (error) {
            console.error("Error while submitting application", error?.message || error);
            toast.error(`Error while submitting application: ${error?.message || error}`);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Apply for a Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Cột trái */}
                        <div className="col-md-6">
                            <h6 className="text-primary">Personal Information</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="full_name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="full_name"
                                    name="full_name"
                                    placeholder="Enter your full name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <h6 className="text-primary mt-4">Skills</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="skills">Skills</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="skills"
                                    name="skills"
                                    placeholder="E.g., React, JavaScript, Python"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="col-md-6">
                            <h6 className="text-primary">Work Experience</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="worker_experience">Work Experience</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="worker_experience"
                                    name="worker_experience"
                                    placeholder="Enter your work experience"
                                    value={formData.worker_experience}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <h6 className="text-primary mt-4">Certification</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="certification">Certification</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="certification"
                                    name="certification"
                                    placeholder="E.g., Certified Web Developer"
                                    value={formData.certification}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <h6 className="text-primary mt-4">Upload CV</h6>
                            <div className="form-group mb-3">
                                <label htmlFor="cv">Upload CV</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="cv"
                                    name="cv"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button variant="outline-primary" className="w-100" onClick={handleUseProfile}>
                                Autofill from Profile
                            </Button>
                        </div>
                    </div>

                    {/* Cover Letter (Toàn chiều ngang) */}
                    <div className="mt-4">
                        <h6 className="text-primary">Cover Letter</h6>
                        <div className="form-group">
                            <label htmlFor="cover_letter">Write your Cover Letter</label>
                            <textarea
                                className="form-control"
                                id="cover_letter"
                                name="cover_letter"
                                rows="5"
                                placeholder="Briefly describe why you're the right fit for this job"
                                value={formData.cover_letter}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    {/* Nút Submit và Cancel */}
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" className="me-2" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Submit Application
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalApplyJob;

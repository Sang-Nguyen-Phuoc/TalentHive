import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import styles from '../../../../styles/components/Application.module.css';

const ApplicationForm = ({ show, setShow }) => {
    const [formData, setFormData] = useState({
        candidate: '',
        avatar: '',
        gender: '',
        address: '',
        email: '',
        phone: '',
        introduction: '',
        awards: [],
        skills: [],

    });

    const [candidateWarning, setCandidateWarning] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file.name }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        // Special handling for skills and awards
        if (id === 'skills' || id === 'awards') {
            const arrayValue = value.split(',').map((item) => item.trim()); // Convert string to array
            setFormData((prev) => ({ ...prev, [id]: arrayValue }));
        } else {
            if (id === 'candidate' && value.length > 20) {
                setCandidateWarning('Candidate name must be less than 20 characters.');
            } else {
                setCandidateWarning('');
            }
            setFormData((prev) => ({ ...prev, [id]: value })); // Regular update for other fields
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform additional validation before submission
        if (!formData.candidate || candidateWarning) {
            alert('Please fix the candidate field before submitting.');
            return;
        }

        setShow(false);

        // Reset form
        setFormData({
            candidate: '',
            avatar: '',
            gender: '',
            address: '',
            email: '',
            phone: '',
            introduction: '',
            skills: [],
            awards: [],
        });
    };

    return (
        <Modal
            size="xl"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    className={styles.applicationForm}
                    onSubmit={handleSubmit}
                >
                    {/* Candidate Field */}
                    <div className={`${styles.formGroup} ${styles.position}`} style={{ marginBottom: '-20px' }}>
                        <label htmlFor="candidate">Candidate</label>
                        <div className={`${styles.position}`}>
                            <input
                                type="text"
                                className="form-control"
                                id="candidate"
                                value={formData.candidate}
                                onChange={handleInputChange}
                            />
                            {candidateWarning && (
                                <small className={styles.warningText}>{candidateWarning}</small>
                            )}
                        </div>
                    </div>

                    {/* Avatar Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="avatar">Avatar</label>
                        <div className={styles.fileInputWrapper}>
                            <input
                                type="file"
                                id="avatar"
                                className={styles.hiddenFileInput}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="avatar" className={styles.fileInputLabel}>
                                <span className={styles.fileName}>
                                    {formData.avatar || 'No file selected'}
                                </span>
                            </label>
                        </div>
                        <small>
                            <strong>Maximum upload file:</strong> 30MB
                        </small>
                    </div>

                    {/* Gender and Address */}
                    <div className={styles['field-pair']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Genderqueer">Genderqueer</option>
                                <option value="Agender">Agender</option>
                                <option value="Genderfluid">Genderfluid</option>
                                <option value="Transgender">Transgender</option>
                                <option value="Two-Spirit">Two-Spirit</option>
                                <option value="Intersex">Intersex</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Email and Phone */}
                    <div className={styles['field-pair']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="phone"
                                min="0"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className={styles.formGroup}>
                        <label htmlFor="introduction">Introduction</label>
                        <textarea
                            className="form-control"
                            id="introduction"
                            rows="4"
                            value={formData.introduction}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <textarea
                        className="form-control"
                        id="skills"
                        rows="4"
                        placeholder="Enter skills separated by commas (e.g., HTML, CSS, JavaScript)"
                        value={formData.skills.join(', ')} // Convert array to string for display
                        onChange={handleInputChange}
                    ></textarea>

                    <textarea
                        className="form-control"
                        id="awards"
                        rows="4"
                        placeholder="Enter awards separated by commas (e.g., Employee of the Month, Coding Champion)"
                        value={formData.awards.join(', ')} // Convert array to string for display
                        onChange={handleInputChange}
                    ></textarea>


                    <button type="submit" className={styles.submitButton}>
                        Update
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ApplicationForm;

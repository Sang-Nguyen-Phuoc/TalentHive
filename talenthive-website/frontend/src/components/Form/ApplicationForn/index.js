import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import styles from '../../../styles/components/Application.module.css';

const ApplicationForm = ({ show, setShow }) => {
    const [formData, setFormData] = useState({
        fileName: '',
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, fileName: file.name }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        // Optionally, you can also close the modal after submission
        setShow(false);
    };

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Application Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        className={styles.applicationForm}
                        onSubmit={handleSubmit} // Attach the submit handler
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="resume">Resume</label>
                            <div className={styles.fileInputWrapper}>
                                <input
                                    type="file"
                                    id="resume"
                                    className={styles.hiddenFileInput}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="resume" className={styles.fileInputLabel}>
                                    <span className={styles.fileName}>
                                        {formData.fileName || 'No file selected'}
                                    </span>
                                </label>
                                <br />
                            </div>
                            <small>
                                <strong>Maximum upload file:</strong> 30MB
                            </small>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
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
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Cover Letter</label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="5"
                                placeholder="Enter your cover letter"
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ApplicationForm;

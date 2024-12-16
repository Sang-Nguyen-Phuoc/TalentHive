import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import styles from '../../../../styles/components/Application.module.css';

const ApplicationForm = ({ show, setShow }) => {
    const [formData, setFormData] = useState({
        company: '',
        avatar: '',
        website: '',
        address: '',
        location: '',
        category: [],
        email: '',
        phone: '',
        introduction: '',
    });


    const [companyWarning, setCompanyWarning] = useState('');
    const categoryDropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file.name }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'company' && value.length > 20) {
            setCompanyWarning('Company name must be less than 20 characters.');
        } else {
            setCompanyWarning('');
        }
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handlecategoryChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prev) => {
            if (checked) {
                return { ...prev, category: [...prev.category, value] };
            } else {
                return { ...prev, category: prev.category.filter((category) => category !== value) };
            }
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const maxSelectionsReached = formData.category.length >= 3;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);






    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform additional validation before submission
        if (!formData.company || companyWarning) {
            alert('Please fix the company field before submitting.');
            return;
        }

        console.log('Form Data:', formData);
        setShow(false);
        // reset form
        setFormData({
            company: '',
            avatar: '',
            website: '',
            address: '',
            location: '',
            category: [],
            email: '',
            phone: '',
            introduction: '',
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
                    {/* Company Field */}
                    <div className={`${styles.formGroup} ${styles.position}`} style={
                        { marginBottom: '-20px' }
                    }>
                        <label htmlFor="company">Company</label>
                        <div className={`${styles.position}`}>
                            <input
                                type="text"
                                className="form-control"
                                id="company"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                            {companyWarning && (
                                <small className={styles.warningText}>{companyWarning}</small>
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
                            <br />
                        </div>
                        <small>
                            <strong>Maximum upload file:</strong> 30MB
                        </small>
                    </div>

                    {/* Location and category */}
                    <div className={styles['field-pair']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="location">Location</label>
                            <select
                                id="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Location</option>
                                <optgroup label="Asia">
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Japan">Japan</option>
                                    <option value="India">India</option>
                                </optgroup>
                                <optgroup label="Europe">
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="UK">United Kingdom</option>
                                </optgroup>
                                <optgroup label="America">
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Brazil">Brazil</option>
                                </optgroup>
                            </select>
                        </div>

                        {/* category Dropdown */}
                        <div className={styles.formGroup}>
                            <label htmlFor="category">category</label>
                            <div
                                ref={categoryDropdownRef}
                                className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}

                            >
                                <div
                                >
                                    <button
                                        type="button"
                                        className={styles['dropdown-button']}
                                        onClick={toggleDropdown}

                                    >
                                        {formData.category.length > 0
                                            ? formData.category.join(', ')
                                            : 'Select categorys'}
                                        <span
                                            className={`${styles['arrow-icon']} ${isDropdownOpen ? styles['rotate'] : ''}`}
                                        >
                                            ▼
                                        </span>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className={styles['dropdown-content']}>
                                            {['Banking', 'Fintech', 'React', 'Vue', 'Angular'].map((category) => (
                                                <label key={category}>
                                                    <input
                                                        type="checkbox"
                                                        value={category}
                                                        checked={formData.category.includes(category)}
                                                        onChange={handlecategoryChange}
                                                        disabled={
                                                            maxSelectionsReached &&
                                                            !formData.category.includes(category)
                                                        }
                                                    />
                                                    {category}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>


                    {/* Website and Address */}
                    <div className={styles['field-pair']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                className="form-control"
                                id="website"
                                value={formData.website}
                                onChange={handleInputChange}
                            />
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

                    {/* Introduction  */}
                    <div className={styles.formGroup}>
                        <label htmlFor="introduction">Introduction</label>
                        <textarea
                            className="form-control"
                            id="introduction"
                            rows="6"
                            value={formData.introduction}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Update
                    </button>
                </form>
            </Modal.Body>
        </Modal >
    );
};

export default ApplicationForm;

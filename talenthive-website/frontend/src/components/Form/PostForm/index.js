import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/components/Application.module.css';

const ApplicationForm = ({ show, setShow }) => {
    const [formData, setFormData] = useState({
        position: '',
        location: '',
        deadline: '',
        workingType: '',
        category: [],
        salary: '',
        quantity: '',
        description: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSalaryDropdownOpen, setIsSalaryDropdownOpen] = useState(false);
    const [positionWarning, setPositionWarning] = useState('');
    const categoryDropdownRef = useRef(null);
    const salaryDropdownRef = useRef(null);


    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'position' && value.length > 20) {
            setPositionWarning('Position must be less than 20 characters.');
        } else {
            setPositionWarning('');
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

    const toggleSalaryDropdown = () => {
        setIsSalaryDropdownOpen((prev) => !prev);
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
            if (
                salaryDropdownRef.current &&
                !salaryDropdownRef.current.contains(event.target)
            ) {
                setIsSalaryDropdownOpen(false);
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
        if (!formData.position || positionWarning) {
            alert('Please fix the Position field before submitting.');
            return;
        }

        console.log('Form Data:', formData);
        setShow(false);
    };

    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Create Post Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    className={styles.applicationForm}
                    onSubmit={handleSubmit}
                >
                    {/* Position Field */}
                    <div className={`${styles.formGroup} ${styles.position}`}>
                        <label htmlFor="position">Position</label>
                        <div className={`${styles.position}`}>
                            <input
                                type="text"
                                className="form-control"
                                id="position"
                                value={formData.position}
                                onChange={handleInputChange}
                            />
                            {positionWarning && (
                                <small className={styles.warningText}>{positionWarning}</small>
                            )}
                        </div>
                    </div>

                    {/* Location and Deadline */}
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

                        <div className={styles.formGroup}>
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                className="form-control"
                                id="deadline"
                                value={formData.deadline}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Working Type and Quantity */}
                    <div className={styles['field-pair']}>
                        <div className={styles.formGroup}>
                            <label htmlFor="workingType">Working Type</label>
                            <select
                                id="workingType"
                                className="form-control"
                                value={formData.workingType}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Working Type</option>
                                <option value="Fulltime">Fulltime</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Freelancer">Freelancer</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Salary and category */}
                    <div className={styles['field-pair']}>

                        {/* Salary Dropdown */}
                        <div className={styles.formGroup}>
                            <label htmlFor="salary">Salary</label>
                            <div
                                className={`${styles.dropdown} ${isSalaryDropdownOpen ? styles.open : ''}`}
                                ref={salaryDropdownRef}
                            >
                                <button
                                    type="button"
                                    className={styles['dropdown-button']}
                                    onClick={toggleSalaryDropdown}
                                >
                                    {formData.salary || 'Select Salary'}
                                    <span className={styles['arrow-icon']}>▼</span>
                                </button>
                                {isSalaryDropdownOpen && (
                                    <div className={styles['dropdown-content']}>
                                        {['Negotiation', 'Up to $1000', 'Up to $1500', 'Up to $2000', 'More than $2500'].map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, salary: option }));
                                                    setIsSalaryDropdownOpen(false);
                                                }}
                                                className={styles['dropdown-item']}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* category Dropdown */}
                        <div className={styles.formGroup}>
                            <label htmlFor="category">category</label>
                            <div
                                ref={categoryDropdownRef}
                                className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}
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

                    {/* Description */}
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Post
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ApplicationForm;

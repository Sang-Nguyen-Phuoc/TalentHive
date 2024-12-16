import React, { useState, useRef, useEffect } from 'react';
import style from '../../styles/components/Search.module.css';

const Search = () => {
    const [formData, setFormData] = useState({
        location: '',
        sector: [],
        keyword: '',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSectorChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            if (checked) {
                return { ...prevData, sector: [...prevData.sector, value] };
            } else {
                return { ...prevData, sector: prevData.sector.filter((sector) => sector !== value) };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Keyword: ${formData.keyword}, Location: ${formData.location}, Sector: ${formData.sector.join(', ')}`);

        setFormData({
            location: '',
            sector: [],
            keyword: '',
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const maxSelectionsReached = formData.sector.length >= 3;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='container'>
            <hr className='m-0'/>
            <form onSubmit={handleSubmit} className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between gap-md-2 py-3">
                <input
                    type="text"
                    name="keyword"
                    id="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="Enter keyword..."
                    className='form-control d-inline w-auto mb-2 mb-md-0'

                />

                <select className='form-select d-inline w-auto mb-2 mb-md-0' name="location" id="location" value={formData.location} onChange={handleInputChange}>
                    <option disabled value="">Location</option>
                    <optgroup label="Europe">
                        <option value="sweden">Sweden</option>
                        <option value="germany">Germany</option>
                        <option value="france">France</option>
                    </optgroup>
                    <optgroup label="Asia">
                        <option value="japan">Japan</option>
                        <option value="south_korea">South Korea</option>
                        <option value="india">India</option>
                    </optgroup>
                </select>

                {/* Custom Multi-Select Dropdown for Sectors */}
                <div
                    ref={dropdownRef}
                    className={`${style.dropdown} ${isDropdownOpen ? style.open : ''} mb-2 mb-md-0`}
                    tabIndex="0"
                    
                
                >
                    <button
                        type="button"
                        className={style['dropdown-button']}
                        onClick={toggleDropdown}
                        style={{
                            height: '100%',
                            padding: ".375rem 2.25rem .375rem .75rem",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                            color: "var(--bs-body-color)",
                            appearance: "none",
                            backgroundColor: "var(--bs-body-bg)",
                            backgroundImage: "var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right .75rem center",
                            backgroundSize: "16px 12px",
                            border: "var(--bs-border-width) solid var(--bs-border-color)",
                            borderRadius: "var(--bs-border-radius)",
                            transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                        }}
                    >
                        {formData.sector.length > 0 ? formData.sector.join(', ') : 'Select Sectors'}
                        <span className={`${style['arrow-icon']} ${isDropdownOpen ? style['rotate'] : ''}`}>
                            ▼
                        </span>
                    </button>
                    {isDropdownOpen && (
                        <div className={style['dropdown-content']}>
                            {['software', 'hardware', 'telecommunications', 'banking', 'insurance', 'investment'].map(
                                (sector) => (
                                    <label key={sector}>
                                        <input
                                            type="checkbox"
                                            value={sector}
                                            checked={formData.sector.includes(sector)}
                                            onChange={handleSectorChange}
                                            disabled={
                                                maxSelectionsReached && !formData.sector.includes(sector)
                                            }
                                        />
                                        <span>{sector.charAt(0).toUpperCase() + sector.slice(1)}</span>
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>

                <button className="btn btn-primary px-4 py-2" type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;

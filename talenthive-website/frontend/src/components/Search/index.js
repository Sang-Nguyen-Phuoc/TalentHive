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
        <div>
            <form onSubmit={handleSubmit} className={style['search-form']}>
                <input
                    type="text"
                    name="keyword"
                    id="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="Enter keyword..."
                />

                <select name="location" id="location" value={formData.location} onChange={handleInputChange}>
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
                    className={`${style.dropdown} ${isDropdownOpen ? style.open : ''}`}
                    tabIndex="0"
                >
                    <button
                        type="button"
                        className={style['dropdown-button']}
                        onClick={toggleDropdown}
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

                <button className={style['search-btn']} type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;

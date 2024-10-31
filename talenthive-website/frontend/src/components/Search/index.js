import React, { useState } from 'react';
import style from '../../styles/components/Search.module.css';

const Search = () => {
    const [formData, setFormData] = useState({
        location: 'Location',
        sector: 'Sector',
        keyword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Keyword: ${formData.keyword}, Location: ${formData.location}, Sector: ${formData.sector}`);
        // reset form
        setFormData({
            location: 'Location',
            sector: 'Sector',
            keyword: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={style['search-form']}>
                <input
                    type="text"
                    name="keyword"
                    id="keyword"
                    value={formData.keyword}
                    onChange={handleChange}
                    placeholder="Enter keyword..."
                />

                <select name="location" id="location" value={formData.location} onChange={handleChange}
                    defaultValue={"default"}>
                    <option disabled value="default" >Location</option>
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

                <select name="sector" id="sector" value={formData.sector} onChange={handleChange} defaultValue={"default"}>
                    <option disabled value="default">Sector</option>
                    <optgroup label="Technology">
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="telecommunications">Telecommunications</option>
                    </optgroup>
                    <optgroup label="Finance">
                        <option value="banking">Banking</option>
                        <option value="insurance">Insurance</option>
                        <option value="investment">Investment</option>
                    </optgroup>
                </select>

                <button className={style['search-btn']} type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { getJobCategoryList, getJobTypeList, getLocationList } from "../../services/jobsServices";

const SearchBar = () => {
    const navigate = useNavigate();
    const [jobTypes, setJobTypes] = useState(JSON.parse(localStorage.getItem("jobTypes")) || []);
    const [jobCategories, setJobCategories] = useState(JSON.parse(localStorage.getItem("jobCategories")) || []);
    const [locations, setLocations] = useState(JSON.parse(localStorage.getItem("locations")) || []);

    const [keyword, setKeyword] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let jobTypeListData = null;
            let jobCategoryListData = null;
            let jobLocationListData = null;
            try {
                jobTypeListData = await getJobTypeList();
            } catch (error) {
                console.error("Error while getting job category list", error?.message || error);
            }
            try {
                jobCategoryListData = await getJobCategoryList();
            } catch (error) {
                console.error("Error while getting job category list", error?.message || error);
            }
            try {
                jobLocationListData = await getLocationList();
            } catch (error) {
                console.error("Error while getting job category list", error?.message || error);
            }
            setJobTypes(pre => {
                const jobTypes = jobTypeListData ? jobTypeListData.job_types?.map?.(item => item.name) : pre;
                localStorage.setItem("jobTypes", JSON.stringify(jobTypes));
                return jobTypes;
            });
            setJobCategories(pre => {
                const jobCategories = jobCategoryListData ? jobCategoryListData.job_categories?.map?.(item => item.name) : pre;
                localStorage.setItem("jobCategories", JSON.stringify(jobCategories));
                return jobCategories;
            });
            setLocations(pre => {
                const locations = jobLocationListData ? jobLocationListData.job_locations : pre;
                localStorage.setItem("locations", JSON.stringify(locations));
                return locations;
            });
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        let searchParams = "";
        if (keyword) searchParams += "&keyword=" + keyword;
        if (selectedJobType) searchParams += "&job_type=" + selectedJobType;
        if (selectedCategory) searchParams += "&job_category=" + selectedCategory;
        if (selectedLocation) searchParams += "&location=" + selectedLocation;
        console.log("searchParams", searchParams);
        navigate("/search?" + searchParams.slice(1));
    };

    const handleClear = () => {
        setKeyword("");
        setSelectedJobType("");
        setSelectedCategory("");
        setSelectedLocation("");    
    }

    return (
        <div className="container">
            <form className="search-bar d-flex flex-wrap justify-content-between align-items-center p-3" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                {/* Input Keyword */}
                <div className="flex-grow-1 me-2 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                {/* Select Job Type */}
                <div className="me-2 mb-2">
                    <select
                        className="form-select"
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                    >
                        <option value="" disabled className="text-muted">
                            ---Job Type---
                        </option>
                        {jobTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Select Job Category */}
                <div className="me-2 mb-2">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" disabled>
                            ---Job Category---
                        </option>
                        {jobCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Select Location */}
                <div className="me-2 mb-2">
                    <select
                        className="form-select"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="" disabled>
                            ---Location---
                        </option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Search Button */}
                <div className="mb-2">
                    <button className="btn btn-light text-primary" type="submit">
                        Search
                    </button>
                    <button className="btn btn-light text-danger ms-2" onClick={handleClear}>Clear</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;

import JobItem from "../../components/JobItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { getJobCategoryList, getJobListAsEmployer, getJobTypeList } from "../../services/jobsServices";
import { getCompanyAsEmployer } from "../../services/companyServices";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModalPostJob from "../../components/Modal/ModalPostJob";

export const HireTalentLoader = async () => {
    let companyData = null;
    let jobListData = null;
    let jobTypeListData = null;
    let jobCategoryListData = null;
    try {
        companyData = await getCompanyAsEmployer();
    } catch (error) {
        console.error("Error while getting company", error?.message || error);
        toast.error("Error while getting company" + error?.message || error);
    }
    try {
        jobListData = await getJobListAsEmployer();
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        toast.error("Error while getting job list");
    }
    try {
        jobTypeListData = await getJobTypeList();
    } catch (error) {
        console.error("Error while getting job type list", error?.message || error);
        toast.error("Error while getting job type list");
    }
    try {
        jobCategoryListData = await getJobCategoryList();
    } catch (error) {
        console.error("Error while getting job category list", error?.message || error);
        toast.error("Error while getting job category list");
    }
    return { companyData, jobListData, jobTypeListData, jobCategoryListData };
};

function HireTalent() {
    const Job = JobItem.Detail;
    const { companyData, jobListData, jobTypeListData, jobCategoryListData } = useLoaderData() || {};
    const { user } = useUser();

    const company = companyData?.company;
    const jobList = jobListData?.jobs;
    const total_jobs = jobListData?.total_jobs;
    const jobTypes = jobTypeListData?.job_types;
    const jobCategories = jobCategoryListData?.job_categories;

    const renderTotalJobs = (total_jobs) => {
        if (total_jobs > 1) {
            return `${total_jobs} posts`;
        } else if (total_jobs === 1) {
            return "1 post";
        } else {
            return "No post";
        }
    };

    const [showForm, setShowForm] = useState(false);
    const [state, setState] = useState("all");

    if (!companyData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container text-center p-5"
            >
                <div className="alert alert-warning py-4 px-5 rounded-3 shadow-sm">
                    <h2 className="fw-bold mb-3" style={{ color: "var(--primary-color)" }}>
                        No Company Found
                    </h2>
                    <p className="mb-4 text-muted fs-5">
                        It seems like you haven’t created a company yet. Please create a company to proceed.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary btn-lg px-4 py-2"
                        onClick={() => (window.location.href = "/create-company-access")}
                    >
                        Create Company Now
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mb-5">
            <ModalPostJob
                show={showForm}
                setShow={setShowForm}
                company={company}
                jobTypes={jobTypes}
                jobCategories={jobCategories}
            />
            <div className="row mt-2 g-3 g-md-4 g-xl-5 flex-column-reverse flex-md-row">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="col-12 col-md-8"
                >
                    <div className="row py-3">
                        <div className="col-12 d-flex">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary flex-fill"
                                onClick={() => setShowForm(!showForm)}
                            >
                                Create new post
                            </motion.button>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-12 col-md-5 ps-md-4 mb-3 mb-md-0">
                            <select
                                className="form-select"
                                aria-label="Select status of job"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                defaultValue="all"
                            >
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-5 ps-md-4">
                            <select
                                className="form-select"
                                aria-label="Select status of job"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                defaultValue="asc"
                            >
                                <option disabled value="asc">
                                    Time sorting
                                </option>
                                <option value="asc">Ascending</option>
                                <option value="des">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex my-3 ">
                        <motion.span whileHover={{ scale: 1.3 }} className="fw-bold flex-grow-0">
                            {renderTotalJobs(total_jobs)}
                        </motion.span>
                    </div>
                    <ul className="row my-3 g-3 list-unstyled">
                        {jobList ? (
                            Array.isArray(jobList) &&
                            jobList?.map((job, index) => {
                                return (
                                    <motion.li
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={index}
                                        className="col-12"
                                    >
                                        <Link to={`/jobs/${job._id}`} className="text-decoration-none text-dark">
                                            <motion.div
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            >
                                                <Job job={job} isEmployer={false} />
                                            </motion.div>
                                        </Link>
                                    </motion.li>
                                );
                            })
                        ) : (
                            <div className="text-center p-5">
                                <h2 className="fw-bold">No job post</h2>
                            </div>
                        )}
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="col-12 col-md-4"
                >
                    <div className="container shadow rounded">
                        {companyData ? (
                            <>
                                <div className="row justify-content-center">
                                    <div className="mb-3">
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            src={company?.avatar || "https://placehold.co/400"}
                                            className="img-fluid shadow rounded p-0"
                                            style={{ objectFit: "cover" }}
                                            alt="Avatar"
                                        />
                                    </div>
                                    <h2 className="col-auto text-wrap fw-bold fs-4 mt-3 mt-md-0">{company?.name}</h2>
                                </div>
                                <hr className="m-2" />
                                {[
                                    { key: "manager", value: company?.company_manager },
                                    { key: "introduction", value: company?.introduction },
                                    { key: "industry", value: company?.industry },
                                    { key: "location", value: company?.addresses?.[0] },
                                    { key: "contact email", value: company?.company_manager_email },
                                    { key: "website", value: company?.website },
                                ].map((item, index) => (
                                    <div key={index} className="p-3">
                                        <span className="fw-bold">{item.key}: </span>
                                        {item.value ? item.value : <span className="text-muted">Not defined</span>}
                                    </div>
                                ))}
                                <hr className="m-2" />
                                { company?.website && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3">
                                    <a
                                        href={company?.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                        style={{ color: "var(--bs-primary)" }}
                                    >
                                        <FontAwesomeIcon icon={faSquareArrowUpRight} /> Visit website
                                    </a>
                                </motion.div>
                                )}
                            </>
                        ) : (
                            <div className="row">
                                <h2 className="text-center fw-bold">No company data available</h2>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default HireTalent;

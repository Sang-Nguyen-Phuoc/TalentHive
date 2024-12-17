import PostForm from "../../components/Form/PostForm";
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
    // const [jobList, setJobList] = useState();

    if (!companyData) {
        return (
            <div className="container text-center p-5">
                <div className="alert alert-warning py-4 px-5 rounded-3 shadow-sm">
                    <h2 className="fw-bold mb-3" style={{ color: "var(--primary-color)" }}>
                        No Company Found
                    </h2>
                    <p className="mb-4 text-muted fs-5">
                        It seems like you haven’t created a company yet. Please create a company to proceed.
                    </p>
                    <Link
                        to="/create-company-access"
                        className="btn btn-primary btn-lg px-4 py-2"
                        style={{
                            backgroundColor: "#007BFF",
                            borderColor: "#007BFF",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Create Company Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mb-5">
            <PostForm show={showForm} setShow={setShowForm} company={company} jobTypes={jobTypes} jobCategories={jobCategories} />
            <div className="row mt-2 g-3 g-md-4 g-xl-5 flex-column-reverse flex-md-row">
                <div className="col-12 col-md-8">
                    <div className="container shadow rounded">
                        <div className="row py-3">
                            <div className="col-12 d-flex">
                                <button className="btn btn-primary flex-fill" onClick={() => setShowForm(!showForm)}>   
                                    Create new post
                                </button>
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
                                    <option value="all">
                                        All
                                    </option>
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
                                    <option value="asc">
                                        Ascending
                                    </option>
                                    <option value="des">Descending</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <span className="fw-bold">{renderTotalJobs(total_jobs)}</span>
                        </div>
                        <ul className="row my-3 g-3 list-unstyled">
                            {jobList ? (
                                Array.isArray(jobList) &&
                                jobList?.map((job, index) => {
                                    return (
                                        <li className="col-12" key={index}>
                                            <Link to={`/jobs/${job._id}`} className="text-decoration-none text-dark">
                                                <motion.div
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                                >
                                                    <Job job={job} isEmployer={false} />
                                                </motion.div>
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : (
                                <div className="text-center p-5">
                                    <h2 className="fw-bold">No job post</h2>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="container shadow rounded">
                        {companyData ? (
                            <>
                                <div className="row justify-content-center">
                                    <img
                                        src={company?.avatar}
                                        className="img-thumbnail m-3"
                                        style={{ width: 200, aspectRatio: 1, objectFit: "cover" }}
                                        alt="Avatar"
                                    />
                                    <h2 className="col-auto text-wrap fw-bold fs-4 mt-3 mt-md-0">{company?.name}</h2>
                                </div>
                                <hr className="m-2" />
                                <div className="p-3">
                                    <span className="fw-bold">Description: </span>
                                    {company?.description || "Nothing more"}
                                </div>
                                <div className="p-3">
                                    <span className="fw-bold">Industry: </span>
                                    {company?.industry || "Nothing more"}
                                </div>
                                <div className="m-3">
                                    <span className="fw-bold">Our website: </span>
                                    <a className="cursor-pointer text-break" href={company?.website}>
                                        {company?.website || "Nothing more"}
                                    </a>
                                </div>
                                <hr className="m-0" />
                                <div className="text-center d-flex justify-content-center p-3">
                                    <a
                                        className="cursor-pointer d-flex gap-2 align-items-center justify-content-center"
                                        href="/profile/dashboard"
                                    >
                                        View company
                                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-5">
                                <h2 className="fw-bold">No company</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HireTalent;

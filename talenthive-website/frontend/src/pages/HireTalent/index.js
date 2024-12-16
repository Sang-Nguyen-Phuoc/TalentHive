import styles from "../../styles/pages/HireTalent.module.css";
import PostForm from "../../components/Form/PostForm";
import JobItem from "../../components/JobItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJobListAsEmployer } from "../../services/jobsServices";
import { getACompany, getCompanyAsEmployer } from "../../services/companyServices";
import { useUser } from "../../context/UserContext";

const items = [
    {
        state: "pending",
        title: "ReactJS Developer (All level)",
        company: "Sài Gòn Technology",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0tmSGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c0fe0ff712a458d81ebedefb0b36172418e2834d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Black%20(3).png",
        salary: "2000 USD",
        category: "Software engineer",
        candidate: 40,
        location: "Đà Nẵng",
        posted_at: "10",
        expires_at: "19",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male",
    },
    {
        state: "accepted",
        title: "Middle Frontend Engineer (ReactJS/ Typescript)",
        company: "MONEY FORWARD VIETNAM CO.,LTD",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVVIRFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1ae7acc317bfb2f261c8b580725af2d56ae34b7e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/money-forward-vi-t-nam-logo.png",
        salary: "10 - 20 triệu VND",
        category: "Hardware",
        candidate: 19,
        location: "Hồ Chí Minh",
        posted_at: "9",
        expires_at: "21",
        worktime: "fulltime",
        country: "Việt Nam",
        gender: "male/female",
    },
    {
        state: "pending",
        title: "Frontend Engineer (ReactJS) - NAVER FINANCIAL",
        company: "NAVER VIETNAM",
        image: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmxwYVdrPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--c8c20c63b868249effdba9ba4f05aa0c5b77cab3/Naver_Logo(2)-white.png",
        salary: "$1500",
        category: "Banking",
        candidate: 38,
        location: "Hà Nội",
        posted_at: "5",
        expires_at: "15",
        worktime: "part-time",
        country: "Việt Nam",
        gender: "male",
    }
];

export const HireTalentLoader = async () => {
    let companyData = null;
    let jobListData = null;
    try {
        companyData = await getCompanyAsEmployer();
    } catch (error) {
        console.error("Error while getting company", error?.message || error);
        toast.error("Error while getting company");
    }
    try {
        jobListData = await getJobListAsEmployer();
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        toast.error("Error while getting job list");
    }
    console.log("Company data", companyData);
    console.log("Job list data", jobListData);
    return { companyData, jobListData };
}

function HireTalent({ props }) {
    const navigate = useNavigate();
    const Job = JobItem.Detail;
    const { companyData, jobListData } = useLoaderData() || {};
    const { user } = useUser();

    const company = companyData?.company;
    const jobList = jobListData?.jobs;
    const total_jobs = jobListData?.total_jobs;

    console.log("Company", company);
    console.log("Job list", jobList);
    

    const renderTotalJobs = (total_jobs) => {
        if (total_jobs > 1) {
            return `${total_jobs} posts`;
        } else if (total_jobs === 1) {
            return "1 post";
        } else {
            return "No post";
        }
    }

    const [showForm, setShowForm] = useState(false);
    const [state, setState] = useState("all");
    // const [jobList, setJobList] = useState();
    return (
        <div className="container">
            <PostForm show={showForm} setShow={setShowForm} />
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
                                >
                                    <option selected value="all">
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
                                >
                                    <option disabled value="asc">
                                        Time sorting
                                    </option>
                                    <option selected value="asc">
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
                            {(jobList && Array.isArray(jobList)) && jobList?.map((job, index) => {
                                return <li className="col-12" key={index}>
                                    <Job key={index} job={job} isEmployer={false} />
                                </li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="container shadow rounded">
                        {companyData ?(
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
                    ): (
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

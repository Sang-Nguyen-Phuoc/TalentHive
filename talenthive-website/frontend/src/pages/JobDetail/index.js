import { useLoaderData, useLocation, useNavigate } from "react-router";
import JobItem from "../../components/JobItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { getApplicationForJob, getJobCategoryList, getJobDetail, getJobTypeList } from "../../services/jobsServices";
import { toast } from "react-toastify";
import { ROLES } from "../../utils/Constants";
import { useUser } from "../../context/UserContext";
import ModalRemoveJob from "../../components/Modal/ModalRemoveJob";
import ModalUpdateJob from "../../components/Modal/ModalUpdateJob";
import { useState } from "react";
import { Link } from "react-router-dom";

export const jobDetailLoader = async ({ params }) => {
    let jobData = null;
    let jobTypeListData = [];
    let jobCategoryListData = [];
    let applicationData = null;
    try {
        jobData = await getJobDetail(params.id);
    } catch (error) {
        console.error("Error while getting job detail", error?.message || error);
        toast.error("Error while getting job detail");
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
    try {
        applicationData = await getApplicationForJob(params.id);
    } catch (error) {
        console.error("Error while getting application for job", error?.message || error);
    }
    return { jobData, jobTypeListData, jobCategoryListData, applicationData };
};

function JobDetail({ isSearch }) {
    const { role, user } = useUser();
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showApplyModal, setShowApplyModal] = useState(false);

    const { jobData, jobTypeListData, jobCategoryListData, applicationData } = useLoaderData();

    const { job } = jobData;

    const jobTypes = jobTypeListData.job_types;
    const jobCategories = jobCategoryListData.job_categories;
    const application = applicationData?.application;

    const isOwner = job?.employer_id?._id === user?._id;

    const Job = JobItem.Detail;

    return (
        // <div className={`${styles.wrapper} ${isSearch && styles["is-search"]}`}>
        <div className="container mb-5">
            <main className="row g-3 g-md-4 g-lg-5 mt-5 mt-lg-0">
                <div className="col-md-8">
                    <Job
                        job={job}
                        show={showApplyModal}
                        setShow={setShowApplyModal}
                        role={role}
                        application={application}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col shadow rounded-3 p-4">
                                <h2 className="fw-bold mb-3 fs-1">Recruitment Detail</h2>
                                <hr />
                                <h2 className="fs-5 fw-bold">🚀Job Description 🫣🫣🫣</h2>
                                <p className="mb-4">{job?.description}</p>
                                <h2 className="fs-5 fw-bold">🚀 Skills and Experience 🎯📚💡</h2>
                                <ul className="ms-0 ms-sm-4">
                                    {job?.skills && Array.isArray(job.skills) ? (
                                        job.skills.map((skill, index) => (
                                            <li key={index} className="">
                                                {skill}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No skills available</li>
                                    )}
                                </ul>
                                <h2 className="fs-5 fw-bold">🚀 Benefits 🎁🏆🌈</h2>
                                <ul className="ms-0 ms-sm-4">
                                    {job?.benefits && Array.isArray(job.benefits) ? (
                                        job.benefits.map((benefit, index) => (
                                            <li key={index} className="">
                                                {benefit}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No benefits available</li>
                                    )}
                                </ul>
                                {role === ROLES.EMPLOYER && isOwner && (
                                    <>
                                        <hr />
                                        <div className="row d-flex justify-content-evenly">
                                            <button
                                                onClick={() => setShowUpdateModal(true)}
                                                className="col-8 mb-2 mb-sm-0 col-md-4 col-sm-5 btn btn-primary"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => setShowRemoveModal(true)}
                                                className="col-8 col-md-4 col-sm-4 btn btn-danger"
                                            >
                                                Remove
                                            </button>
                                            <ModalUpdateJob
                                                show={showUpdateModal}
                                                setShow={setShowUpdateModal}
                                                jobTypes={jobTypes}
                                                jobCategories={jobCategories}
                                                job={job}
                                            />
                                            <ModalRemoveJob
                                                show={showRemoveModal}
                                                setShow={setShowRemoveModal}
                                                _id={job._id}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="shadow rounded-3 container">
                        <div className="d-flex p-3 flex-wrap">
                            <img
                                className="p-0 shadow-lg rounded"
                                style={{ width: 100, aspectRatio: 1, objectFit: "contain" }}
                                src={job?.company?.logo || "https://via.placeholder.com/150"}
                                alt="logo"
                            />
                            <h2 className="text-wrap fw-bold fs-3 p-2 m-0">{job?.company?.name}</h2>
                        </div>
                        <hr className="m-0" />
                        {[
                            { label: "introduction", value: job?.company?.introduction },
                            { label: "industry", value: job?.company?.industry },
                            { label: "website", value: job?.company?.website },
                        ].map((item, index) => (
                            <div key={index} className="p-3">
                                <span className="fw-bold">{item.label}: </span>
                                {item.value ? (
                                    item.label === "website" ? (
                                        <a className="text-break" href={item.value}>
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-break">{item.value}</span>
                                    )
                                ) : (
                                    <span className="text-muted">not available</span>
                                )}
                            </div>
                        ))}
                        {/* <div className="p-3">
                            <span className="fw-bold">Description: </span>
                            {job?.company?.introduction || "Nothing more"}
                        </div>
                        <div className="p-3">
                            <span className="fw-bold">Industry: </span>
                            {job?.company?.industry || "Nothing more"}
                        </div>
                        <div className="m-3">
                            <span className="fw-bold">Our website: </span>
                            <a className="cursor-pointer text-break" href={job?.company?.website}>
                                {job?.company?.website || "Nothing more"}
                            </a>
                        </div> */}
                        <hr />
                        <h3>Human Resource</h3>
                        {[
                            { label: "Name", value: job?.employer_id?.full_name },
                            { label: "Email", value: job?.employer_id?.contact_email || job?.employer_id?.email },
                            { label: "Phone", value: job?.employer_id?.phone },
                        ].map((item, index) => (
                            <div key={index} className="p-3">
                                <span className="fw-bold">{item.label}: </span>
                                {item.value ? (
                                    <span className="text-break">{item.value}</span>
                                ) : (
                                    <span className="text-muted">not available</span>
                                )}
                            </div>
                        ))}
                        <hr className="m-0" />
                        <div className="text-center d-flex justify-content-center p-3">
                            <Link
                                className="cursor-pointer d-flex gap-2 align-items-center justify-content-center"
                                to={`/employer/${job?.employer_id?._id}/dashboard`}
                            >
                                View company
                                <FontAwesomeIcon icon={faSquareArrowUpRight} />
                            </Link>
                        </div>
                        <div></div>
                    </div>
                    {/* <div className={styles.general}>
                        <p className={styles.title}>General</p>
                    </div> */}
                </div>
            </main>
        </div>
    );
}

export default JobDetail;

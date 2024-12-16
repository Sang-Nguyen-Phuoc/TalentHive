import { useLoaderData, useLocation, useNavigate } from "react-router";
import JobItem from "../../components/JobItem";
import styles from "../../styles/pages/JobDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import ApplicationForm from "../../components/Form/ApplicationForn";
import { getJobDetail } from "../../services/jobsServices";
import { toast } from "react-toastify";

export const jobDetailLoader = async ({ params }) => {
    try {
        const data = await getJobDetail(params.id);
        return data;
    } catch (error) {
        console.error("Error while getting job detail", error?.message || error);
        toast.error("Error while getting job detail");
        throw error;
    }
};

function JobDetail({ isSearch }) {
    const data = useLoaderData();
    const { job } = data;

    const Job = JobItem.Detail;

    const role = "Employer";
    const handleUpdate = (e) => {
        alert("Modal Update post");
    };
    const handleRemove = (e) => {
        alert("Do you want to delete this post?");
    };
    return (
        // <div className={`${styles.wrapper} ${isSearch && styles["is-search"]}`}>
        <div className="container">
            <main className="row g-3 g-md-4 g-lg-5 mt-5 mt-lg-0">
                <div className="col-md-8">
                    <Job job={job} isEmployer={role === "Employer"} ApplicationForm={ApplicationForm} />
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
                                {role === "Employer" && (
                                    
                                    <>
                                        <hr/>
                                        <div className="row d-flex justify-content-evenly">
                                            <button
                                                onClick={handleUpdate}
                                                className="col-8 mb-2 mb-sm-0 col-md-4 col-sm-5 btn btn-primary"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={handleRemove}
                                                className="col-8 col-md-4 col-sm-4 btn btn-danger"
                                            >
                                                Remove
                                            </button>
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
                                style={{ width: 100, aspectRatio: 1, objectFit: "cover" }}
                                src={job?.company?.logo || "https://via.placeholder.com/150"}
                                alt="logo"
                            />
                            <h2 className="text-wrap fw-bold fs-3 p-2 m-0">{job?.company?.name}</h2>
                        </div>
                        <hr className="m-0" />
                        <div className="p-3">
                            <span className="fw-bold">Description: </span>
                            {job?.company?.description || "Nothing more"}
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

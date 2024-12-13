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
}

function JobDetail({ isSearch }) {
    const data = useLoaderData();
    const {job} = data;
    
    const Job = JobItem.Detail;


    const navigate = useNavigate();
    const role = "Worker";
    const handleUpdate = (e) => {
        alert("Modal Update post");
    };
    const handleRemove = (e) => {
        alert("Do you want to delete this post?");
    };
    const location = useLocation();
    return (
        <div className={`${styles.wrapper} ${isSearch && styles["is-search"]}`}>
            <div className={styles["job-description"]}>
                <Job job={job} isEmployer={role === "Employer"} ApplicationForm={ApplicationForm}/>
                <div className={styles.detail + " container"}>
                    <div className="row">
                        <p className={styles.title + " fs-3"}>Recruitment Detail</p>
                        <div>
                            <h2 className="fs-4 text-decoration-underline">Job Description</h2>
                            <p className="mb-4">{job?.description}</p>
                        </div>
                        <div>
                            <h2 className="fs-4 text-decoration-underline">Skills and Experience</h2>
                            <p className="mb-4">{job?.skills}</p>
                        </div>
                        <div>
                            <h2 className="fs-4 text-decoration-underline">Benefit</h2>
                            <p className="mb-4">{job?.benefits}</p>
                        </div>
                        {role === "Employer" && (
                            <div className={styles["btn-container"]}>
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={handleRemove} className={styles["remove-btn"]}>
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles["general-description"]}>
                <div className={styles.company}>
                    <div className={styles.avatar}>
                        <img src={job?.company?.logo || "https://via.placeholder.com/150"} alt="logo" />
                        <h2 className="fw-bold p-3">{job?.company?.name}</h2>
                    </div>
                    <div className="p-3"><span className="fw-bold">Description: </span>{job?.company?.description || "Nothing more"}</div>
                    <div className="p-3"><span className="fw-bold">Industry: </span>{job?.company?.industry || "Nothing more"}</div>
                    <div className="m-3"><span className="fw-bold">Our website: </span><a className="cursor-pointer" href={job?.company?.website}>{job?.company?.website || "Nothing more"}</a></div>
                    <div className="m-3 text-center d-flex justify-content-center">
                        <a className="cursor-pointer d-flex gap-2 align-items-center justify-content-center" href="/profile/dashboard">
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
        </div>
    );
}

export default JobDetail;

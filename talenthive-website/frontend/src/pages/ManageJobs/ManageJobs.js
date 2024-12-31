import { Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getJobListByAdmin } from "../../services/jobsServices";
import { NavLink, useSearchParams } from "react-router-dom";
import ModalAdminApproveJob from "../../components/Modal/admin/ModalAdminApproveJob";
import ModalAdminRejectJob from "../../components/Modal/admin/ModalAdminRejectJob";
import { JOB_STATUSES } from "../../utils/Constants";

export const jobListLoader = async () => {
    let jobListData = null;
    try {
        jobListData = await getJobListByAdmin();
        console.log("job list data", jobListData);
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        toast.error("Error while getting job list");
    }
    return { jobListData };
};

function ManageJobs() {
    const navigate = useNavigate();
    const { jobListData } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const tmpId = useParams().id;

    const [state, setState] = useState(searchParams.get("state") || "all");
    const [jobId, setJobId] = useState();
    const [jobList, setJobList] = useState(jobListData?.jobs || []);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    useEffect(() => {
        setSearchParams({ state });
    }, [state, setSearchParams]);

    useEffect(() => {
        const filteredList =
            state === "all"
                ? jobListData?.jobs || []
                : (jobListData?.jobs || []).filter((job) => job.status === state);
        setJobList(filteredList);
    }, [state, jobListData]);

    const displayJobNumber = () => {
        if (jobList.length === 0) {
            return "No job found";
        } else if (jobList.length === 1) {
            return "1 job";
        } else {
            return `${jobList.length} jobs`;
        }
    }

    return (
        <main className="container">
            {showApproveModal && (
                <ModalAdminApproveJob show={showApproveModal} setShow={setShowApproveModal} _id={jobId} role="job" />
            )}
            {showRejectModal && (
                <ModalAdminRejectJob
                    show={showRejectModal}
                    setShow={setShowRejectModal}
                    _id={jobId}
                    role="job"
                />
            )}
            <div className={`row my-4 my-md-5 ${tmpId ? "" : "justify-content-center"}`}>
                <div className={`${tmpId ? "col-md-4" : "col-12 col-md-8"}`}>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="fw-bold d-flex align-items-end">{displayJobNumber()}</span>
                        <div>
                            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="all">All</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <ul
                        className="d-flex flex-column gap-2 overflow-y-auto list-unstyled align-items-stretch"
                        style={{ height: "100vh" }}
                    >
                        {jobList.map((job, index) => {
                            return (
                                <li key={job?._id} className="">
                                    <NavLink
                                        className={(props) =>
                                            `btn shadow border p-2 flex-fill d-flex flex-column gap-1 ${
                                                props.isReject ? "bg-info" : "bg-white"
                                            }`
                                        }
                                        index={index}
                                        to={`/admin/manage-jobs/${job?._id}`}
                                    >
                                        <div className="d-flex gap-2">
                                            <img
                                                src={job?.image || "https://placehold.co/400"}
                                                alt="image"
                                                className="img-thumbnail"
                                                width="100"
                                                height="100"
                                            />
                                            <div className="flex-fill d-flex justify-content-between gap-1 flex-wrap">
                                                <div style={{ flex: "1 1 60px" }}>
                                                    <span className="fw-bold text-wrap text-break">
                                                        {job?.title}
                                                    </span>
                                                </div>
                                                <div>
                                                {job?.status === "pending" ? (
                                                    <span
                                                                className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                                style={{
                                                                    fontSize: "0.8rem",
                                                                    backgroundColor: "#1a4a81",
                                                                    color: "#FFFFFF",
                                                                }}
                                                            >
                                                            Pending
                                                        </span>):(<span></span>)}
                                                    {job?.status === "approved" ? (
                                                    <span
                                                                className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                                style={{
                                                                    fontSize: "0.8rem",
                                                                    backgroundColor: "#68D69D",
                                                                    color: "#401D83",
                                                                }}
                                                            >Approved
                                                        </span>):(<span></span>)}
                                                    {job?.status === "rejected" ? (
                                                        <span
                                                        className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            backgroundColor: "#C20000",
                                                            color: "#D9D9D9",
                                                        }}
                                                    >
                                                        Rejected
                                                    </span>
                                                    ):(<span></span>)}
                                                </div>
                                            </div>
                                        </div>
                                        {/* action */}
                                        <div className="d-flex gap-1 justify-content-center flex-wrap">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    navigate(`/jobs/${job._id}`);
                                                }}
                                            >
                                                View
                                            </button>
                                            {job?.status === JOB_STATUSES.PENDING && (
                                                <div>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setJobId(job._id);
                                                        console.log(job._id);

                                                        setShowApproveModal(true);
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setJobId(job._id);
                                                    setShowRejectModal(true);
                                                }}
                                            >
                                                Reject
                                            </button>
                                            </div>
                                            )}
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={!tmpId ? "" : "col-md-8"}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default ManageJobs;
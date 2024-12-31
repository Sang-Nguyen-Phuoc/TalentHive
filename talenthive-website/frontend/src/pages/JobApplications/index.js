import { toast } from "react-toastify";
import { getAllJobApplications } from "../../services/jobsServices";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import axiosCustom from "../../utils/axiosCustom";

export const applicationLoader = async ({ params }) => {
    let applicationData = null;
    try {
        applicationData = await getAllJobApplications(params.id);
    } catch (error) {
        console.error("Error while getting applications for job", error?.message || error);
        toast.error("Error while getting applications for job");
    }
    return { applicationData };
};

const JobApplications = () => {
    const { applicationData } = useLoaderData();
    const [state, setState] = useState("all");
    const navigate = useNavigate();
    return (
        <main className="container">
            <div className={`row my-4 my-md-5 justify-content-center`}>
                <div className={`col-12 col-md-8`}>
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <span className="fw-bold fs-3">{state === 'all' ? applicationData.length : applicationData.filter(application => application.status === state).length} candidates</span>
                        <div>
                            <select
                                className="form-select"
                                aria-label="Select status of job"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="accepted">Accepted</option>
                            </select>
                        </div>
                    </div>
                    <ul className="d-flex flex-column gap-2 overflow-y-auto list-unstyled" style={{ height: "100vh" }}>
                        {applicationData.filter(application => state === 'all' || application.status === state).map((application) => (
                            <li key={application?._id} className="d-flex">
                                <div className = "shadow border p-2 flex-fill d-flex flex-column gap-1 bg-white"
                                >
                                    <div className="d-flex gap-2">
                                        <img
                                            src={application?.avatar || "https://placehold.co/400"}
                                            alt="avatar"
                                            className="img-thumbnail"
                                            width="100"
                                            height="100"
                                        />
                                        <div className="flex-fill d-flex justify-content-between gap-1 flex-wrap">
                                            <div style={{ flex: "1 1 60px" }}>
                                                <span className="fw-bold text-wrap text-break">
                                                    {application?.full_name}
                                                </span>
                                            </div>
                                            <div>
                                                {application?.status === "pending" ? (
                                                    <span
                                                        className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            backgroundColor: "#FFC700",
                                                            color: "#401D83",
                                                        }}
                                                    >
                                                        Pending
                                                    </span>
                                                ) : (application?.status === "rejected") ? (
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
                                                ) : (
                                                    <span
                                                        className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            backgroundColor: "#68D69D",
                                                            color: "#401D83",
                                                        }}
                                                    >
                                                        Accepted
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="text-start">Email</th>
                                                    <td className="text-start text-wrap">{application.email}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">Phone</th>
                                                    <td className="text-start text-wrap">{application.phone}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">Skills</th>
                                                    <td className="text-start text-wrap">{application.skills}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">Experience</th>
                                                    <td className="text-start text-wrap">{application.worker_experience}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">Certification</th>
                                                    <td className="text-start text-wrap">{application.certification}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">Cover Letter</th>
                                                    <td className="text-start text-wrap">{application.cover_letter}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="text-start">CV</th>
                                                    <td className="text-start text-wrap">{application.cv}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* action */}
                                    <div className="d-flex gap-1 justify-content-center flex-wrap">
                                        {application?.status === "pending" && (
                                            <>
                                                <button
                                                className="btn btn-sm btn-outline-success"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    try {
                                                        await axiosCustom.post(`/api/v1/applications/jobs/${application.job_id._id}/applications/${application._id}`,
                                                            { status: "accepted" }
                                                        );
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error("Error while accepting application", error?.message || error);
                                                        toast.error("Error while accepting application");
                                                    }
                                                }}
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    try {
                                                        axiosCustom.post(`/api/v1/applications/jobs/${application.job_id._id}/applications/${application._id}`,
                                                            { status: "rejected" }
                                                        );
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error("Error while rejecting application", error?.message || error);
                                                        toast.error("Error while rejecting application");
                                                    }
                                                }}
                                                >
                                                    Reject
                                                </button>
                                            
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default JobApplications;
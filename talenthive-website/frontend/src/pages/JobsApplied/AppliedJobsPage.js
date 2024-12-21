import { useState } from "react";
import JobItem from "../../components/JobItem";
import AppliedJobItem from "../../components/JobItem/AppliedJobItem";
import { Outlet, useLoaderData, useParams } from "react-router";
import { getMyAppliedJobs } from "../../services/jobsServices";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import ApplicationDetail from "./ApplicationDetail";

export const appliedJobsLoader = async () => {
    let appliedJobsData = null;

    try {
        appliedJobsData = await getMyAppliedJobs();
    } catch (error) {
        console.error("Error while getting applied jobs", error?.message || error);
        toast.error("Error while getting applied jobs");
    }

    return { appliedJobsData };
};

const AppliedJobsPage = () => {
    const isfullpage = !useParams().id;
    
    
    const { appliedJobsData } = useLoaderData();
    const [state, setState] = useState("all");
    const [sortType, setSortType] = useState("asc");

    const jobs = appliedJobsData?.jobs || [];

    const [selectedJob, setSelectedJob] = useState(null);

    console.log("applications in applied jobs", jobs);

    return (
        <main className="container my-5">
            <div className="row flex-column-reverse flex-md-row">
                <div className={`${isfullpage ? "col-md-12" : "col-md-8"}`}>
                    <div className="row justify-content-end mb-3">
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
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
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
                    <div className="row justify-content-start mb-3 fw-bold fs-5">
                        <div className="col-12">10 applied jobs</div>
                    </div>
                    <ul className="list-unstyled" style={{ overflowY: "auto", height: "70vh" }}>
                        {jobs?.length > 0 ? (
                            jobs.map((job) => (
                                <li key={job._id}>
                                    <NavLink
                                        to={`/applied-jobs/application/${job?.application?._id}`}
                                        className={({ isActive }) =>
                                            `text-decoration-none ${isActive ? "fw-bold text-primary" : "text-dark"}`
                                        }
                                    >
                                        <AppliedJobItem job={job} />
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            <p>No jobs applied yet.</p>
                        )}
                    </ul>
                </div>
                <Outlet />
            </div>
        </main>
    );
};

export default AppliedJobsPage;

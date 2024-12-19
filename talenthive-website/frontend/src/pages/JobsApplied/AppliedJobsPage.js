import { useState } from "react";
import JobItem from "../../components/JobItem";
import AppliedJobItem from "../../components/JobItem/AppliedJobItem";

const jobList = [
    {
        id: 1,
        position: "Frontend Developer",
        company: "Facebook",
        salary: "$4000 - $5000",
        location: "Remote",
        category: "IT",
        posted_at: "2021-10-10",
        expires_at: "2021-10-20",
        image: "https://via.placeholder.com/150",
        state: "pending",
    },
    {
        id: 2,
        position: "Backend Developer",
        company: "Google",
        salary: "$5000 - $6000",
        location: "Remote",
        category: "IT",
        posted_at: "2021-10-10",
        expires_at: "2021-10-20",
        image: "https://via.placeholder.com/150",
        state: "accepted",
    },
    {
        id: 3,
        position: "Fullstack Developer",
        company: "Amazon",
        salary: "$6000 - $7000",
        location: "Remote",
        category: "IT",
        posted_at: "2021-10-10",
        expires_at: "2021-10-20",
        image: "https://via.placeholder.com/150",
        state: "rejected",
    }
]

const AppliedJobsPage = () => {
    const [state, setState] = useState("all");
    const [sortType, setSortType] = useState("asc");
    const Job = JobItem.Detail;

    return (
        <main className="container my-5">
            <div className="row">
                <div className="col-md-8">
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
                    <ul className="list-unstyled">
                        {jobList.map((job) => (
                            <li key={job._id}>
                                <AppliedJobItem job={job} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="card shadow rounded">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                                <img
                                    src="https://via.placeholder.com/150x150"
                                    className="img-fluid rounded"
                                    width="150"
                                    height="150"
                                    alt="company logo"
                                />
                                <h2 className="text-break text-wrap">Company name</h2>
                            </div>
                            <hr />
                            <h5 className="card-title">Profile</h5>
                            <p className="card-text">Full Name: John Doe</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AppliedJobsPage;

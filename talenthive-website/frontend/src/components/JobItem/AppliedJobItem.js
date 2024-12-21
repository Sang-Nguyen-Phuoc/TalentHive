import { faCircleDollarToSlot, faFilter, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { useLoaderData } from "react-router";

const AppliedJobItem = ({ job }) => {
    const { applicationData } = useLoaderData();


    
    return (
        <div className="container shadow rounded-3 px-4 mb-4 border-5 bg-white">
            <div className="row py-3">
                <h2 className="col-sm-8 fw-bold fs-4 m-0">{job?.title}</h2>
                <p
                    className="col-sm-4 fw-bold m-0 d-flex align-items-center justify-content-end"
                    style={{ color: "green" }}
                >
                    {job?.status}
                </p>
            </div>

            <hr className="m-0" />

            <div className="row d-flex justify-content-between align-content-center flex-wrap py-3">
                <div className="col-md-4 d-flex align-items-center gap-2 mb-4 mb-md-0">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className="opacity-50" />
                    <span>{job?.salary_range}</span>
                </div>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-4 mb-md-0">
                    <FontAwesomeIcon icon={faLocationDot} className="opacity-50" />
                    <span>{job?.address?.split(",").pop()}</span>
                </div>
                <div className="col-md-4 d-flex align-items-center gap-2 mb-4 mb-md-0">
                    <FontAwesomeIcon icon={faFilter} className="opacity-50" />
                    <span>{job?.job_category}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between align-content-center flex-wrap py-2 pb-3">
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    Post {formatDistanceToNow(new Date(job?.posted_at || 0), { addSuffix: true })}
                </span>
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {formatDistanceToNow(new Date(job?.expires_at || 0), { addSuffix: true })}
                </span>
            </div>
        </div>
    );
};

export default AppliedJobItem;

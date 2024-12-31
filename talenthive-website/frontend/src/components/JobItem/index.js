import { useNavigate } from "react-router";
import styleHome from "../../styles/components/JobItemHome.module.css";
import styleDetail from "../../styles/components/JobItemDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faFilter, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import ModalApplyJob from "../Modal/ModalApplyJob";
import { ROLES } from "../../utils/Constants";

const JobItem = {
    ////// HOME PAGE //////
    HomePage: ({ job, state }) => {
        const navigate = useNavigate();
        return (
            <div className={styleHome.wrapper} onClick={() => navigate(`/jobs/${job?._id}`)}>
                <div className={styleHome.header}>
                    <div className={styleHome["left-header"]}>
                        <img
                            src={job?.image || "https://via.placeholder.com/150"}
                            alt="logo"
                            className="object-fit-contain"
                        ></img>
                    </div>
                    <div className={styleHome["right-header"]}>
                        <p className={styleHome.position}>{job?.position}</p>
                        <p className={styleHome["company-name"]}>{job?.company}</p>
                    </div>
                    {state && <p className={`${styleHome[state]} ${styleHome.toggle}`}>{state}</p>}
                </div>
                <div className={styleHome.description}>
                    <div className={styleHome.salary}>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleHome.icon} />
                        <p>{job?.salary}</p>
                    </div>
                    <div className={styleHome.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleHome.icon} />
                        <p>{job?.address}</p>
                    </div>
                    <div className={styleHome.category}>
                        <FontAwesomeIcon icon={faFilter} className={styleHome.icon} />
                        <p>{job?.category}</p>
                    </div>
                </div>
                <div className={styleHome.timeline}>
                    <p>Post {formatDistanceToNow(new Date(job?.posted_at), { addSuffix: true })}</p>
                    <p>Expires {formatDistanceToNow(new Date(job?.expires_at), { addSuffix: true })}</p>
                </div>
            </div>
        );
    },

    ////// SEARCH PAGE //////
    SearchPage: ({ job }) => {
        return (
            <div className="d-flex flex-column gap-1 shadow rounded-3 p-3 border border-1 border-secondary bg-white">
                <div className="d-flex gap-3">
                    <img className="img-fluid" style={{ height: 90 }} src={job?.image} alt="logo" />
                    <div>
                        <h3 className="fw-bold fs-4 mb-2">{job?.title}</h3>
                        <p className="text-muted text-start mb-0">{job?.company}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                    <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-muted opacity-75" />
                        <span>{job?.salary}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faLocationDot} className="text-muted opacity-75" />
                        <span>{job?.address}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faFilter} className="text-muted opacity-75" />
                        <span>{job?.category}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted" style={{ fontSize: 13 }}>
                        Post{" "}
                        {formatDistanceToNow(new Date(job?.posted_at || 0), { addSuffix: true, includeSeconds: true })}
                    </span>
                    <span className="text-muted" style={{ fontSize: 13 }}>
                        Expires{" "}
                        {formatDistanceToNow(new Date(job?.expires_at || 0), { addSuffix: true, includeSeconds: true })}
                    </span>
                </div>
            </div>
        );
    },

    ////// HIRE TALENT PAGE //////
    Detail: ({ job, show, setShow, role, application }) => {        
        return (
            <div className="container shadow rounded-3 px-4 mb-4 border border-1 border-secondary bg-white mb-lg-2">
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
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleDetail.icon} />
                        <span>{job?.salary_range}</span>
                    </div>
                    <div className="col-md-4 d-flex align-items-center gap-2 mb-4 mb-md-0">
                        <FontAwesomeIcon icon={faLocationDot} className={styleDetail.icon} />
                        <span>{job?.address}</span>
                    </div>
                    <div className="col-md-4 d-flex align-items-center gap-2 mb-4 mb-md-0">
                        <FontAwesomeIcon icon={faFilter} className={styleDetail.icon} />
                        <span>{job?.job_category}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-content-center flex-wrap py-2 pb-3">
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                        Post{" "}
                        {formatDistanceToNow(new Date(job?.posted_at || 0), { addSuffix: true, includeSeconds: true })}
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                        Expires{" "}
                        {formatDistanceToNow(new Date(job?.expires_at || 0), { addSuffix: true, includeSeconds: true })}
                    </span>
                </div>
                <div className={styleDetail.footer}>
                    {job?.status === "approved" && (
                        <p className={styleDetail.candidate}>{`Candidates quantity (${job?.applications_count})`}</p>
                    )}
                </div>
                {role === ROLES.CANDIDATE && (
                    <div>
                        <hr className="m-0" />
                        <div className="d-flex justify-content-center py-3">
                            <button className="col col-sm-8 btn btn-primary " onClick={() => setShow(true)}>
                                {application ? "Update application" : "Apply now"}
                            </button>
                            <ModalApplyJob show={show} setShow={setShow} job={job} application={application} />
                        </div>
                    </div>
                )}
            </div>
        );
    },
};

export default JobItem;

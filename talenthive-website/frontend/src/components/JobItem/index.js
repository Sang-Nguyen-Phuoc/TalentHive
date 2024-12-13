import { useNavigate } from "react-router";
import styleSearch from "../../styles/components/JobItemSearch.module.css";
import styleHome from "../../styles/components/JobItemHome.module.css";
import styleDetail from "../../styles/components/JobItemDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faFilter, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';

const JobItem = {
    ////// HOME PAGE //////
    HomePage: ({ job, state }) => {
        const navigate = useNavigate();

        return (
            <div
                className={styleHome.wrapper}
                onClick={() => navigate(`/jobs/${job?._id}`)}
            >
                <div className={styleHome.header}>
                    <div className={styleHome["left-header"]}>
                        <img src={job?.image || "https://via.placeholder.com/150"} 
                        alt="logo"></img>
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
                        <p>{job?.location}</p>
                    </div>
                    <div className={styleHome.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleHome.icon} />
                        <p>{job?.sector}</p>
                    </div>
                </div>
                <div className={styleHome.timeline}>
                    <p>Post {formatDistanceToNow(new Date(job?.posted_at), { addSuffix: true })}</p>
                    <p>{formatDistanceToNow(new Date(job?.expires_at), { addSuffix: true })}</p>
                </div>
            </div>
        );
    },

    ////// SEARCH PAGE //////
    SearchPage: ({ props, state, selected }) => {
        return (
            <div className={`${styleSearch.wrapper} ${selected === true && styleSearch.selected}`}>
                <div className={styleSearch.header}>
                    <p className={styleSearch.position}>{props.position}</p>
                    {state && <p className={styleSearch[state]}>{state}</p>}
                </div>
                <div className={styleSearch["company-container"]}>
                    <img className={styleSearch["company-img"]} src={props?.image} alt="logo"></img>
                    <p className={styleSearch["company-name"]}>{props.company}</p>
                </div>
                <div className={styleSearch["salary-container"]}>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleSearch.icon} />
                    <p>{props.salary}</p>
                </div>
                <div className={styleSearch.description}>
                    <div className={styleSearch.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleSearch.icon} />
                        <p>{props.location}</p>
                    </div>
                    <div className={styleSearch.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleSearch.icon} />
                        <p>{props.sector}</p>
                    </div>
                </div>
                <div className={styleSearch.timeline}>
                    <p className={styleSearch.createAt}>Post {props.createAt} hours ago</p>
                    <p>{props.endAt} days left</p>
                </div>
            </div>
        );
    },

    ////// HIRE TALENT PAGE //////
    Detail: ({ job, isEmployer, ApplicationForm }) => {
        const navigate = useNavigate();
        const [show, setShow] = useState(false);

        const handleNavigate = () => {
            navigate("/jobs/detail");
        };

        return (
            <div className={styleDetail.wrapper} onClick={handleNavigate}>
                <div className={styleDetail.header}>
                    <p className={styleDetail.position}>{job?.title}</p>
                    {isEmployer && <p className={styleDetail[job?.status]}>{job?.status}</p>}
                </div>

                <div className={styleDetail.description}>
                    <div className={styleDetail.salary}>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className={styleDetail.icon} />
                        <p>{job?.salary}</p>
                    </div>
                    <div className={styleDetail.location}>
                        <FontAwesomeIcon icon={faLocationDot} className={styleDetail.icon} />
                        <p>{job?.location}</p>
                    </div>
                    <div className={styleDetail.sector}>
                        <FontAwesomeIcon icon={faFilter} className={styleDetail.icon} />
                        <p>{job?.category}</p>
                    </div>
                </div>
                <div className={styleDetail.timeline}>
                    <p className={styleDetail.createAt}>Post {formatDistanceToNow(new Date(job?.posted_at || 0), { addSuffix: true })}</p>
                    <p>{formatDistanceToNow(new Date(job?.expires_at || 0), { addSuffix: true })}</p>
                </div>
                <div className={styleDetail.footer}>
                    {isEmployer && job?.status === "accepted" && (
                        <p
                            className={styleDetail.candidate}
                        >{`Candidate list (${job?.applications_count})`}</p>
                    )}
                </div>
                {!isEmployer && (
                    <>
                        <button
                            className={styleDetail.apply}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                setShow(true); // Show modal
                            }}
                        >
                            Apply now
                        </button>
                        {/* Render ApplicationForm */}
                        <ApplicationForm show={show} setShow={setShow} />
                    </>
                )}
            </div>
        );
    },
};

export default JobItem;

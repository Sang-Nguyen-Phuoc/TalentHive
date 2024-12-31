import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { useLoaderData } from "react-router";
import { getEmployerById, getUserById } from "../../services/userServices";
import JobItem from "../../components/JobItem";
import { getJobsByCompany } from "../../services/jobsServices";
import { useState } from "react";
import ModalUpdateCompany from "../../components/Modal/ModalUpdateCompany";
import ModalUpdateEmployer from "../../components/Modal/ModalUpdateEmployer";
import { getHumanResourceList } from "../../services/companyServices";
import { Link } from "react-router-dom";
import ModalGetAccessionCode from "../../components/Modal/ModalGetAccessionCode";

const MotionLink = motion.create(Link);

// Loader Function
export const employerDashboardLoader = async ({ params }) => {
    const { id } = params;
    let userData = null;
    let jobListData = null;
    let humanResourceData = null;
    try {
        userData = await getEmployerById(id);
    } catch (error) {
        console.error("Error while getting employer data:", error?.message || error);
    }

    try {
        jobListData = await getJobsByCompany(userData?.user?.company?._id);
    } catch (error) {
        console.error("Error while getting job list data:", error?.message || error);
    }

    try {
        humanResourceData = await getHumanResourceList(userData?.user?.company?._id);
    } catch (error) {
        console.error("Error while getting human resource data:", error?.message || error);
    }

    return { userData, jobListData, humanResourceData };
};

// Variants for animations
const animationVariants = {
    fadeIn: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
    zoomIn: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
};

// Subcomponents
const ProfileHeader = ({ isOwner, isManager, onOpenModalEdition, company, onOpenModalGetAccessionCode }) => {
    if (!company)
        return (
            <motion.div
                className="shadow rounded border border-1 border-secondary p-2 d-flex flex-column flex-sm-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                No company profile found
            </motion.div>
        );

    return (
        <motion.div
            className="shadow rounded border border-1 border-secondary p-2 d-flex flex-column flex-sm-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.img
                src={company?.avatar || "https://placehold.co/600x400"}
                alt="Avatar"
                className="img-fluid shadow-lg rounded border border-1"
                style={{ objectFit: "contain", maxHeight: 200 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            />
            <div className="flex-fill position-relative">
                <motion.h1
                    className=""
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {company?.name || "None"}
                </motion.h1>
                {company?.introduction && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted mb-3"
                        style={{ fontSize: "1rem" }}
                    >
                        {company?.introduction || "Company Introduction"}
                    </motion.p>
                )}
                <div className="mb-3">
                    {company?.industry && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-1"
                        >
                            <strong>Industry: </strong>
                            {company?.industry}
                        </motion.p>
                    )}
                    {company?.website && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mb-1"
                        >
                            <strong>Website: </strong>
                            <a href={company?.website} target="_blank" rel="noopener noreferrer">
                                {company?.website}
                            </a>
                        </motion.p>
                    )}
                    {company?.addresses?.length > 0 && (
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mb-1 ps-3"
                        >
                            <strong>Addresses: </strong>
                            {company?.addresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))}
                        </motion.ul>
                    )}
                </div>
                <div
                    className="d-flex flex-wrap gap-2 justify-content-end"
                    style={{ bottom: 0, right: 0, boxSizing: "content-box" }}
                >
                    {isOwner && (
                        <motion.button
                            className="btn btn-primary"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={onOpenModalEdition}
                        >
                            Edit Company Profile
                        </motion.button>
                    )}
                    {isManager && isOwner && (
                        <motion.button
                            className="btn btn-primary"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={onOpenModalGetAccessionCode}
                        >
                            Get Accession Code
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Card = ({ title, children, delay = 0.1 }) => (
    <motion.div
        className="card mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
    >
        <h2
            className="text-white fs-5 p-2 m-0 fw-bold"
            style={{ backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))" }}
        >
            {title}
        </h2>
        <div className="p-2">{children}</div>
    </motion.div>
);

const JobList = ({ jobList }) => {
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredJobs = filterStatus === "all" ? jobList : jobList.filter((job) => job.status === filterStatus);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="my-3">
                <label htmlFor="statusFilter" className="form-label fw-bold">
                    Filter by Status:
                </label>
                <select
                    id="statusFilter"
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <p className="text-muted">
                Showing {filteredJobs?.length} of {jobList?.length} jobs
            </p>

            <ul className="row my-3 g-3 list-unstyled">
                {filteredJobs?.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <motion.li
                            className="col-12"
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link to={`/jobs/${job._id}`} className="text-decoration-none text-dark">
                                <JobItem.Detail job={job} isEmployer={false} />
                            </Link>
                        </motion.li>
                    ))
                ) : (
                    <motion.div className="text-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="fw-bold">No jobs found</h2>
                    </motion.div>
                )}
            </ul>
        </motion.div>
    );
};

const EmployerDashboard = () => {
    const { user } = useUser();
    const { userData, jobListData, humanResourceData } = useLoaderData();
    console.log({ humanResourceData });

    const userById = userData?.user;
    const isOwner = user?._id === userById?._id;
    const isManager = humanResourceData?.company_manager?._id === user?._id;

    const [showModalUpdateCompany, setShowModalUpdateCompany] = useState(false);
    const [showModalUpdateEmployer, setShowModalUpdateEmployer] = useState(false);
    const [showModalGetAccessionCode, setShowModalGetAccessionCode] = useState(false);

    return (
        <div className="container py-4">
            {showModalUpdateCompany && (
                <ModalUpdateCompany
                    company={userById?.company}
                    onClose={() => setShowModalUpdateCompany(false)}
                    show={showModalUpdateCompany}
                />
            )}
            {showModalUpdateEmployer && (
                <ModalUpdateEmployer
                    employer={userById}
                    onClose={() => setShowModalUpdateEmployer(false)}
                    show={showModalUpdateEmployer}
                />
            )}

            {showModalGetAccessionCode && (
                <ModalGetAccessionCode
                    company={userById?.company}
                    onClose={() => setShowModalGetAccessionCode(false)}
                    show={showModalGetAccessionCode}
                />
            )}

            <ProfileHeader
                company={userById?.company}
                isOwner={isOwner}
                isManager={isManager}
                onOpenModalEdition={() => setShowModalUpdateCompany(true)}
                onOpenModalGetAccessionCode={() => setShowModalGetAccessionCode(true)}
            />

            <div className="row mt-4">
                <div className="col-12 col-md-4">
                    <motion.div className="d-flex mb-4 border bg-white rounded" variants={animationVariants.fadeIn}>
                        <div className="w-50">
                            <img
                                src={userById?.avatar || "https://placehold.co/300x300"}
                                alt="employer avatar"
                                className="img-fluid rounded-circle shadow"
                                style={{ aspectRatio: 1, objectFit: "cover" }}
                            />
                        </div>
                        <div className="flex-fill d-flex flex-column justify-content-center">
                            <motion.h6 className="fw-bold text-center fs-4" variants={animationVariants.fadeIn}>
                                {userById?.full_name || "No Name"}
                            </motion.h6>
                        </div>
                    </motion.div>
                    <Card title="Introduction">
                        <motion.p
                            className="p-0"
                            variants={animationVariants.fadeIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                        >
                            {userById?.introduction || (
                                <span className="text-muted ps-2">This user has not provided any introduction</span>
                            )}
                        </motion.p>
                    </Card>
                    <Card title="Contact" delay={0.2}>
                        {[
                            { label: "Email", value: userById?.contact_email },
                            { label: "Phone", value: userById?.phone },
                            { label: "Address", value: userById?.address },
                        ].map((item, index) => (
                            <motion.p
                                key={index}
                                className="mb-2 mt-1"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <strong>{item.label}: </strong>
                                {item.value || <span className="text-muted">not provided</span>}
                            </motion.p>
                        ))}
                    </Card>
                    {isOwner && (
                        <div className="d-flex justify-content-end mb-4">
                            <motion.button
                                className="btn btn-primary"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => setShowModalUpdateEmployer(true)}
                            >
                                Update Profile
                            </motion.button>
                        </div>
                    )}

                    {humanResourceData && (
                        <Card title="Members" delay={0.3}>
                            {[
                                { label: "HR Manager", value: humanResourceData?.company_manager },
                                ...humanResourceData?.employers?.map((employer) => ({
                                    label: "Employer",
                                    value: employer,
                                })),
                            ].map((item, index) => {
                                return (
                                    <MotionLink
                                        key={index}
                                        className="text-decoration-none text-dark mb-3 d-block"
                                        to={`/employer/${item?.value?._id}/dashboard`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.div
                                            className=""
                                        >
                                            <h3 className="fs-4 text-decoration-underline">{item.label}</h3>
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={item?.value?.avatar || "https://placehold.co/300x300"}
                                                    alt="avatar"
                                                    className="img-thumbnail rounded-circle"
                                                    style={{ height: 50 }}
                                                />
                                                <div className="">
                                                    <strong>{item?.value?.full_name}</strong>
                                                    <br />
                                                    <span className="text-break">{item?.value?.contact_email}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </MotionLink>
                                );
                            })}
                        </Card>
                    )}
                </div>

                <div className="col-12 col-md-8">
                    <h2
                        className="text-white fs-5 p-2 m-0 fw-bold rounded-top"
                        style={{
                            backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                        }}
                    >
                        Recruitment
                    </h2>
                    <JobList jobList={jobListData?.jobs} />
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;

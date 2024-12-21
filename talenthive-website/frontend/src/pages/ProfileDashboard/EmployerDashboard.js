import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useLoaderData } from "react-router";
import { getEmployerById, getUserById } from "../../services/userServices";
import JobItem from "../../components/JobItem";
import { getJobsByCompany } from "../../services/jobsServices";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalUpdateCompany from "../../components/Modal/ModalUpdateCompany";

// Loader Function
export const employerDashboardLoader = async ({ params }) => {
    const { id } = params;
    try {
        const userData = await getEmployerById(id);
        const jobListData = await getJobsByCompany(userData?.user?.company?._id);
        return { userData, jobListData };
    } catch (error) {
        console.error("Error loading data", error?.message || error);
        toast.error("Failed to load employer dashboard");
        return { userData: null, jobListData: null };
    }
};

// Variants for animations
const animationVariants = {
    fadeIn: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
    zoomIn: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
};

// Subcomponents
const ProfileHeader = ({ isOwner, onOpenModalEdition, company }) => (
    <motion.div
        className="shadow rounded border border-1 border-secondary p-2 d-flex flex-column flex-sm-row gap-3"
        variants={animationVariants.fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
    >
        <motion.img
            src="https://robohash.org/1"
            alt="Avatar"
            className="img-fluid shadow-lg rounded border border-1"
            style={{ objectFit: "contain", maxHeight: 200 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        />
        <div className="flex-fill position-relative">
            <motion.h1
                className=""
                variants={animationVariants.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
            >
                {company?.name || "None"}
            </motion.h1>
            {company?.introduction && (
                <motion.p
                    variants={animationVariants.fadeIn}
                    initial="hidden"
                    animate="visible"
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
                        variants={animationVariants.fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                        className="mb-1"
                    >
                        <strong>Industry: </strong>{company?.industry}
                    </motion.p>
                )}
                {company?.website && (
                    <motion.p
                        variants={animationVariants.fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="mb-1"
                    >
                        <strong>Website: </strong>
                        <a href={company?.website} target="_blank" rel="noopener noreferrer">
                            {company?.website}
                        </a>
                    </motion.p>
                )}
                {company?.addresses && company?.addresses.length > 0 && (
                    <motion.p
                        variants={animationVariants.fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.7 }}
                        className="mb-1"
                    >
                        <strong>Addresses: </strong>
                        <ul className="pl-3">
                            {company?.addresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))}
                        </ul>
                    </motion.p>
                )}
            </div>
            {isOwner && (
                <motion.button
                    className="position-absolute btn btn-primary"
                    style={{ bottom: 0, right: 0, boxSizing: "content-box" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={onOpenModalEdition}
                >
                    Edit Company Profile
                </motion.button>
            )}
        </div>
    </motion.div>
);

const Card = ({ title, children, delay = 0.1 }) => (
    <motion.div
        className="card overflow-hidden mb-4"
        variants={animationVariants.zoomIn}
        initial="hidden"
        animate="visible"
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
  const [filterStatus, setFilterStatus] = useState("all"); // State cho filter status

  // Lọc jobs theo filterStatus
  const filteredJobs =
    filterStatus === "all"
      ? jobList
      : jobList.filter((job) => job.status === filterStatus);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants.fadeIn} // Toàn bộ container có hiệu ứng fade-in
    >
      {/* Bộ lọc status */}
      <motion.div
        className="my-3"
        variants={animationVariants.slideIn} // Slide-in cho bộ lọc
      >
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
      </motion.div>

      {/* Hiển thị số jobs */}
      <motion.p
        className="text-muted"
        variants={animationVariants.slideIn} // Slide-in cho số lượng jobs
      >
        Showing {filteredJobs.length} of {jobList.length} jobs
      </motion.p>

      {/* Danh sách jobs */}
      <ul className="row my-3 g-3 list-unstyled">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <motion.li
              className="col-12"
              key={index}
              variants={animationVariants.fadeIn} // Fade-in từng job
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }} // Hiệu ứng hover
              whileTap={{ scale: 0.95 }} // Hiệu ứng khi nhấn
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Link
                to={`/jobs/${job._id}`}
                className="text-decoration-none text-dark"
              >
                <JobItem.Detail job={job} isEmployer={false} />
              </Link>
            </motion.li>
          ))
        ) : (
          <motion.div
            className="text-center p-5"
            variants={animationVariants.fadeIn} // Fade-in khi không có job
            initial="hidden"
            animate="visible"
          >
            <h2 className="fw-bold">No jobs found</h2>
          </motion.div>
        )}
      </ul>
    </motion.div>
  );
};


const EmployerDashboard = () => {
    const { user } = useUser();
    const { userData, jobListData } = useLoaderData();
    const userById = userData?.user;
    const isOwner = user?._id === userById?._id;

    console.log("User Data:", userData);
    

    const [showModalUpdateCompany, setShowModalUpdateCompany] = useState(false);
    

    return (
        <div className="container py-4">
            <ModalUpdateCompany company={userById?.company} onClose={() => setShowModalUpdateCompany(false)} show={showModalUpdateCompany} />
            <ProfileHeader company={userById?.company} isOwner={isOwner} onOpenModalEdition={() => setShowModalUpdateCompany(true)} />

            <div className="row mt-4">
                <div className="col-12 col-md-4">
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

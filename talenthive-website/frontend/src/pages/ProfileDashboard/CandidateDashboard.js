import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { getCandidateById } from "../../services/userServices";
import { useState } from "react";
import { useLoaderData } from "react-router";
import ModalUpdateCandidate from "../../components/Modal/ModalUpdateCandidate";
import { motion } from "framer-motion";

export const candidateDashboardLoader = async ({ params }) => {
    const { id } = params;
    let userData = null;

    try {
        userData = await getCandidateById(id);
    } catch (error) {
        console.error("Error while loading candidate dashboard", error?.message || error);
        toast.error("Error while loading candidate dashboard");
    }

    return { userData };
};

const CandidateDashboard = () => {
    const { user } = useUser();
    const { userData } = useLoaderData();
    const userById = userData?.user;

    const isOwner = user?._id === userById?._id;

    const [showModalEdit, setShowModalEdit] = useState(false);

    return (
        <div className="container py-4">
            <ModalUpdateCandidate candidate={userById} onClose={() => setShowModalEdit(false)} show={showModalEdit} />

            {/* Profile Header */}
            <motion.div
                className="shadow rounded border border-1 border-secondary p-2 d-flex flex-column flex-sm-row gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.img
                    src={"https://robohash.org/1" || "https://robohash.org/1"}
                    alt="Avatar"
                    className="img-fluid shadow-lg rounded border border-1"
                    style={{ maxHeight: 200, objectFit: "contain" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="flex-fill position-relative">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {userById?.full_name || "No name"}
                    </motion.h1>
                    {isOwner && (
                        <motion.button
                            className="position-absolute btn btn-primary"
                            style={{ bottom: 0, right: 0, boxSizing: "content-box" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => setShowModalEdit(true)}
                        >
                            Edit profile
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Profile Details */}
            <div className="row mt-4">
                <div className="col-12 col-md-8">
                    <motion.div
                        className="card overflow-hidden mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h2
                            className="text-white fs-5 p-2 m-0 fw-bold"
                            style={{
                                backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Introduction
                        </motion.h2>
                        <div className="p-2">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                            >
                                {userById?.introduction || (
                                    <span className="text-muted ps-4">This user has not provided any introduction</span>
                                )}
                            </motion.p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="card overflow-hidden mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h2
                            className="text-white fs-5 p-2 fw-bold m-0"
                            style={{
                                backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Skills
                        </motion.h2>
                        <div className="p-2">
                            {userById?.skills && userById?.skills?.length ? (
                                <ul>
                                    {Array.isArray(userById.skills) ? userById.skills.map((skill, index) => (
                                        <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                            {skill}
                                        </motion.li>
                                    )) : userById.skills.split(",").map((skill, index) => (
                                        <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                            {skill}
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-muted ps-3">This user has not provided any skills</span>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="card overflow-hidden mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h2
                            className="text-white fs-5 p-2 fw-bold m-0"
                            style={{
                                backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Certification
                        </motion.h2>
                        <div className="p-2">
                            {userById?.certification && userById?.certification?.length ? (
                                <ul>
                                    {Array.isArray(userById.certification) ? userById.certification.map((cert, index) => (
                                        <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                            {cert}
                                        </motion.li>
                                    )) : userById.certification.split(",").map((cert, index) => (
                                        <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                            {cert}
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-muted ps-3">This user has not provided any skills</span>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="card overflow-hidden mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h2
                            className="text-white fs-5 p-2 fw-bold m-0"
                            style={{
                                backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Work experience
                        </motion.h2>
                        <div className="p-2">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                            >
                                {userById?.work_experience || (
                                    <span className="text-muted ps-3">
                                        This user has not provided any work experience
                                    </span>
                                )}
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                {/* Contact */}
                <div className="col-12 col-md-4">
                    <motion.div
                        className="card overflow-hidden mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h2
                            className="text-white fs-5 p-2 fw-bold m-0"
                            style={{
                                backgroundImage: "linear-gradient(to right, #1a4a81, var(--primary-color))",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Contact Info
                        </motion.h2>
                        <motion.div className="p-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            >
                            {[
                                { label: "Email", value: userById?.contact_email },
                                { label: "Phone", value: userById?.phone },
                                { label: "Address", value: userById?.address },
                                { label: "City", value: userById?.city },
                            ].map((field, index) => (
                                <p key={index}>
                                    <strong>{field.label}:</strong>{" "}
                                    {field.value ? field.value : <span className="text-muted">not provided</span>}
                                </p>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
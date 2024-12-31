import { Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useSearchParams } from "react-router-dom";
import { getCandidateListByAdmin } from "../../services/userServices";
import { toast } from "react-toastify";
import ModalAdminBlockUser from "../../components/Modal/admin/ModalAdminBlockUser";
import ModalAdminActiveUser from "../../components/Modal/admin/ModalAdminActiveUser";
import { USER_STATUSES } from "../../utils/Constants";

export const candidateListLoader = async () => {
    try {
        const candidateListData = await getCandidateListByAdmin();
        console.log("candidate list data", candidateListData);
        return { candidateListData };
    } catch (error) {
        console.error("Error while getting candidate list", error?.message || error);
        toast.error("Error while getting candidate list");
        return { candidateListData: null };
    }
};

function ManageWorkers() {
    const navigate = useNavigate();
    const { candidateListData } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const tmpId = useParams().id;

    const [state, setState] = useState(searchParams.get("state") || "all");
    const [userId, setUserId] = useState();
    const [candidateList, setCandidateList] = useState(candidateListData?.candidates || []);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showActiveModal, setShowActiveModal] = useState(false);

    useEffect(() => {
        setSearchParams({ state });
    }, [state, setSearchParams]);

    useEffect(() => {
        const filteredList =
            state === "all"
                ? candidateListData?.candidates || []
                : (candidateListData?.candidates || []).filter(
                      (user) => user.status === state
                  );
        setCandidateList(filteredList);
    }, [state, candidateListData]);

    return (
        <main className="container">
            {showBlockModal && (
                <ModalAdminBlockUser show={showBlockModal} setShow={setShowBlockModal} _id={userId} role="candidate" />
            )}
            {showActiveModal && (
                <ModalAdminActiveUser
                    show={showActiveModal}
                    setShow={setShowActiveModal}
                    _id={userId}
                    role="candidate"
                />
            )}

            <div className={`row my-4 my-md-5 ${tmpId ? "" : "justify-content-center"}`}>
                <div className={`${tmpId ? "col-md-4" : "col-12 col-md-8"}`}>
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <span className="fw-bold">{candidateList.length} users</span>
                        <div>
                            <select
                                className="form-select"
                                aria-label="Select status of job"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value={USER_STATUSES.ACTIVE}>Active</option>
                                <option value={USER_STATUSES.LOCKED}>Locked</option>
                            </select>
                        </div>
                    </div>
                    <ul className="d-flex flex-column gap-2 overflow-y-auto list-unstyled" style={{ height: "100vh" }}>
                        {candidateList.map((user, index) => (
                            <li key={user?._id} className="d-flex">
                                <NavLink
                                    className={(props) =>
                                        `btn shadow border p-2 flex-fill d-flex flex-column gap-1 ${
                                            props.isActive ? "bg-info bg-opacity-50" : "bg-white"
                                        }`
                                    }
                                    index={index}
                                    to={`/admin/manage-candidates/${user?._id}`}
                                >
                                    <div className="d-flex gap-2">
                                        <img
                                            src={user?.avatar || "https://placehold.co/400"}
                                            alt="avatar"
                                            className="img-thumbnail"
                                            width="100"
                                            height="100"
                                        />
                                        <div className="flex-fill d-flex justify-content-between gap-1 flex-wrap">
                                            <div style={{ flex: "1 1 60px" }}>
                                                <span className="fw-bold text-wrap text-break">
                                                    {user?.full_name}
                                                </span>
                                            </div>
                                            <div>
                                                {user?.status === USER_STATUSES.ACTIVE ? (
                                                    <span
                                                        className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            backgroundColor: "#68D69D",
                                                            color: "#401D83",
                                                        }}
                                                    >
                                                        Active <FontAwesomeIcon icon={faUnlock} />
                                                    </span>
                                                ) : (
                                                    <span
                                                        className=" rounded px-2 py-1 d-flex align-items-center gap-2"
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            backgroundColor: "#C20000",
                                                            color: "#D9D9D9",
                                                        }}
                                                    >
                                                        Locked <FontAwesomeIcon icon={faLock} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-muted text-break">{user?.email}</span>
                                    </div>
                                    {/* action */}
                                    <div className="d-flex gap-1 justify-content-center flex-wrap">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                navigate(`/candidate/${user._id}/dashboard`);
                                            }}
                                        >
                                            View
                                        </button>
                                        {user?.status === USER_STATUSES.ACTIVE && (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setUserId(user._id);
                                                    setShowBlockModal(true);
                                                }}
                                            >
                                                Block
                                            </button>
                                        )}
                                        {user?.status === USER_STATUSES.LOCKED && (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setUserId(user._id);
                                                    setShowActiveModal(true);
                                                }}
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={tmpId ? "col-md-8" : ""}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default ManageWorkers;

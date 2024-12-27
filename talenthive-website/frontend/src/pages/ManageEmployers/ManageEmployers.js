import { Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getEmployerListByAdmin } from "../../services/userServices";
import { NavLink, useSearchParams } from "react-router-dom";
import ModalAdminBlockUser from "../../components/Modal/admin/ModalAdminBlockUser";
import ModalAdminActiveUser from "../../components/Modal/admin/ModalAdminActiveUser";
import { USER_STATUSES } from "../../utils/Constants";

export const employerListLoader = async () => {
    let employerListData = null;
    try {
        employerListData = await getEmployerListByAdmin();
        console.log("employer list data", employerListData);
    } catch (error) {
        console.error("Error while getting employer list", error?.message || error);
        toast.error("Error while getting employer list");
    }
    return { employerListData };
};

function ManageEmployers() {
    const navigate = useNavigate();
    const { employerListData } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const tmpId = useParams().id;

    const [state, setState] = useState(searchParams.get("state") || "all");
    const [userId, setUserId] = useState();
    const [employerList, setEmployerList] = useState(employerListData?.employers || []);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showActiveModal, setShowActiveModal] = useState(false);

    useEffect(() => {
        setSearchParams({ state });
    }, [state, setSearchParams]);

    useEffect(() => {
        const filteredList =
            state === "all"
                ? employerListData?.employers || []
                : (employerListData?.employers || []).filter((user) => user.status === state);
        setEmployerList(filteredList);
    }, [state, employerListData]);

    return (
        <main className="container">
            {showBlockModal && (
                <ModalAdminBlockUser show={showBlockModal} setShow={setShowBlockModal} _id={userId} role="employer" />
            )}
            {showActiveModal && (
                <ModalAdminActiveUser
                    show={showActiveModal}
                    setShow={setShowActiveModal}
                    _id={userId}
                    role="employer"
                />
            )}
            <div className={`row my-4 my-md-5 ${tmpId ? "" : "justify-content-center"}`}>
                <div className={`${tmpId ? "col-md-4" : "col-12 col-md-8"}`}>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="fw-bold d-flex align-items-end">99 users</span>
                        <div>
                            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <ul
                        className="d-flex flex-column gap-2 overflow-y-auto list-unstyled align-items-stretch"
                        style={{ height: "100vh" }}
                    >
                        {employerList.map((user, index) => {
                            return (
                                <li key={user?._id} className="">
                                    <NavLink
                                        className={(props) =>
                                            `btn shadow border p-2 flex-fill d-flex flex-column gap-1 ${
                                                props.isActive ? "bg-info" : "bg-white"
                                            }`
                                        }
                                        index={index}
                                        to={`/admin/manage-employers/${user?._id}`}
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
                                                    {user?.status === "active" ? (
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
                                                onClick={() => navigate(`/profile/${user?._id}`)}
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
                                                        console.log(user._id);

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
                            );
                        })}
                    </ul>
                </div>
                <div className={!tmpId ? "" : "col-md-8"}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default ManageEmployers;

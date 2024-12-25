import { Outlet, useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { items } from "../Home/items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { getCandidateListByAdmin } from "../../services/userServices";
import { toast } from "react-toastify";

export const candidateListLoader = async () => {
    let candidateListData = null;
    try {
        candidateListData = await getCandidateListByAdmin();
        console.log("candidate list data", candidateListData);
    } catch (error) {
        console.error("Error while getting candidate list", error?.message || error);
        toast.error("Error while getting candidate list");
    }
    return { candidateListData };
};

function ManageWorkers() {
    const navigate = useNavigate();
    const { candidateListData } = useLoaderData();
    const candidateList = candidateListData?.candidates || [];

    const [state, setState] = useState("");
    const [selected, setSelected] = useState(0);

    const userList = [
        {
            _id: 1,
            name: "John Doe",
            avatar: "https://robohash.org/1?set=set2",
            status: "active",
        },
        {
            _id: 2,
            name: "Jane Doe",
            avatar: "https://robohash.org/2?set=set2",
            status: "locked",
        },
        {
            _id: 3,
            name: "John Smith",
            avatar: "https://robohash.org/3?set=set2",
            status: "active",
        },
        {
            _id: 4,
            name: "Jane Smith",
            avatar: "https://robohash.org/4?set=set2",
            status: "locked",
        },
    ];

    return (
        <main className="container">
            <div className="row my-4 my-md-5">
                <div className="col-md-3">
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <span className="fw-bold">99 users</span>
                        <div>
                            <select className="form-select" aria-label="Select status of job" value={state}>
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="locked">Locked</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2 overflow-y-auto" style={{ height: "80vh" }}>
                        {candidateList.map((user, index) => {
                            return (
                                <NavLink
                                    key={user._id}
                                    className="btn bg-light shadow border p-2 d-flex gap-2 flex-wrap"
                                    index={index}
                                    to={`/admin/manage-candidates/${user._id}`}
                                >
                                    {/* <div className="d-flex justify-content-between flex-wrap"> */}
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="img-thumbnail"
                                        width="100"
                                        height="100"
                                    />
                                    <div className="flex-fill d-flex justify-content-between gap-1 flex-wrap">
                                        <span className="fw-bold">{user.full_name}</span>
                                        <div>
                                            {user.status === "active" ? (
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
                                    {/* </div> */}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <div className="col-md-9">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default ManageWorkers;

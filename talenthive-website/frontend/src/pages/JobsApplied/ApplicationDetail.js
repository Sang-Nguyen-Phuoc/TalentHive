import { useLoaderData } from "react-router";
import { getApplicationDetail } from "../../services/jobsServices";
import { toast } from "react-toastify";
import ModalApplyJob from "../../components/Modal/ModalApplyJob";
import { useState } from "react";
import ModalDeleteApplication from "../../components/Modal/ModalDeleteApplication";

export const appliedJobDetailLoader = async ({params}) => {
    const id = params.id;
    try {
        const applicationData = await getApplicationDetail(id);
        return { applicationData };
    } catch (error) {
        console.error("Error while getting job detail", error?.message || error);
        toast.error("Error while getting job detail");
        return { applicationData: null };
    }
}

const ApplicationDetail = () => {  
    const { applicationData } = useLoaderData();
    const application = applicationData?.application;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    return (
        <div className="col-md-4 mb-md-0 mb-4">
            <div className="card shadow rounded">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start gap-1 flex-wrap">  
                        <img
                            src={`https://robohash.org/1?set=set2/${application?.company?.name}`}
                            className="img-fluid rounded"
                            width="150"
                            height="150"
                            alt="company logo"
                            style={{ flex: "1 1 150px", maxWidth: "150px" }}
                        />
                        <div style={{ flex: "1 1 150px"}}>
                            <h2 className="text-break text-wrap">{application?.company?.name}</h2>
                            { application?.company?.description && <p>{application?.company?.description}</p> }
                            { application?.company?.industry && <p>Industry: {application?.company?.industry}</p> }
                            { application?.company?.website && 
                                <p>
                                    <a href={application?.company?.website} target="_blank" rel="noreferrer">
                                        {application?.company?.website}
                                    </a>
                                </p>
                            }
                            
                        </div>
                    </div>
                    <hr />
                    <h5 className="card-title">Profile</h5>
                    { [
                        { key: "Name", value: application?.full_name },
                        { key: "Email", value: application?.email },
                        { key: "Phone", value: application?.phone },
                        { key: "Skills", value: application?.skills },
                        { key: "Work Experience", value: application?.work_experience },
                        { key: "Certifications", value: application?.certification},
                        { key: "Cover letter", value: application?.cover_letter }
                    ].map((item, index) => (
                        <p key={index}>
                            <span className="fw-bold">{item.key}: </span>
                            {item.value}
                        </p>
                    ))}
                    {/* add button update and delete */}
                    {application?.status === "pending" && (
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-primary" onClick={() => setShowUpdateModal(true)}>Update</button>
                            <ModalApplyJob show={showUpdateModal} setShow={setShowUpdateModal} application={application} job={application.job}/>

                            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete</button>
                            <ModalDeleteApplication show={showDeleteModal} setShow={setShowDeleteModal} id={application._id}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ApplicationDetail;
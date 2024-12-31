import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { postAdminApproveJob } from "../../../services/jobsServices";

const ModalAdminApproveJob = ({ show, setShow, _id, role }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleApproveJob = async () => {
        setLoading(true);
        try {
            await postAdminApproveJob(_id);
            navigate(`/admin/manage-jobs/${_id}`);
            setShow(false)
        } catch (error) {
            console.error("Error while approving this job", error?.message || error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Approve</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure that you want to approve this job posting?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleApproveJob}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Approve"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAdminApproveJob;
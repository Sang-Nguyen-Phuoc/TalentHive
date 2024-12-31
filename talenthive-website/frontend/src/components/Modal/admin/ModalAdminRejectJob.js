import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { postAdminRejectJob } from "../../../services/jobsServices";

const ModalAdminRejectJob = ({ show, setShow, _id, role }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleRejectJob = async () => {
        setLoading(true);
        try {
            await postAdminRejectJob(_id);
            navigate(`/admin/manage-jobs/${_id}`);
            setShow(false)
        } catch (error) {
            console.error("Error while rejecting this job", error?.message || error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Reject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure that you want to reject this job posting?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleRejectJob}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Reject"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAdminRejectJob;
import { useNavigate } from "react-router";
import { deleteJob } from "../../services/jobsServices";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";


const ModalRemoveJob = ({ show, setShow, _id }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleRemove = async () => {
        setLoading(true);
        try {
            const data = await deleteJob(_id);
            navigate("/hire-talent");
        } catch (error) {
            console.error("Error while removing job", error?.message || error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this job?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Remove"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRemoveJob;
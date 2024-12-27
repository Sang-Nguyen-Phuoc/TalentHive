import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { postAdminBlockUser } from "../../../services/userServices";

const ModalAdminBlockUser = ({ show, setShow, _id, role }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleBlockUser = async () => {
        setLoading(true);
        try {
            await postAdminBlockUser(_id);
            if (role === "employer") {
                navigate(`/admin/manage-employers/${_id}`);
            } else if (role === "candidate") {
                navigate(`/admin/manage-candidates/${_id}`);
            }
            setShow(false)
        } catch (error) {
            console.error("Error while lock user", error?.message || error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Lock User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to lock this user</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleBlockUser}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Lock"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAdminBlockUser;

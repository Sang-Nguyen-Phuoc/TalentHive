import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { postAdminUnlockUser } from "../../../services/userServices";

const ModalAdminActiveUser = ({ show, setShow, _id, role }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleActiveUser = async () => {
        setLoading(true);
        try {
            await postAdminUnlockUser(_id);
            if (role === "employer") {
                navigate(`/admin/manage-employers/${_id}`);
            } else if (role === "candidate") {
                navigate(`/admin/manage-candidates/${_id}`);
            }
            setShow(false)

        } catch (error) {
            console.error("Error while unlocking this user", error?.message || error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Re-active user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to activate this user?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleActiveUser}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Active"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAdminActiveUser;

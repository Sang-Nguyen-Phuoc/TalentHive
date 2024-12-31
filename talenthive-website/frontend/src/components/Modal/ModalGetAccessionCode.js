import { toast } from "react-toastify";
import { getAccessionCode } from "../../services/companyServices";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const ModalGetAccessionCode = ({ show, onClose, company }) => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [receivedEmail, setReceivedEmail] = useState("");

    // Use effect to fetch data on modal open
    useEffect(() => {
        const fetchAccessionCode = async () => {
            if (show) {
                setLoading(true);
                try {
                    const data = await getAccessionCode(company._id); // Assumes this function sends the email
                    setReceivedEmail(data?.email || "");
                    setEmailSent(true);
                    toast.success("Accession code sent successfully to your email.");
                } catch (error) {
                    console.error("Error while getting accession code:", error?.message || error);
                    toast.error("Failed to send accession code. Please try again later.");
                }
                setLoading(false);
            }
        };

        fetchAccessionCode();
    }, [show, company.id]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Accession Code Sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Sending accession code to your email...</p>
                ) : (
                    <p>
                        {emailSent
                            ? `The accession code has been sent to your registered email address (${receivedEmail}). Please check your email.`
                            : "Unable to send the accession code. Please try again later."}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalGetAccessionCode;

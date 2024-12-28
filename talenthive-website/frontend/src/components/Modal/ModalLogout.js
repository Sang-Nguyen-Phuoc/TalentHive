import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from "../../utils/authToken";
import { useUser } from "../../context/UserContext";
import { set } from 'date-fns';


const ModalLogout = ({show, setShow}) => {
    const navigate = useNavigate();
    const { logout } = useUser();
    const handleLogout = () => {
        logout();
        removeAccessToken();
        setShow(false);
        navigate("/");
    };
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered size='sm'>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Sign out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogout;
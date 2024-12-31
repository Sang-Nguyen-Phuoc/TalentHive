import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axiosCustom from '../../utils/axiosCustom';


const ModalDeleteApplication = ({show, setShow, id}) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
      // delete application
      
      try {
          await axiosCustom.delete(`/api/v1/applications/${id}`);
      } catch (error) {
          console.error("Error while deleting application", error?.message || error);
          toast.error("Error while deleting application");
      }
      setShow(false);
      navigate('/applied-jobs');
      window.location.reload();
  };
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered size='sm'>
        <Modal.Body>Are you sure you want to delete application?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteApplication;
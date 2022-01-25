import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { verifying } from "../actions/userActions";

const VerifyBox = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userVerifyId");

  const deleteHandler = () => {
    if (userId) {
      dispatch(verifying(userId));
      localStorage.removeItem("userVerifyId");
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Verify</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure, you want to Verify the user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            <i className="fas fa-times"></i> Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setShow(false);
              deleteHandler();
            }}
          >
            <i className="fas fa-check"></i> Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerifyBox;

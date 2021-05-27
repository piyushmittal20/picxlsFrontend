import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeStartag } from "../actions/startagActions";
import { deleteUser } from "../actions/userActions";
import { deletePost } from "../actions/postActions";

const DeleteModal = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const delStarId = localStorage.getItem("delStarId");
  const delUserId = localStorage.getItem("delUserId");
  const delPostId = localStorage.getItem("delPostId");

  const deleteHandler = () => {
    if (delStarId) {
      dispatch(removeStartag(delStarId));
      localStorage.removeItem("delStarId");
    }
    if (delUserId) {
      dispatch(deleteUser(delUserId));
      localStorage.removeItem("delUserId");
    }
    if (delPostId) {
      dispatch(deletePost(delPostId));
      localStorage.removeItem("delPostId");
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            <strong>Delete</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure, you want to Delete ?</Modal.Body>
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

export default DeleteModal;

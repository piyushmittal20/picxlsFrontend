import {useDispatch} from 'react-redux';
import {logout} from '../actions/authActions';
import { Button, Modal } from "react-bootstrap";

const LogoutBox = ({show, setShow}) => {
    const dispatch = useDispatch();

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Logout</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure, you want to Logout!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            <i className="fas fa-times"></i> Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setShow(false);
              dispatch(logout());
            }}
          >
            <i className="fas fa-check"></i> Yes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default LogoutBox

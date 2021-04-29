import {useState} from 'react'
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {dropping} from '../actions/userActions';

const DropModal = ({show, setShow}) => {
    const [description, setDescription] = useState('');
    const [descErr, setDescErr] = useState('');

    const validate = () => {
      let descErr = ''

      if(!description) {
        descErr = 'Please enter a reason'
      }

      if(descErr) {
        setDescErr(descErr)
        return false
      }

      return TextTrackCueList
    }

    const dispatch = useDispatch()

    const userId = localStorage.getItem('userDropId')

    const deleteHandler = () => {

        const desc = {
          reason: description
        }

        if(userId) {

          const isValid = validate()
          if(isValid) {}

            dispatch(dropping(desc, userId))
            localStorage.removeItem('userVerifyId')
        }
    }

    return (
        <>
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            <strong>Drop User</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">Sure, you want to Drop the user ?</Modal.Body>
        <Modal.Body className="modal-body">
            <input className="modal-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Reason to drop.." />
            <span className="error-msg">{descErr}</span>
        </Modal.Body>
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
            <i className="fas fa-check"></i> Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default DropModal

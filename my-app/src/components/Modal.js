import {Button, Modal} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { updateCountryStatus, updateCityStatus, updateStateStatus } from '../actions/masterSettings';
import {changeStatus} from '../actions/cmsActions';
import { updateUserStatus } from '../actions/userActions';

const Modals = ({show, setShow, status}) => {

  const countryId = localStorage.getItem('countryId');
  const cityId = localStorage.getItem('cityId');
  const stateId = localStorage.getItem('stateId');
  const pageId = localStorage.getItem('pageId');
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch()

  const deleteHandler = () => {
    if(countryId) {
      const country = {
        status: !status
      }
      dispatch(updateCountryStatus(country, countryId))
      localStorage.removeItem('countryId')
    }
    if(cityId) {
      const city = {
        status: !status
      }
      dispatch(updateCityStatus(city, cityId))
      localStorage.removeItem('cityId')
    }
    if(stateId) {
      const state = {
        status: !status
      }
      dispatch(updateStateStatus(state, stateId))
      localStorage.removeItem('stateId')
    }
    if(pageId) {
      const page = {
        status: !status
      }
      dispatch(changeStatus(page, pageId))
      localStorage.removeItem('pageId')
    }
    if(userId) {
      const user = {
        status: !status
      }
      dispatch(updateUserStatus(user, userId))
      localStorage.removeItem('userId')
    }
  }

    return (
        <>
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "black"}}><strong>Change Status</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure, you want to Change the Status!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
          <i className="fas fa-times"></i> Cancel
          </Button>
          <Button variant="dark" 
            onClick={() => {
                setShow(false);
                deleteHandler();
            }}>
          <i className="fas fa-check"></i> Yes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Modals

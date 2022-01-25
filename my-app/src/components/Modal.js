import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  updateCountryStatus,
  updateCityStatus,
  updateStateStatus,
} from "../actions/masterSettings";
import { changeStatus } from "../actions/cmsActions";
import {
  updateUserStatus,
  userReportUpdateStatus,
} from "../actions/userActions";
import { updateStartagStatus } from "../actions/startagActions";
import { updatePostStatus, reportStatusUpdate } from "../actions/postActions";
import { taxUpdateStatus } from "../actions/taxActions";
import { contactStatusUpdate } from "../actions/contactActions";
import {
  commentStatusUpdate,
  updateReplyStatus,
} from "../actions/abuseActions";

const Modals = ({ show, setShow, status }) => {
  const countryId = localStorage.getItem("countryId");
  const cityId = localStorage.getItem("cityId");
  const stateId = localStorage.getItem("stateId");
  const pageId = localStorage.getItem("pageId");
  const userId = localStorage.getItem("userId");
  const starId = localStorage.getItem("starId");
  const postId = localStorage.getItem("postId");
  const reportId = localStorage.getItem("reportId");
  const reportUserId = localStorage.getItem("reportUserId");
  const taxId = localStorage.getItem("taxId");
  const contactId = localStorage.getItem("contactId");
  const commentId = localStorage.getItem("commentId");
  const replyId = localStorage.getItem("replyId");

  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (countryId) {
      const country = {
        status: !status,
      };
      dispatch(updateCountryStatus(country, countryId));
      localStorage.removeItem("countryId");
    }
    if (cityId) {
      const city = {
        status: !status,
      };
      dispatch(updateCityStatus(city, cityId));
      localStorage.removeItem("cityId");
    }
    if (stateId) {
      const state = {
        status: !status,
      };
      dispatch(updateStateStatus(state, stateId));
      localStorage.removeItem("stateId");
    }
    if (pageId) {
      const page = {
        status: !status,
      };
      dispatch(changeStatus(page, pageId));
      localStorage.removeItem("pageId");
    }
    if (userId) {
      const user = {
        status: !status,
      };
      dispatch(updateUserStatus(user, userId));
      localStorage.removeItem("userId");
    }
    if (starId) {
      const startag = {
        isActive: !status,
      };
      dispatch(updateStartagStatus(startag, starId));
      localStorage.removeItem("starId");
    }
    if (postId) {
      const post = {
        status: !status,
      };
      dispatch(updatePostStatus(post, postId));
      localStorage.removeItem("postId");
    }
    if (reportId) {
      const report = {
        status: !status,
      };
      dispatch(reportStatusUpdate(report, reportId));
      localStorage.removeItem("reportId");
    }
    if (reportUserId) {
      const report = {
        status: !status,
      };
      dispatch(userReportUpdateStatus(report, reportUserId));
      localStorage.removeItem("reportUserId");
    }
    if (taxId) {
      const tax = {
        status: !status,
      };
      dispatch(taxUpdateStatus(tax, taxId));
      localStorage.removeItem("taxId");
    }
    if (contactId) {
      const contact = {
        status: !status,
      };
      dispatch(contactStatusUpdate(contact, contactId));
      localStorage.removeItem("contactId");
    }
    if (commentId) {
      const comment = {
        isActive: !status,
      };
      console.log(comment);
      dispatch(commentStatusUpdate(comment, commentId));
      localStorage.removeItem("commentId");
    }
    if (replyId) {
      const reply = {
        isActive: !status,
      };
      dispatch(updateReplyStatus(reply, replyId));
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>Sure, you want to Change the Status ?</Modal.Body>
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

export default Modals;

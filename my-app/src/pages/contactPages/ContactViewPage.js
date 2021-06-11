import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { contactDetails } from "../../actions/contactActions";
import { OverlayTrigger, Tooltip, Row, Badge } from "react-bootstrap";
import { BsFillReplyAllFill } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import Modals from "../../components/Modal";
import { ADMIN_ADDANSWER_RESET } from "../../constants/adminConstants";

const ContactViewPage = ({ history, match }) => {
  const contactId = match.params.id;

  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const detailContact = useSelector((state) => state.detailContact);
  const { loading, error, contact } = detailContact;

  const statusContact = useSelector((state) => state.statusContact);
  const { success: updateSuccess } = statusContact;

  const handleShow2 = () => setShow2(true);

  const statusHandler = (id) => {
    localStorage.setItem("contactId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDANSWER_RESET });
      dispatch(contactDetails(contactId));
    } else {
      history.push("/admin-login");
    }
  }, [dispatch, adminInfo, history, updateSuccess]);

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title={`${contact && contact.userId.username} - Picxls`} />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {/* {show && <DeleteModal show={show} setShow={setShow} />} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error.message} />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px", marginTop: "25px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/contactlist">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-chevron-left"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#09204e"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </Link>{" "}
                Contact Detail
              </h2>
            </div>
            {contact && contact.userId && (
              <Row className="box">
                <div className="card  shadow">
                  <div className="card-header">
                    <h3 className="card-title">{contact.userId.username}</h3>
                    <div className="card-toolbar">
                      <span style={{ fontSize: "16px", margin: "0px 10px" }}>
                        {contact.status ? (
                          <Badge pill variant="warning">
                            Pending
                          </Badge>
                        ) : (
                          <Badge
                            pill
                            variant="danger"
                            style={{
                              backgroundColor: "red",
                              cursor: "pointer",
                            }}
                          >
                            Closed
                          </Badge>
                        )}
                      </span>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => (
                          <Tooltip {...props}>Change Status</Tooltip>
                        )}
                      >
                        <span
                          className="action-list-item"
                          onClick={() => {
                            handleShow2();
                            statusHandler(contact._id);
                            setStatus(contact.status);
                          }}
                        >
                          <GrUpdate
                            style={{ fontSize: "20px", margin: "0 10px" }}
                          />
                        </span>
                      </OverlayTrigger>
                      <Link to={`/answerconcern/${contactId}`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>Answer Concern</Tooltip>
                          )}
                        >
                          <BsFillReplyAllFill style={{ fontSize: "22px" }} />
                        </OverlayTrigger>
                      </Link>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="">
                      <div class="">
                        <table class="table table-borderless align-middle fw-bold">
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Name</td>
                            <td class="tdpd text-dark pe-0">
                              {contact.userId.firstname}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Username</td>
                            <td class="tdpd text-dark pe-0">
                              {contact.userId.username}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Email</td>
                            <td class="tdpd text-dark pe-0">
                              {contact.userId.email}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Contact Number
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {contact.userId.phoneNumber
                                ? contact.userId.phoneNumber
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Concern text
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {contact.report}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            )}
          </div>
        </container>
      )}
    </div>
  );
};

export default ContactViewPage;

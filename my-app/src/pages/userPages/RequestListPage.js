import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyRequestList } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import {
  ADMIN_DROPPING_RESET,
  ADMIN_VERIFYING_RESET,
} from "../../constants/adminConstants";
import VerifyBox from "../../components/VerifyBox";
import DropModal from "../../components/DropModal";
import moment from "moment";
import Meta from "../../components/Meta";

const RequestListPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;

  const userVerifying = useSelector((state) => state.userVerifying);
  const { success: verifySuccess } = userVerifying;

  const userDropping = useSelector((state) => state.userDropping);
  const { success: dropSuccess } = userDropping;

  useEffect(() => {
    dispatch({ type: ADMIN_VERIFYING_RESET });
    dispatch({ type: ADMIN_DROPPING_RESET });
    if (adminInfo) {
      dispatch(verifyRequestList());
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, dispatch, history, verifySuccess, dropSuccess]);

  const handleShow = () => setShow(true);

  const showHandler = (id) => {
    localStorage.setItem("userVerifyId", id);
  };

  const handleShow2 = () => setShow2(true);

  const showHandler2 = (id) => {
    localStorage.setItem("userDropId", id);
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      {<Meta title="Request Verification - Picxls" />}
      {show2 && <DropModal show={show2} setShow={setShow2} />}
      {show && <VerifyBox show={show} setShow={setShow} />}
      {error && <ErrorToast message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid mt-10 pb-18">
          <div
            className="d-flex align-items-stretch justify-content-between"
            style={{ marginBottom: "20px" }}
          >
            <h2 className="head">
              {" "}
              <Link to="/">
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
              Requests Listing
            </h2>
          </div>
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Name</th>
                <th className="colorblack">Username</th>
                <th className="colorblack">Email</th>
                <th className="colorblack">Contact Number</th>
                <th className="colorblack">Request Date</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests &&
                requests.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}.</td>
                    <td>{request.name}</td>
                    <td>{request.username}</td>
                    <td>
                      {request.userId.email ? (
                        request.userId.email
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {request.userId.phoneNumber ? (
                        request.userId.phoneNumber
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {moment(request.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      {request.acc_status === 0 ? (
                        <Badge pill variant="warning">
                          Pending
                        </Badge>
                      ) : request.acc_status === 1 ? (
                        <Badge
                          pill
                          variant="success"
                          style={{
                            backgroundColor: "green",
                            cursor: "pointer",
                          }}
                        >
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          pill
                          variant="danger"
                          style={{ backgroundColor: "red", cursor: "pointer" }}
                        >
                          Dropped
                        </Badge>
                      )}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <ul className="action-list">
                        <Link to={`/viewrequest/${request._id}`}>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={(props) => (
                              <Tooltip {...props}>View</Tooltip>
                            )}
                          >
                            <li className="action-list-item">
                              <RiEyeFill style={{ color: "darkblue" }} />
                            </li>
                          </OverlayTrigger>
                        </Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>Verify</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow();
                              showHandler(request._id);
                            }}
                          >
                            <FaCheck style={{ color: "green" }} />
                          </li>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>Drop</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow2();
                              showHandler2(request._id);
                            }}
                          >
                            <FaTimes style={{ color: "red" }} />
                          </li>
                        </OverlayTrigger>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestListPage;

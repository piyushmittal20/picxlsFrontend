import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, userReportList } from "../../actions/userActions";
import ErrorToast from "../../components/ErrorToast";
import DeleteModal from "../../components/DeleteModal";
import Modals from "../../components/Modal";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { OverlayTrigger, Tooltip, Row, Col, Badge } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const UserViewPage = ({ history, match }) => {
  const userId = match.params.id;

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const reportList = useSelector((state) => state.reportList);
  const { reports } = reportList;

  const reportStatus = useSelector((state) => state.reportStatus);
  const { success: statusUpdate } = reportStatus;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (successDelete) {
      history.push("/userlist");
    } else {
      dispatch(getUserDetails(userId));
      dispatch(userReportList(userId));
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    }
  }, [adminInfo, dispatch, history, userId, successDelete, statusUpdate]);

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delUserId", id);
  };

  const handleShow2 = () => setShow2(true);

  const showHandler = (id) => {
    localStorage.setItem("reportUserId", id);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title={`${user && user.username} - Picxls`} />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {show && <DeleteModal show={show} setShow={setShow} />}
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
                <Link to="/userlist">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
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
                User Details
              </h2>
            </div>
            {user && (
              <Row className="box">
                <div className="card  shadow">
                  <div className="card-header">
                    <h3 className="card-title">{user.firstname}</h3>
                    <div className="card-toolbar">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                      >
                        <Link className="mr-15" to={`/edituser/${user._id}`}>
                          <FaEdit />
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => (
                          <Tooltip {...props}>Delete</Tooltip>
                        )}
                      >
                        <span
                          onClick={() => {
                            handleShow();
                            deleteHandler(user._id);
                          }}
                        >
                          <FaTrashAlt style={{ color: "red" }} />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <div className="">
                        <table className="table table-borderless align-middle fw-bold">
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">Name</td>
                            <td className="tdpd text-dark pe-0">
                              {user.firstname}
                            </td>
                          </tr>
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">
                              Added on
                            </td>
                            <td className="tdpd text-dark pe-0">
                              {user.createdAt &&
                                user.createdAt.substring(0, 10)}
                            </td>
                          </tr>
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">Email</td>
                            <td className="tdpd text-dark pe-0">
                              {user.email}
                            </td>
                          </tr>
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">
                              Date of birth
                            </td>
                            <td className="tdpd text-dark pe-0">
                              {user.birthday}
                            </td>
                          </tr>
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">Contact</td>
                            <td className="tdpd text-dark pe-0">
                              {user?.phoneNumber ? user?.phoneNumber : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td className="tdpd text-gray-600 ps-0">Bio</td>
                            <td className="tdpd text-dark pe-0">
                              {user?.about ? user?.about : "NA"}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <Col style={{ padding: "10px", margin: "20px 10px" }}>
                  <h1>Report List</h1>
                  <table
                    id="datatable1"
                    className="table table-row-bordered gy-5"
                  >
                    <thead>
                      <tr className="fw-bold fs-6 text-muted">
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports &&
                        reports.map((report, index) => (
                          <tr key={report._id}>
                            <td>{index + 1}.</td>
                            <td>{report.user_details.firstname}</td>
                            <td>{report.user_details.username}</td>
                            <td>
                              {report.user_details.email ? (
                                report.user_details.email
                              ) : (
                                <span>NA</span>
                              )}
                            </td>
                            <td>{report.type}</td>
                            <td>{report.createdAt.substring(0, 10)}</td>
                            <td>
                              {report.status ? (
                                <Badge
                                  pill
                                  variant="success"
                                  style={{ backgroundColor: "green" }}
                                >
                                  Active
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
                                  Inactive
                                </Badge>
                              )}
                            </td>
                            <td style={{ padding: "10px" }}>
                              <ul className="action-list">
                                <li
                                  className="action-list-item"
                                  onClick={() => {
                                    handleShow2();
                                    showHandler(report._id);
                                    setStatus(report.status);
                                  }}
                                >
                                  {report.status ? (
                                    <BsToggleOn
                                      style={{
                                        color: "green",
                                        fontSize: "25px",
                                      }}
                                    />
                                  ) : (
                                    <BsToggleOff
                                      style={{
                                        color: "red",
                                        fontSize: "25px",
                                      }}
                                    />
                                  )}
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            )}
          </div>
        </container>
      )}
    </div>
  );
};

export default UserViewPage;

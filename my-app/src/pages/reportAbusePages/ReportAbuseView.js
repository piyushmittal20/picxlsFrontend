import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentDetail } from "../../actions/abuseActions";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Row, Badge, Col } from "react-bootstrap";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const ReportAbuseView = ({ history, match }) => {
  const commentId = match.params.id;

  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const { comment, error, loading } = useSelector(
    (state) => state.detailComment
  );

  const handleShow2 = () => setShow2(true);

  const statusHandler = (id) => {
    localStorage.setItem("commentId", id);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (adminInfo) {
      dispatch(getCommentDetail(commentId));
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, history, commentId, dispatch]);

  return (
    <div style={{ paddingBottom: "50px" }}>
      {/* {show && <DeleteModal show={show} setShow={setShow} />} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error} />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/commentlist">
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
                Comment Detail
              </h2>
            </div>
            {comment && (
              <Row className="box">
                <div class="card  shadow">
                  <div class="card-header">
                    <h3 class="card-title">
                      {comment[0]?.author_detail?.username}
                    </h3>
                    <div class="card-toolbar">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => <Tooltip {...props}>View</Tooltip>}
                      >
                        <Link
                          className="mr-15"
                          to={`/viewpost/${comment[0]?.postId}`}
                        >
                          <RiEyeFill />
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
                            // deleteHandler(comment._id);
                          }}
                        >
                          <FaTrashAlt style={{ color: "red" }} />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div class="card-body bg-white p-12 ">
                    <div class="">
                      <div class="card-body bg-light px-12 py-10">
                        <h3 class="fw-bolder fs-1 mb-9">
                          <a href="#" class="text-gray-800">
                            {comment[0]?.description}
                          </a>
                        </h3>
                        <table class="table table-borderless align-middle fw-bold">
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Username</td>
                            <td class="tdpd text-dark pe-0">
                              {comment[0]?.author_detail?.username}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Email</td>
                            <td class="tdpd text-dark pe-0">
                              {comment[0]?.author_detail?.email
                                ? comment[0]?.author_detail?.email
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Added on</td>
                            <td class="tdpd text-dark pe-0">
                              {comment[0]?.createdAt.substring(0, 10)}
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
                        <th>Reason</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comment[0]?.reports?.map((report, index) => (
                        <tr key={report._id}>
                          <td>{index + 1}.</td>
                          <td>{report.user_details?.firstname}</td>
                          <td>{report.user_details?.username}</td>
                          <td>
                            {report.user_details?.email ? (
                              report.user_details?.email
                            ) : (
                              <span>NA</span>
                            )}
                          </td>
                          <td>{report?.reason}</td>
                          <td>{report?.createdAt?.substring(0, 10)}</td>
                          <td>
                            {report.isActive ? (
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
                                  // showHandler(report._id);
                                  setStatus(report.isActive);
                                }}
                              >
                                {report.isActive ? (
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

export default ReportAbuseView;

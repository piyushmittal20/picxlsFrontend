import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, reportList } from "../../actions/postActions";
import Modals from "../../components/Modal";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import {
  Row,
  Col,
  Image,
  Badge,
  Carousel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import $ from "jquery";
import { Link } from "react-router-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Meta from "../../components/Meta";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";

const PostViewPage = ({ history, match }) => {
  const postId = match.params.id;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const postDetail = useSelector((state) => state.postDetail);
  const { loading, error, feed } = postDetail;

  const listReport = useSelector((state) => state.listReport);
  const { loading: listLoading, error: listError, reports } = listReport;

  const statusUpdate = useSelector((state) => state.statusUpdate);
  const { success: updateSuccess } = statusUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const handleShow = () => setShow(true);

  const showHandler = (id) => {
    localStorage.setItem("reportId", id);
  };

  const handleShow2 = () => setShow2(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delPostId", id);
  };

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (deleteSuccess) {
      history.push("/postlist");
    } else {
      dispatch(getPost(postId));
      dispatch(reportList());
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    }
  }, [adminInfo, dispatch, history, deleteSuccess]);

  console.log(feed);

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title="View Post - Picxls" />
      {show && <Modals show={show} setShow={setShow} status={status} />}
      {show2 && <DeleteModal show={show2} setShow={setShow2} />}
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
                <Link to="/postlist">
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
                </Link>
                Post Detail
              </h2>
            </div>
            {feed &&
              feed[0] &&
              feed.map((f) => (
                <Row className="box">
                  <div class="card shadow">
                    <div class="card-header">
                      <h3 class="card-title">{f.user_details.username}</h3>
                      <div class="card-toolbar">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>Remove Post</Tooltip>
                          )}
                        >
                          <span
                            className="btn"
                            variant="danger"
                            onClick={() => {
                              handleShow2();
                              deleteHandler(f._id);
                            }}
                          >
                            <FaTimes style={{ color: "red" }} />
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div class="card-body d-flex bg-white p-12 flex-column flex-md-row flex-xxl-row">
                      <div class=" ">
                        {f.is_video ? (
                          f.post.map((p) => (
                            <ReactPlayer url={p} controls="true" />
                          ))
                        ) : (
                          <Carousel>
                            {f.post.map((p) => (
                              <Carousel.Item>
                                <Image
                                  src={p}
                                  style={{ width: "600px", height: "420px" }}
                                  alt="post"
                                  fluid
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        )}
                      </div>
                      <div class="card shadow-none w-auto w-md-300px w-lg-auto w-xxl-300px ml-auto">
                        <div class="card-body bg-light px-12 py-10">
                          <h3 class="fw-bolder fs-1 mb-9">
                            <a href="#" class="text-gray-800">
                              {f.user_details.username}
                            </a>
                          </h3>
                          <table class="table table-borderless align-middle fw-bold">
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Name</td>
                              <td class="tdpd text-dark pe-0">
                                {f.user_details.firstname}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">
                                Date of birth
                              </td>
                              <td class="tdpd text-dark pe-0">
                                {f.user_details.birthday}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Views</td>
                              <td class="tdpd text-dark pe-0">
                                {f.views.length > 0 ? f.views[0].view_count : 0}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Comments</td>
                              <td class="tdpd text-dark pe-0">
                                {f.comments.length > 0
                                  ? f.comments[0].comment_count
                                  : 0}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Likes:</td>
                              <td class="tdpd text-dark pe-0">
                                {f.likes.length > 0 ? f.likes[0].like_count : 0}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Reports:</td>
                              <td class="tdpd text-dark pe-0">
                                {f.reports.length > 0
                                  ? f.reports[0].report_count
                                  : 0}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Col md={6}>
            <Image className="image" src={`https://picxls-testing.herokuapp.com/${f.post}`} alt="post" />
          </Col>
          <Col md={6}>
            <Card className="card">
                <ListGroup variant="flush" className="list">
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Name</Col>
                            <Col>{f.user_details.firstname}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Username</Col>
                            <Col>{f.user_details.username}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Date of Birth</Col>
                            <Col>{f.user_details.birthday}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Views</Col>
                            <Col>{f.views.length > 0 ? f.views[0].view_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Comments</Col>
                            <Col>{f.comments.length > 0 ? f.comments[0].comment_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Likes</Col>
                            <Col>{f.likes.length > 0 ? f.likes[0].like_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Reports</Col>
                            <Col>{f.reports.length > 0 ? f.reports[0].report_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
          </Col> */}
                  <Col md={12} style={{ padding: "10px", margin: "10px" }}>
                    <button
                      type="button"
                      id="kt_layout_builder_export"
                      onClick={() => {
                        handleShow2();
                        deleteHandler(f._id);
                      }}
                      className="btn btn-light me-2"
                    >
                      <span class="indicator-label">Remove Post</span>
                    </button>
                  </Col>
                  <Col style={{ padding: "10px", margin: "10px" }}>
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
                              <td>{report.description}</td>
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
                                      handleShow();
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
              ))}
          </div>
        </container>
      )}
    </div>
  );
};

export default PostViewPage;

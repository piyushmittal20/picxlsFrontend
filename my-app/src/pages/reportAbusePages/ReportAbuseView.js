import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  OverlayTrigger,
  Tooltip,
  Row,
  Badge,
  Carousel,
  Image,
} from "react-bootstrap";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { getAbuseDetails } from "../../actions/abuseActions";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import Modals from "../../components/Modal";
import RemoveModal from "../../components/RemoveModal";
import ReactPlayer from "react-player";

const ReportAbuseView = ({ history, match }) => {
  const abuseId = match.params.id;

  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const detailAbuse = useSelector((state) => state.detailAbuse);
  const { loading, error, report, contentDetails } = detailAbuse;

  const abuseStatus = useSelector((state) => state.abuseStatus);
  const { success: updateSuccess } = abuseStatus;

  const handleShow2 = () => setShow2(true);

  const statusHandler = (id) => {
    localStorage.setItem("abuseId", id);
  };

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delAbuseId", id)
  }

  useEffect(() => {
    if (adminInfo) {
      dispatch(getAbuseDetails(abuseId));
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, history, dispatch, abuseId, updateSuccess]);

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title="Report Abuse View - Picxls" />
      {show && <RemoveModal show={show} setShow={setShow} />}
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error} />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px", marginTop: "25px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/reportabuselist">
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
                Report Abuse Detail
              </h2>
            </div>
            {report && report[0] && report[0].user_details && (
              <Row className="box">
                <div className="card  shadow">
                  <div className="card-header">
                    <h3 className="card-title">
                      {report[0].user_details.username}
                    </h3>
                    <div className="card-toolbar">
                      <span style={{ fontSize: "16px", margin: "0px 10px" }}>
                        {report[0].status ? (
                          <Badge
                            pill
                            variant="success"
                            style={{
                              backgroundColor: "green",
                              cursor: "pointer",
                            }}
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
                            statusHandler(report[0]._id);
                            setStatus(report[0].status);
                          }}
                        >
                          <GrUpdate
                            style={{ fontSize: "20px", margin: "0 10px" }}
                          />
                        </span>
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
                            deleteHandler(report[0]._id);
                          }}
                        >
                          <FaTrashAlt style={{ color: "red", fontSize: "20px", margin: "0 10px" }} />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="">
                      <div class="">
                        <table class="table table-borderless align-middle fw-bold">
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Name</td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].user_details.firstname}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Username</td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].user_details.username}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Email</td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].user_details.email}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Contact Number
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].user_details.phoneNumber
                                ? report[0].user_details.phoneNumber
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Report Content
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].content}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Content Type
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {report[0].type}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {report[0].content === "Post" ? (
                  <div className="card  shadow">
                    <div className="card-header">
                      <h3 className="card-title">
                        <Link to={`/viewpost/${contentDetails._id}`}>
                          {report[0].content}
                        </Link>
                      </h3>
                      <div className="card-toolbar"></div>
                    </div>
                    <div class="card-body">
                      <div class="">
                        <div class="">
                          <table class="table table-borderless align-middle fw-bold">
                            <tr>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.is_video ? (
                                  contentDetails.post.map((p) => (
                                    <ReactPlayer url={p} controls="true" />
                                  ))
                                ) : (
                                  <Carousel>
                                    {contentDetails.post.map((p) => (
                                      <Carousel.Item>
                                        <Image
                                          src={p}
                                          style={{
                                            width: "auto",
                                            height: "420px",
                                          }}
                                          alt="post"
                                          fluid
                                          className="text-center"
                                        />
                                      </Carousel.Item>
                                    ))}
                                  </Carousel>
                                )}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : report[0].content === "Profile" ? (
                  <div className="card  shadow">
                    <div className="card-header">
                      <h3 className="card-title">
                        <Link to={`/viewuser/${contentDetails._id}`}>
                          {report[0].content}
                        </Link>
                      </h3>
                      <div className="card-toolbar"></div>
                    </div>
                    <div class="card-body">
                      <div class="">
                        <div class="">
                          <table class="table table-borderless align-middle fw-bold">
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Name</td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.firstname}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Added on</td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.createdAt &&
                                  contentDetails.createdAt.substring(0, 10)}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Email</td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.email}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">
                                Date of birth
                              </td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.birthday}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Contact</td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.phoneNumber}
                              </td>
                            </tr>
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">Bio</td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.about}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : report[0].content === "Comment" ? (
                  <div className="card  shadow">
                    <div className="card-header">
                      <h3 className="card-title">{report[0].content}</h3>
                      <div className="card-toolbar"></div>
                    </div>
                    <div class="card-body">
                      <div class="">
                        <div class="">
                          <table class="table table-borderless align-middle fw-bold">
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">
                                Description
                              </td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.description}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : report[0].content === "Reply" ? (
                  <div className="card  shadow">
                    <div className="card-header">
                      <h3 className="card-title">{report[0].content}</h3>
                      <div className="card-toolbar"></div>
                    </div>
                    <div class="card-body">
                      <div class="">
                        <div class="">
                          <table class="table table-borderless align-middle fw-bold">
                            <tr>
                              <td class="tdpd text-gray-600 ps-0">
                                Description
                              </td>
                              <td class="tdpd text-dark pe-0">
                                {contentDetails.description}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Row>
            )}
          </div>
        </container>
      )}
    </div>
  );
};

export default ReportAbuseView;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { getStartag, reportStartagList } from "../../actions/startagActions";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Meta from "../../components/Meta";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { OverlayTrigger, Tooltip, Row, Col, Badge } from "react-bootstrap";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const StartagViewPage = ({ history, match }) => {
  const startagId = match.params.id;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const startagDetail = useSelector((state) => state.startagDetail);
  const { loading, error, startag } = startagDetail;

  const startagDelete = useSelector((state) => state.startagDelete);
  const { success: successDelete } = startagDelete;

  const { startagReports } = useSelector((state) => state.startagReports);

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (successDelete) {
      history.push("/startaglist");
    } else {
      dispatch(reportStartagList(startagId));
      dispatch(getStartag(startagId));
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    }
  }, [adminInfo, history, dispatch, successDelete, startagId]);

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delStarId", id);
  };

  const handleShow2 = () => setShow2(true);

  const showHandler = (id) => {
    localStorage.setItem("reportStartagId", id);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title={`${startag && startag.name} - Picxls`} />
      {show && <DeleteModal show={show} setShow={setShow} />}
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
                <Link to="/startaglist">
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
                Startag Detail
              </h2>
            </div>
            {startag && (
              <Row className="box">
                <div class="card  shadow">
                  <div class="card-header">
                    <h3 class="card-title">{startag.name}</h3>
                    <div class="card-toolbar">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                      >
                        <Link
                          className="mr-15"
                          to={`/editstartag/${startag._id}`}
                        >
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
                            deleteHandler(startag._id);
                          }}
                        >
                          <FaTrashAlt style={{ color: "red" }} />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div class="card-body bg-white p-12 ">
                    {startag.image !== null ? (
                      <div class="bgi-no-repeat bgi-position-center bgi-size-cover h-300px h-md-auto ">
                        <Image
                          className="image"
                          src={startag.image}
                          alt="photo"
                          fluid
                        />
                      </div>
                    ) : (
                      <span></span>
                    )}
                    <div class="">
                      <div class="card-body bg-light px-12 py-10">
                        <h3 class="fw-bolder fs-1 mb-9">
                          <a href="#" class="text-gray-800">
                            {startag.name}
                          </a>
                        </h3>
                        <table class="table table-borderless align-middle fw-bold">
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Type</td>
                            <td class="tdpd text-dark pe-0">{startag.type}</td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Added on</td>
                            <td class="tdpd text-dark pe-0">
                              {startag.createdAt &&
                                startag.createdAt.substring(0, 10)}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Cost</td>
                            <td class="tdpd text-dark pe-0">
                              {startag.cost ? startag.cost : "NA"}
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
                      {startagReports &&
                        startagReports.map((startagReports, index) => (
                          <tr key={startagReports._id}>
                            <td>{index + 1}.</td>
                            <td>{startagReports.user_details.firstname}</td>
                            <td>{startagReports.user_details.username}</td>
                            <td>
                              {startagReports.user_details.email ? (
                                startagReports.user_details.email
                              ) : (
                                <span>NA</span>
                              )}
                            </td>
                            <td>{startagReports.reason}</td>
                            <td>{startagReports.createdAt.substring(0, 10)}</td>
                            <td>
                              {startagReports.isActive ? (
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
                                    showHandler(startagReports._id);
                                    setStatus(startagReports.status);
                                  }}
                                >
                                  {startagReports.isActive ? (
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

export default StartagViewPage;

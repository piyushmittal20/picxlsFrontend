import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStartag } from "../../actions/startagActions";
import { Link } from "react-router-dom";
import { Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Modals from "../../components/Modal";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { RiEyeFill } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  ADMIN_ADDSTARTAG_RESET,
  ADMIN_UPDATESTARTAG_RESET,
} from "../../constants/adminConstants";
import Meta from "../../components/Meta";

const StartagList = ({ history }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  var [data, setData] = useState([]);
  const [role, setRole] = useState("all");
  const [status2, setStatus2] = useState("every");

  const dispatch = useDispatch();

  const startagList = useSelector((state) => state.startagList);
  const { loading, error, startags } = startagList;

  const startagDelete = useSelector((state) => state.startagDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = startagDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const startagStatus = useSelector((state) => state.startagStatus);
  const { success: statusSuccess } = startagStatus;

  const handleShow = () => setShow(true);

  const handleShow2 = () => setShow2(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delStarId", id);
  };

  const statusHandler = (id) => {
    localStorage.setItem("starId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDSTARTAG_RESET });
      dispatch({ type: ADMIN_UPDATESTARTAG_RESET });
      dispatch(getAllStartag());
      setTimeout(() => {
        $("#datatable1").DataTable({});
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [dispatch, history, adminInfo, successDelete, statusSuccess]);

  var result = [];

  if (!startDate && !lastDate && role === "all" && status2 === "every") {
    data = startags;
  }

  useEffect(() => {
    if (startDate && lastDate) {
      console.log("Hello");
      result =
        startags &&
        startags.filter((startag) =>
          moment(startag.createdAt).isBetween(startDate, lastDate)
        );
    }
    if (role !== "all") {
      result = startags && startags.filter((startag) => startag.type === role);
    }
    if (status2 !== "every") {
      result =
        startags &&
        startags.filter((startag) => startag.isActive.toString() === status2);
    }
    setData(result);
  }, [startDate, lastDate, role, status2]);

  const handleClick1 = (e) => {
    setStartDate(e.target.value);
  };

  const handleClick2 = (e) => {
    setLastDate(e.target.value);
  };

  const resetFilter = () => {
    setLastDate("");
    setStartDate("");
    setStatus2("every");
    setRole("all");
  };

  return (
    <div className="wapper">
      <Meta title="Startag Management - Picxls" />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {show && <DeleteModal show={show} setShow={setShow} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error.message} />
      ) : (
        <div className="container-fluid mt-10">
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
              Startag Listing
            </h2>
            <Link to="/addstartag">
              <Button variant="dark" className="add-btn">
                <i className="fas fa-plus"></i>Add Startag
              </Button>
            </Link>
          </div>
          <div className="filter-container">
            <label>Start Date: </label>
            <input type="date" value={startDate} onChange={handleClick1} />
            <label>End Date: </label>
            <input type="date" value={lastDate} onChange={handleClick2} />
            <label>Type:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option disabled selected value>
                Select option
              </option>
              <option value="all">All</option>
              <option value="General">General</option>
              <option value="Bussiness">Bussiness</option>
            </select>
            <label>Status:</label>
            <select
              value={status2}
              onChange={(e) => setStatus2(e.target.value)}
            >
              <option disabled selected value>
                Select option
              </option>
              <option value="every">All</option>
              <option value="true">Active</option>
              <option value="false">InActive</option>
            </select>
            <div className="reset-icon" onClick={resetFilter}>
              <GrPowerReset />
            </div>
          </div>
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Name</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Type</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((startag, index) => (
                  <tr key={startag._id}>
                    <td>{index + 1}.</td>
                    <td>{startag.name}</td>
                    <td>
                      {moment(startag.createdAt.substring(0, 10)).format(
                        "MMMM Do YYYY"
                      )}
                    </td>
                    <td>{startag.type}</td>
                    {/* <td>{startag.isActive ? "Active" : "InActive"}</td> */}
                    <td>
                      {startag.isActive ? (
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
                          style={{ backgroundColor: "red", cursor: "pointer" }}
                        >
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <ul className="action-list">
                        <Link to={`viewstartag/${startag._id}`}>
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
                        <Link to={`/editstartag/${startag._id}`}>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={(props) => (
                              <Tooltip {...props}>Edit</Tooltip>
                            )}
                          >
                            <li className="action-list-item">
                              <FaEdit />
                            </li>
                          </OverlayTrigger>
                        </Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>View</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow();
                              deleteHandler(startag._id);
                            }}
                          >
                            <FaTrashAlt style={{ color: "red" }} />
                          </li>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={(props) => (
                            <Tooltip {...props}>Change Status</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow2();
                              statusHandler(startag._id);
                              setStatus(startag.isActive);
                            }}
                          >
                            {startag.isActive ? (
                              <BsToggleOn
                                style={{ color: "green", fontSize: "25px" }}
                              />
                            ) : (
                              <BsToggleOff
                                style={{ color: "red", fontSize: "25px" }}
                              />
                            )}
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

export default StartagList;

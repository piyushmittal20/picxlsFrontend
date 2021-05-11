import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { listUsers } from "../../actions/userActions";
import DeleteModal from "../../components/DeleteModal";
import Modals from "../../components/Modal";
import { RiEyeFill } from "react-icons/ri";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import $ from "jquery";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from "../../components/Loader";
import {
  ADMIN_ADDUSER_RESET,
  ADMIN_UPDATEUSER_RESET,
} from "../../constants/adminConstants";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";

const UserListPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  var [data, setData] = useState([]);
  const [status2, setStatus2] = useState("every");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userStatus = useSelector((state) => state.userStatus);
  const { success: statusSuccess } = userStatus;

  const handleShow = () => setShow(true);

  const handleShow2 = () => setShow2(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delUserId", id);
  };

  const statusHandler = (id) => {
    localStorage.setItem("userId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDUSER_RESET });
      dispatch({ type: ADMIN_UPDATEUSER_RESET });
      dispatch(listUsers());
      setTimeout(() => {
        $("#datatable1").DataTable({});
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, dispatch, history, successDelete, statusSuccess]);

  var result = [];

  if (!startDate && !lastDate && status2 === "every") {
    data = users;
  }

  useEffect(() => {
    if (startDate && lastDate) {
      result =
        users &&
        users.filter((user) =>
          moment(user.createdAt).isBetween(startDate, lastDate)
        );
    }
    if (startDate && !lastDate) {
      result =
        users &&
        users.filter((user) => moment(user.createdAt).isSame(startDate));
    }
    if (status2 !== "every") {
      result =
        users && users.filter((user) => user.status.toString() === status2);
    }
    setData(result);
  }, [startDate, lastDate, status2]);

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
  };

  return (
    <div className="wrapper">
      <Meta title="User Management - Picxls" />
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
              Users Listing
            </h2>
            <Link to="/adduser">
              <Button variant="dark" className="add-btn">
                <i className="fas fa-plus"></i>Add User
              </Button>
            </Link>
          </div>
          <div className="filter-container">
            <label>Start Date: </label>
            <input type="date" value={startDate} onChange={handleClick1} />
            <label>End Date: </label>
            <input type="date" value={lastDate} onChange={handleClick2} />
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
                <th className="colorblack">Username</th>
                <th className="colorblack">Email</th>
                <th className="colorblack">Contact Number</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}.</td>
                    <td>{user.firstname}</td>
                    <td>{user.username}</td>
                    <td>{user.email ? user.email : <span>NA</span>}</td>
                    <td>
                      {user.phoneNumber ? user.phoneNumber : <span>NA</span>}
                    </td>
                    <td>
                      {moment(user.createdAt.substring(0, 10)).format(
                        "MMMM Do YYYY"
                      )}
                    </td>
                    {/* <td>{user.status ? "Active" : "InActive"}</td> */}
                    <td>
                      {user.status ? (
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
                        <Link to={`/viewuser/${user._id}`}>
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
                        <Link to={`/edituser/${user._id}`}>
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
                            <Tooltip {...props}>Delete</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow();
                              deleteHandler(user._id);
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
                              statusHandler(user._id);
                              setStatus(user.status);
                            }}
                          >
                            {user.status ? (
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

export default UserListPage;

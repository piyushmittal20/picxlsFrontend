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
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import Loader from "../../components/Loader";
import {
  ADMIN_ADDUSER_RESET,
  ADMIN_DELETEUSER_RESET,
  ADMIN_UPDATEUSER_RESET,
} from "../../constants/adminConstants";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  // var [data, setData] = useState([]);
  const [status2, setStatus2] = useState("");
  const [search, setSearch] = useState("");
  // const [q, setQ] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages, page, total } = userList;

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

  let newStart = "";

  if (startDate !== "") {
    newStart = moment(startDate).toISOString();
  }

  let newLast = "";

  if (lastDate !== "") {
    newLast = moment(lastDate).toISOString();
  }

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDUSER_RESET });
      dispatch({ type: ADMIN_UPDATEUSER_RESET });
      dispatch({ type: ADMIN_DELETEUSER_RESET });
      dispatch(listUsers(search, pageNumber, status2, newStart, newLast));
    } else {
      history.push("/admin-login");
    }
  }, [
    adminInfo,
    dispatch,
    history,
    successDelete,
    statusSuccess,
    pageNumber,
    search,
    status2,
    newStart,
    newLast,
  ]);

  // var result = [];

  // if (!startDate && !lastDate && status2 === "every") {
  //   data = users;
  // }

  // useEffect(() => {
  //   if (startDate && lastDate) {
  //     result =
  //       users &&
  //       users.filter((user) =>
  //         moment(user.createdAt).isBetween(startDate, lastDate)
  //       );
  //   }
  //   if (status2 !== "every") {
  //     result =
  //       users && users.filter((user) => user.status.toString() === status2);
  //   }
  //   setData(result);
  // }, [startDate, lastDate, status2, pageNumber]);

  const resetFilter = () => {
    setLastDate("");
    setStartDate("");
    setStatus2("");
  };

  let renderPageNumbers;

  const pageNumbers = [];
  if (total !== null) {
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
  }

  renderPageNumbers = pageNumbers.map((number) => {
    let classes = page === number ? "pagination-btn active" : "pagination-btn";

    if (
      number == 1 ||
      number == total ||
      (number >= page - 2 && number <= page + 2)
    ) {
      return (
        <span key={number}>
          <Link to={`/userlist/page/${number}`} className={classes}>
            {number}
          </Link>
        </span>
      );
    }
  });

  // const search = (rows) => {
  //   return rows.filter(
  //     (row) =>
  //       (row.email && row.email.toLowerCase().indexOf(q) > -1) ||
  //       (row.username && row.username.toLowerCase().indexOf(q) > -1) ||
  //       (row.firstname && row.firstname.toLowerCase().indexOf(q) > -1) ||
  //       (row.phoneNumber && row.phoneNumber.toLowerCase().indexOf(q) > -1) ||
  //       row.createdAt.toString().toLowerCase().indexOf(q) > -1
  //   );
  // };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="User Management - Picxls" />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {show && <DeleteModal show={show} setShow={setShow} />}
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
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
          />
          <label>End Date: </label>
          <DatePicker
            selected={lastDate}
            onChange={(date) => setLastDate(date)}
            dateFormat="MMMM d, yyyy"
          />
          <label>Status:</label>
          <select value={status2} onChange={(e) => setStatus2(e.target.value)}>
            <option disabled>Select option</option>
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">InActive</option>
          </select>
          <div className="reset-icon" onClick={resetFilter}>
            <OverlayTrigger
              placement="bottom"
              overlay={(props) => <Tooltip {...props}>Reset</Tooltip>}
            >
              <GrPowerReset />
            </OverlayTrigger>
          </div>
        </div>
        <div className="search-input">
          <label>Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorToast message={error.message} />
        ) : (
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead style={{ borderBottom: "1px solid black" }}>
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
            <tbody style={{ borderBottom: "1px solid black" }}>
              {users &&
                users.map((user, index) => (
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
                        "MMMM DD YYYY"
                      )}
                    </td>
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
        )}
        <div className="pagination-div">{renderPageNumbers}</div>
      </div>
    </div>
  );
};

export default UserListPage;

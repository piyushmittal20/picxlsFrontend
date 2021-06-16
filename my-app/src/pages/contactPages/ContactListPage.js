import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { RiEyeFill } from "react-icons/ri";
import { getContactListing } from "../../actions/contactActions";
import Modals from "../../components/Modal";
import Meta from "../../components/Meta";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import { GrPowerReset } from "react-icons/gr";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const ContactListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [q, setQ] = useState("");
  const [status2, setStatus2] = useState("");
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const listContact = useSelector((state) => state.listContact);
  const { loading, error, contacts, pages, page, total } = listContact;

  const statusContact = useSelector((state) => state.statusContact);
  const { success: updateSuccess } = statusContact;

  const handleShow2 = () => setShow2(true);

  const statusHandler = (id) => {
    localStorage.setItem("contactId", id);
  };

  let newStart = "";

  if (startDate !== "") {
    newStart = moment(startDate).toISOString();
  }

  let newLast = "";

  if (lastDate !== "") {
    newLast = moment(lastDate).toISOString();
  }

  const redirect = () => {
    history.push("/contactlist");
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch(getContactListing(pageNumber, status2, newStart, newLast));
    } else {
      history.push("/admin-login");
    }
  }, [
    dispatch,
    history,
    adminInfo,
    updateSuccess,
    pageNumber,
    status2,
    newStart,
    newLast,
  ]);

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
          <Link to={`/contactlist/page/${number}`} className={classes}>
            {number}
          </Link>
        </span>
      );
    }
  });

  const search = (rows) => {
    return rows.filter(
      (row) =>
        (row.userId.firstname &&
          row.userId.firstname.toLowerCase().indexOf(q) > -1) ||
        (row.userId.username &&
          row.userId.username.toLowerCase().indexOf(q) > -1) ||
        (row.userId.email && row.userId.email.toLowerCase().indexOf(q) > -1) ||
        (row.userId.phoneNumber &&
          row.userId.phoneNumber.toLowerCase().indexOf(q) > -1) ||
        row.createdAt.toString().toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Contact Us - Picxls" />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
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
            Contact Us
          </h2>
        </div>
        <div className="filter-container">
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              redirect();
            }}
            dateFormat="MMMM d, yyyy"
          />
          <label>End Date: </label>
          <DatePicker
            selected={lastDate}
            onChange={(date) => {
              setLastDate(date);
              redirect();
            }}
            dateFormat="MMMM d, yyyy"
          />
          <label>Status:</label>
          <select
            value={status2}
            onChange={(e) => {
              setStatus2(e.target.value);
              redirect();
            }}
          >
            <option disabled>Select option</option>
            <option value="">All</option>
            <option value="true">Pending</option>
            <option value="false">Closed</option>
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
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorToast message={error} />
        ) : contacts !== undefined ? (
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
              {contacts &&
                search(contacts).map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}.</td>
                    <td>{contact.userId.firstname}</td>
                    <td>{contact.userId.username}</td>
                    <td>
                      {contact.userId.email ? (
                        contact.userId.email
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {contact.userId.phoneNumber ? (
                        contact.userId.phoneNumber
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {" "}
                      {moment(contact.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      {contact.status ? (
                        <Badge pill variant="warning">
                          Pending
                        </Badge>
                      ) : (
                        <Badge
                          pill
                          variant="danger"
                          style={{ backgroundColor: "red", cursor: "pointer" }}
                        >
                          Closed
                        </Badge>
                      )}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <ul className="action-list">
                        <Link to={`/contactview/${contact._id}`}>
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
                            <Tooltip {...props}>Change Status</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow2();
                              statusHandler(contact._id);
                              setStatus(contact.status);
                            }}
                          >
                            {contact.status ? (
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
        ) : (
          <div className="errorCmp">
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error! 😐</Alert.Heading>
              <p>
                We are unable to serve data. Something went wrong, please check
                your internet connection or try again later.
              </p>
            </Alert>
          </div>
        )}
        <div className="pagination-div">{renderPageNumbers}</div>
      </div>
    </div>
  );
};

export default ContactListPage;

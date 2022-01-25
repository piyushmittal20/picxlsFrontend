import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReply } from "../../actions/abuseActions";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import { GrPowerReset } from "react-icons/gr";
import { RiEyeFill } from "react-icons/ri";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import Modals from "../../components/Modal";
import { Badge, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";

const ReportReplyList = ({ history }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [q, setQ] = useState("");
  const [status2, setStatus2] = useState("");
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const { loading, error, replies, pages } = useSelector(
    (state) => state.listReply
  );

  const handleShow2 = () => setShow2(true);

  const statusHandler = (id) => {
    localStorage.setItem("replyId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch(getAllReply(pageNumber));
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, dispatch, history, pageNumber]);

  const resetFilter = () => {
    setStatus2("");
    setType("");
    setContent("");
  };

  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.author.firstname &&
        row.author.firstname.toLowerCase().indexOf(q) > -1
      // (row.reporterId.username &&
      //   row.reporterId.username.toLowerCase().indexOf(q) > -1) ||
      // (row.reporterId.email &&
      //   row.user_details.email.toLowerCase().indexOf(q) > -1) ||
      // (row.reporterId.phoneNumber &&
      //   row.reporterId.phoneNumber.toLowerCase().indexOf(q) > -1) ||
      // row.createdAt.toString().toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Reply Report Management - Picxls" />
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
            Reply Management
          </h2>
        </div>
        <div className="filter-container">
          <label>Status:</label>
          <select
            value={status2}
            onChange={(e) => {
              setStatus2(e.target.value);
              //   redirect();
            }}
          >
            <option disabled>Select option</option>
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <label>Content:</label>
          <select
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              //   redirect();
            }}
          >
            <option disabled>Select option</option>
            <option value="">All</option>
            <option value="Post">Post</option>
            <option value="Profile">Profile</option>
            <option value="Comment">Comment</option>
          </select>
          <label>Type:</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              //   redirect();
            }}
          >
            <option disabled>Select option</option>
            <option value="">All</option>
            <option>Nudity or sexual activity</option>
            <option>Hate speech or symbol</option>
            <option>Violence or dangerous organisation</option>
            <option>Sale of illegal or regulated goods</option>
            <option>Bullying or harassment</option>
            <option>Intellectual property violation</option>
            <option>Suicide, self-injury or eating disorders</option>
            <option>Scam or Fraud</option>
            <option>False information</option>
            <option>I just don't like it</option>
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
        ) : replies !== undefined ? (
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead style={{ borderBottom: "1px solid black" }}>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Description</th>
                <th className="colorblack">Username</th>
                <th className="colorblack">Email</th>
                <th className="colorblack">Contact Number</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Action</th>
              </tr>
            </thead>
            <tbody style={{ borderBottom: "1px solid black" }}>
              {replies &&
                search(replies).map((reply, index) => (
                  <tr key={reply._id}>
                    <td>{index + 1}.</td>
                    <td>{reply.description}</td>
                    <td>{reply.author.username}</td>
                    <td>
                      {reply.author.email ? (
                        reply.author.email
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {reply.author.phoneNumber ? (
                        reply.author.phoneNumber
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {" "}
                      {moment(reply.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      {reply.isActive ? (
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
                        <Link to={`/replyview/${reply._id}`}>
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
                              statusHandler(reply._id);
                              setStatus(reply.isActive);
                            }}
                          >
                            {reply.isActive ? (
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
        <div className="pagination-div">
          <Pagination
            page={pageNumber}
            count={pages}
            size="large"
            onChange={(e, val) => setPageNumber(val)}
          />
        </div>
        {/* <div className="pagination-div">{renderPageNumbers}</div> */}
      </div>
    </div>
  );
};

export default ReportReplyList;

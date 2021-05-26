import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import Loader from "../../components/Loader";
import DeleteModal from "../../components/DeleteModal";
import Modals from "../../components/Modal";
import ErrorToast from "../../components/ErrorToast";
import { RiEyeFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { getAllPosts } from "../../actions/postActions";
import { ADMIN_POSTDELETE_RESET } from "../../constants/adminConstants";
import Meta from "../../components/Meta";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PostListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [status2, setStatus2] = useState("");
  const [q, setQ] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const listPost = useSelector((state) => state.listPost);
  const { loading, error, posts, pages, page, total } = listPost;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const postStatus = useSelector((state) => state.postStatus);
  const { success: updateSuccess } = postStatus;

  const handleShow = () => setShow(true);

  const handleShow2 = () => setShow2(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delPostId", id);
  };

  const statusHandler = (id) => {
    localStorage.setItem("postId", id);
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
      dispatch({ type: ADMIN_POSTDELETE_RESET });
      dispatch(getAllPosts(pageNumber, status2, newStart, newLast));
    } else {
      history.push("/admin-login");
    }
  }, [
    dispatch,
    history,
    adminInfo,
    deleteSuccess,
    updateSuccess,
    pageNumber,
    status2,
    newStart,
    newLast,
  ]);

  // var result = [];

  // if (!startDate && !lastDate && status2 === "every") {
  //   data = posts;
  // }

  // useEffect(() => {
  //   if (startDate && lastDate) {
  //     result =
  //       posts &&
  //       posts.filter((post) =>
  //         moment(post.createdAt).isBetween(startDate, lastDate)
  //       );
  //   }
  //   if (status2 !== "every") {
  //     result =
  //       posts && posts.filter((post) => post.status.toString() === status2);
  //   }
  //   setData(result);
  // }, [startDate, lastDate, status2]);

  // const handleClick1 = (e) => {
  //   setStartDate(e.target.value);
  // };

  // const handleClick2 = (e) => {
  //   setLastDate(e.target.value);
  // };

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
          <Link to={`/postlist/page/${number}`} className={classes}>
            {number}
          </Link>
        </span>
      );
    }
  });

  const search = (rows) => {
    return rows.filter(
      (row) =>
        (row.creator.firstname &&
          row.creator.firstname.toLowerCase().indexOf(q) > -1) ||
        (row.creator.username &&
          row.creator.username.toLowerCase().indexOf(q) > -1) ||
        (row.creator.email &&
          row.creator.email.toLowerCase().indexOf(q) > -1) ||
        (row.creator.phoneNumber &&
          row.creator.phoneNumber.toLowerCase().indexOf(q) > -1) ||
        row.createdAt.toString().toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Post Management - Picxls" />
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
            Posts Listing
          </h2>
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
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorToast message={error.message} />
        ) : (
          <div>
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
                  <th className="colorblack">Post</th>
                  <th className="colorblack">Added on</th>
                  <th className="colorblack">Status</th>
                  <th className="colorblack">Action</th>
                </tr>
              </thead>
              <tbody style={{ borderBottom: "1px solid black" }}>
                {posts &&
                  search(posts).map((post, index) => (
                    <tr key={post._id}>
                      <td>{index + 1}.</td>
                      <td>{post.creator.firstname}</td>
                      <td>{post.creator.username}</td>
                      <td>
                        {post.creator.email ? (
                          post.creator.email
                        ) : (
                          <span>NA</span>
                        )}
                      </td>
                      <td>
                        {post.creator.phoneNumber ? (
                          post.creator.phoneNumber
                        ) : (
                          <span>NA</span>
                        )}
                      </td>
                      <td>Feed</td>
                      <td>
                        {moment(post.createdAt.substring(0, 10)).format(
                          "MMMM DD YYYY"
                        )}
                      </td>
                      <td>
                        {post.status ? (
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
                          <Link to={`/viewpost/${post._id}`}>
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
                              <Tooltip {...props}>Delete</Tooltip>
                            )}
                          >
                            <li
                              className="action-list-item"
                              onClick={() => {
                                handleShow();
                                deleteHandler(post._id);
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
                                statusHandler(post._id);
                                setStatus(post.status);
                              }}
                            >
                              {post.status ? (
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
        <div className="pagination-div">{renderPageNumbers}</div>
      </div>
    </div>
  );
};

export default PostListPage;

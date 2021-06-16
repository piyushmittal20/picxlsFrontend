import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import Meta from "../../components/Meta";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { getNotificationListing } from "../../actions/notificationActions";

const NotificationList = ({ history }) => {
  const dispatch = useDispatch();

  const notificationList = useSelector((state) => state.notificationList);
  const { loading, error, notifications } = notificationList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(getNotificationListing());
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [history, adminInfo, dispatch]);

  return (
    <div className="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="Notification Management - Picxls" />
      {error && <ErrorToast message={error} />}
      {loading ? (
        <Loader />
      ) : notifications !== undefined ? (
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
              Notification Listing
            </h2>
            <Link to="/addnotification">
              <Button variant="dark" className="add-btn">
                <i className="fas fa-plus"></i>Create Notification
              </Button>
            </Link>
          </div>
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Title</th>
                <th className="colorblack">Sent to</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications &&
                notifications.map((notification, index) => (
                  <tr key={notification._id}>
                    <td>{index + 1}.</td>
                    <td>{notification.text}</td>
                    <td>{notification.type}</td>
                    <td>
                      {moment(notification.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      <ul className="action-list">
                        <Link to={`/editnotification/${notification._id}`}>
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
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
    </div>
  );
};

export default NotificationList;

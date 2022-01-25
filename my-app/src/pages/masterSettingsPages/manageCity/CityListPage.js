import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../actions/masterSettings";
import { Button, Badge, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ADMIN_ADDCITY_RESET,
  ADMIN_UPDATECITY_RESET,
} from "../../../constants/adminConstants";
import Modals from "../../../components/Modal";
import { FaEdit } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from "../../../components/Loader";
import ErrorToast from "../../../components/ErrorToast";
import Meta from "../../../components/Meta";
import moment from "moment";

const CityListPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const cityList = useSelector((state) => state.cityList);
  const { loading, error, cities } = cityList;

  const cityDelete = useSelector((state) => state.cityDelete);
  const { success: successDelete } = cityDelete;

  const cityStatusUpdate = useSelector((state) => state.cityStatusUpdate);
  const { success: statusSuccess } = cityStatusUpdate;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("cityId", id);
  };

  console.log(cities);

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDCITY_RESET });
      dispatch({ type: ADMIN_UPDATECITY_RESET });
      dispatch(getCities());
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [dispatch, successDelete, statusSuccess, history, adminInfo]);

  return (
    <div className="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="City List - Picxls" />
      {show && <Modals show={show} setShow={setShow} status={status} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error} />
      ) : cities !== undefined ? (
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
              City Listing
            </h2>
            <Link to="/addcity">
              <Button variant="dark" className="add-btn">
                <i className="fas fa-plus"></i>Add
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
                <th className="colorblack">Country</th>
                <th className="colorblack"> State</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities &&
                cities.map((city, index) => (
                  <tr key={city._id}>
                    <td>{index + 1}.</td>
                    <td>{city.title}</td>
                    <td>{city.country && city.country.title}</td>
                    <td>{city.state && city.state.title}</td>
                    <td>
                      {moment(city.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      {city.status ? (
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
                    <td>
                      <ul className="action-list">
                        <Link to={`/editcity/${city._id}`}>
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
                            <Tooltip {...props}>Change Status</Tooltip>
                          )}
                        >
                          <li
                            className="action-list-item"
                            onClick={() => {
                              handleShow();
                              deleteHandler(city._id);
                              setStatus(city.status);
                            }}
                          >
                            {city.status ? (
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

export default CityListPage;

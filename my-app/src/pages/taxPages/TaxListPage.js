import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Badge, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { getTaxlisting } from "../../actions/taxActions";
import { RiEyeFill } from "react-icons/ri";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import Loader from "../../components/Loader";
import moment from "moment";
import DeleteModal from "../../components/DeleteModal";
import Modals from "../../components/Modal";
import Meta from "../../components/Meta";
import ErrorToast from "../../components/ErrorToast";
import {
  ADMIN_TAXUPDATE_RESET,
  ADMIN_TAXDELETE_RESET,
} from "../../constants/adminConstants";

const TaxListPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const listTax = useSelector((state) => state.listTax);
  const { loading, error, taxes } = listTax;

  const taxStatus = useSelector((state) => state.taxStatus);
  const { success } = taxStatus;

  const deleteTax = useSelector((state) => state.deleteTax);
  const { success: deleteSuccess } = deleteTax;

  const handleShow = () => setShow(true);

  const handleShow2 = () => setShow2(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delTaxId", id);
  };

  const statusHandler = (id) => {
    localStorage.setItem("taxId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_TAXDELETE_RESET });
      dispatch({ type: ADMIN_TAXUPDATE_RESET });
      dispatch(getTaxlisting());
    } else {
      history.push("/admin-login");
    }
  }, [adminInfo, history, dispatch, success, deleteSuccess]);

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Tax Management - Picxls" />
      {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
      {show && <DeleteModal show={show} setShow={setShow} />}
      {/* {users === undefined && (
        <div className="errorCmp">
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error! 😐</Alert.Heading>
            <p>
              We are unable to serve data. Something went wrong, please check
              your internet connection or try again later.
            </p>
          </Alert>
        </div>
      )} */}
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
            Tax Listing
          </h2>
          <Link to="/adduser">
            <Button variant="dark" className="add-btn">
              <i className="fas fa-plus"></i>Add Tax
            </Button>
          </Link>
        </div>
        {/* <div className="filter-container">
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
        </div> */}
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorToast message={error} />
        ) : (
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead style={{ borderBottom: "1px solid black" }}>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Tax Name</th>
                <th className="colorblack">Country</th>
                <th className="colorblack">State</th>
                <th className="colorblack">Tax Percentage</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Action</th>
              </tr>
            </thead>
            <tbody style={{ borderBottom: "1px solid black" }}>
              {taxes &&
                taxes.map((tax, index) => (
                  <tr key={tax._id}>
                    <td>{index + 1}.</td>
                    <td>{tax.title}</td>
                    <td>{tax.country.title}</td>
                    <td>{tax.state.title}</td>
                    <td style={{ textAlign: "center" }}>
                      {tax.taxPercentage}%
                    </td>
                    <td>
                      {" "}
                      {moment(tax.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      {tax.status ? (
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
                        <Link to={`/viewtax/${tax._id}`}>
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
                        <Link to={`/edittax/${tax._id}`}>
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
                              deleteHandler(tax._id);
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
                              statusHandler(tax._id);
                              setStatus(tax.status);
                            }}
                          >
                            {tax.status ? (
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
      </div>
    </div>
  );
};

export default TaxListPage;

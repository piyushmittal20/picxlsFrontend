import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStates } from "../../../actions/masterSettings";
import { Link } from "react-router-dom";
import { Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ADMIN_ADDSTATE_RESET } from "../../../constants/adminConstants";
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

const StateListPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const stateList = useSelector((state) => state.stateList);
  const { loading, error, states } = stateList;

  const stateDelete = useSelector((state) => state.stateDelete);
  const { success: deleteSuccess } = stateDelete;

  const stateStatusUpdate = useSelector((state) => state.stateStatusUpdate);
  const { success: statusSuccess } = stateStatusUpdate;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("stateId", id);
  };

  useEffect(() => {
    if (adminInfo) {
      dispatch({ type: ADMIN_ADDSTATE_RESET });
      dispatch(getAllStates());
      setTimeout(() => {
        $("#datatable1").DataTable();
      }, 2000);
    } else {
      history.push("/admin-login");
    }
  }, [dispatch, deleteSuccess, statusSuccess]);

  console.log(states);

  return (
    <div class="wapper">
      <Meta title="State List - Picxls" />
      {show && <Modals show={show} setShow={setShow} status={status} />}
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
              </Link>
              State Listing
            </h2>
            <Link to="/addstate">
              <Button variant="dark" className="add-btn">
                <i className="fas fa-plus"></i>Add State
              </Button>
            </Link>
          </div>
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Name</th>
                <th className="colorblack">Country</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Actions</th>
              </tr>
            </thead>
            <tbody>
              {states &&
                states.map((state, index) => (
                  <tr key={state._id}>
                    <td>{index + 1}.</td>
                    <td>{state.title}</td>
                    <td>{state.country.title}</td>
                    <td>
                      {moment(state.createdAt.substring(0, 10)).format(
                        "MMMM Do YYYY"
                      )}
                    </td>
                    <td>
                      {state.status ? (
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
                        <Link to={`/editstate/${state._id}`}>
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
                              deleteHandler(state._id);
                              setStatus(state.status);
                            }}
                          >
                            {state.status ? (
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

export default StateListPage;

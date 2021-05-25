import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";
import ErrorToast from "../../components/ErrorToast";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const UserViewPage = ({ history, match }) => {
  const userId = match.params.id;

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (successDelete) {
      history.push("/userlist");
    } else {
      dispatch(getUserDetails(userId));
    }
  }, [adminInfo, dispatch, history, userId, successDelete]);

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delUserId", id);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title={user && user.username} />
      {show && <DeleteModal show={show} setShow={setShow} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error.message} />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px", marginTop: "25px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/userlist">
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
                User Details
              </h2>
            </div>
            {user && (
              <div class="card  shadow">
                <div class="card-header">
                  <h3 class="card-title">{user.firstname}</h3>
                  <div class="card-toolbar">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                    >
                      <Link className="mr-15" to={`/edituser/${user._id}`}>
                        <FaEdit />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={(props) => <Tooltip {...props}>Delete</Tooltip>}
                    >
                      <span
                        onClick={() => {
                          handleShow();
                          deleteHandler(user._id);
                        }}
                      >
                        <FaTrashAlt style={{ color: "red" }} />
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
                <div class="card-body">
                  {/*<div class="bgi-no-repeat bgi-position-center bgi-size-cover h-300px h-md-auto h-lg-300px h-xxl-auto mw-100 w-650px mx-auto">
                        <Image className="image" src={user.photo} alt="photo" fluid />
                    </div>*/}
                  <div class="">
                    <div class="">
                      {/*<h3 class="fw-bolder fs-1 mb-9">
                                                  <a href="#" class="text-gray-800">
                                                  {user.username}
                                                  </a>
                                                </h3>*/}
                      <table class="table table-borderless align-middle fw-bold">
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Name</td>
                          <td class="tdpd text-dark pe-0">{user.firstname}</td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Added on</td>
                          <td class="tdpd text-dark pe-0">
                            {user.createdAt && user.createdAt.substring(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Email</td>
                          <td class="tdpd text-dark pe-0">{user.email}</td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Date of birth</td>
                          <td class="tdpd text-dark pe-0">{user.birthday}</td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Contact</td>
                          <td class="tdpd text-dark pe-0">
                            {user.phoneNumber}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Bio</td>
                          <td class="tdpd text-dark pe-0">{user.about}</td>
                        </tr>
                      </table>
                      {/*<div className="btn-container">
                                                  <Link
                                                    className="mr-15"
                                                    to={`/edituser/${user._id}`}
                                                  >
                                                    <Button
                                                      className="btn"
                                                      variant="dark"
                                                      style={{ width: "100%" }}
                                                    >
                                                      Edit
                                                    </Button>
                                                  </Link>
                                                  <Button
                                                    className="btn"
                                                    variant="danger"
                                                    style={{ background: "red", width: "170px" }}
                                                    onClick={() => {
                                                      handleShow();
                                                      deleteHandler(user._id);
                                                    }}
                                                  >
                                                    Delete
                                                  </Button>
                                                </div>*/}
                    </div>
                  </div>
                </div>
              </div>
              // <Row>
              //     <Col md={6} style={{padding: '15px'}}>
              //         <Image className="image" src={user.photo} alt="Profile Image" fluid />
              //     </Col>
              //     <Col md={6}>
              //         <Card className="card">
              //         <ListGroup variant="flush" className="list">
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Name:</Col>
              //                 <Col>{user.firstname}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Username:</Col>
              //                 <Col>{user.username}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Email:</Col>
              //                 <Col>{user.email}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Date Of Birth:</Col>
              //                 <Col>{user.birthday}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Contact:</Col>
              //                 <Col>{user.phoneNumber ? user.phoneNumber : <span>NA</span>}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Bio:</Col>
              //                 <Col>{user.about ? user.about: <span>NA</span>}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //         </ListGroup>
              //         </Card>
              //         <div className="btn-container">
              //         <Link to={`/edituser/${user._id}`}>
              //         <Button className="btn" variant="dark" style={{width: '100%'}}>Edit</Button>
              //         </Link>
              //         <Button className="btn" variant="danger" style={{background: 'red', width: '170px'}}
              //             onClick={() => {
              //                 handleShow()
              //                 deleteHandler(user._id)
              //             }}
              //             >Delete</Button>
              //         </div>
              //     </Col>
              // </Row>
            )}
          </div>
        </container>
      )}
    </div>
  );
};

export default UserViewPage;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getStartag } from "../../actions/startagActions";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const StartagViewPage = ({ history, match }) => {
  const startagId = match.params.id;
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const startagDetail = useSelector((state) => state.startagDetail);
  const { loading, error, startag } = startagDetail;

  const startagDelete = useSelector((state) => state.startagDelete);
  const { success: successDelete } = startagDelete;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (successDelete) {
      history.push("/startaglist");
    } else {
      dispatch(getStartag(startagId));
    }
  }, [adminInfo, history, dispatch, successDelete]);

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delStarId", id);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
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
              style={{ marginBottom: "20px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/startaglist">
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
                Startag Detail
              </h2>
            </div>
            {startag && (
              <div class="card  shadow">
                <div class="card-header">
                  <h3 class="card-title">{startag.name}</h3>
                  <div class="card-toolbar">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                    >
                      <Link
                        className="mr-15"
                        to={`/editstartag/${startag._id}`}
                      >
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
                          deleteHandler(startag._id);
                        }}
                      >
                        <FaTrashAlt style={{ color: "red" }} />
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
                <div class="card-body bg-white p-12 ">
                  {startag.image !== null ? (
                    <div class="bgi-no-repeat bgi-position-center bgi-size-cover h-300px h-md-auto ">
                      <Image
                        className="image"
                        src={startag.image}
                        alt="photo"
                        fluid
                      />
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <div class="">
                    <div class="card-body bg-light px-12 py-10">
                      <h3 class="fw-bolder fs-1 mb-9">
                        <a href="#" class="text-gray-800">
                          {startag.name}
                        </a>
                      </h3>
                      <table class="table table-borderless align-middle fw-bold">
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Type</td>
                          <td class="tdpd text-dark pe-0">{startag.type}</td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Added on</td>
                          <td class="tdpd text-dark pe-0">
                            {startag.createdAt &&
                              startag.createdAt.substring(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Cost</td>
                          <td class="tdpd text-dark pe-0">
                            {startag.cost ? startag.cost : "NA"}
                          </td>
                        </tr>
                      </table>
                      {/*<div className="btn-container">
                                          <Link
                                            className="mr-15"
                                            to={`/editstartag/${startag._id}`}
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
                                              deleteHandler(startag._id);
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </div>*/}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* {startag && (
              <Row className="box bg-white">
                <Col md={6}>
                  <Image
                    className="image"
                    src={`https://picxls-testing.herokuapp.com/${startag.image}`}
                    alt="photo"
                    fluid
                  />
                </Col>
                <Col md={6} className="bg-light">
                  <Card className="card bg-light">
                    <ListGroup variant="flush" className="list">
                      <h3 class="list-item fw-bolder fs-1 mb-9">
                        <a href="#" class="text-gray-800">
                          Gaming
                        </a>
                      </h3>
                      <ListGroup.Item className="list-item">
                        <Row>
                          <Col>Name:</Col>
                          <Col className="text-primary">{startag.name}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="list-item">
                        <Row>
                          <Col>Type:</Col>
                          <Col className="text-primary">{startag.type}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="list-item">
                        <Row>
                          <Col>Added On:</Col>
                          <Col className="text-primary">
                            {startag.createdAt &&
                              startag.createdAt.substring(0, 10)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="list-item">
                        <Row>
                          <Col>Cost:</Col>
                          <Col className="text-primary">
                            {startag.cost ? startag.cost : "NA"}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <div className="btn-container">
                    <Link to={`/editstartag/${startag._id}`}>
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
                      style={{ background: "red", width: "114px" }}
                      onClick={() => {
                        handleShow();
                        deleteHandler(startag._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            )} */}
          </div>
        </container>
      )}
    </div>
  );
};

export default StartagViewPage;

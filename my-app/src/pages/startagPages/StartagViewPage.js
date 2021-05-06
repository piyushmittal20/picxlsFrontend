import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { getStartag } from "../../actions/startagActions";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";

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
    <>
      {show && <DeleteModal show={show} setShow={setShow} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error.message} />
      ) : (
        <container>
          <div className="container-fluid mt-10">
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
            <div class="card mb-5 mb-xxl-8">
              <div class="card-body d-flex bg-white p-12 flex-column flex-md-row flex-xxl-row">
                <div
                  class="bgi-no-repeat bgi-position-center bgi-size-cover h-300px h-md-auto h-lg-300px h-xxl-auto mw-100 w-650px mx-auto"
                >
                    <Image
                    className="image"
                    src={startag.image}
                    alt="photo"
                    fluid
                  />
                </div>
                <div class="card shadow-none w-auto w-md-300px w-lg-auto w-xxl-300px ml-auto">
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
                        <td class="tdpd text-dark pe-0">{startag.createdAt && startag.createdAt.substring(0, 10)}</td>
                      </tr>
                      <tr>
                        <td class="tdpd text-gray-600 ps-0">Cost</td>
                        <td class="tdpd text-dark pe-0">{startag.cost ? startag.cost : "NA"}</td>
                      </tr>
                    </table>
                    <div className="btn-container">
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
                    </div>
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
    </>
  );
};

export default StartagViewPage;

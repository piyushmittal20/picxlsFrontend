import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { verifyRequestDetail } from "../../actions/userActions";
import VerifyBox from "../../components/VerifyBox";
import DropModal from "../../components/DropModal";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestViewPage = ({ history, match }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const requestId = match.params.id;

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const requestDetail = useSelector((state) => state.requestDetail);
  const { loading, error, request } = requestDetail;

  const userVerifying = useSelector((state) => state.userVerifying);
  const { success: verifySuccess } = userVerifying;

  const handleShow = () => setShow(true);

  const showHandler = (id) => {
    localStorage.setItem("userVerifyId", id);
  };

  const handleShow2 = () => setShow2(true);

  const showHandler2 = (id) => {
    localStorage.setItem("userDropId", id);
  };

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (verifySuccess) {
      history.push("/requestlist");
    } else {
      dispatch(verifyRequestDetail(requestId));
    }
  }, [adminInfo, history, dispatch, verifySuccess, requestId]);

  return (
    <div style={{ paddingBottom: "50px" }}>
      {show2 && <DropModal show={show2} setShow={setShow2} />}
      {show && <VerifyBox show={show} setShow={setShow} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px", marginTop: "25px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/requestlist">
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
                Request Detail
              </h2>
            </div>
            {request && request.userId && (
              <div class="card shadow">
                <div class="card-header">
                  <h3 class="card-title">{request.username}</h3>
                  <div class="card-toolbar">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={(props) => <Tooltip {...props}>Verify</Tooltip>}
                    >
                      <span
                        className="btn"
                        variant="success"
                        onClick={() => {
                          handleShow();
                          showHandler(request._id);
                        }}
                      >
                        <FaCheck style={{ color: "green" }} />
                      </span>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={(props) => <Tooltip {...props}>Drop</Tooltip>}
                    >
                      <span
                        className="btn"
                        variant="danger"
                        onClick={() => {
                          handleShow2();
                          showHandler2(request._id);
                        }}
                      >
                        <FaTimes style={{ color: "red" }} />
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
                <div class="card-body">
                  <div class="">
                    <div class="">
                      {/*<h3 class="fw-bolder fs-1 mb-9">
                                <a href="#" class="text-gray-800">
                                {request.username}
                                </a>
                              </h3>*/}
                      <table class="table table-borderless align-middle fw-bold">
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Name</td>
                          <td class="tdpd text-dark pe-0">{request.name}</td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Category</td>
                          <td class="tdpd text-dark pe-0">
                            {request.category}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">DOB:</td>
                          <td class="tdpd text-dark pe-0">
                            {request.userId.birthday}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Email:</td>
                          <td class="tdpd text-dark pe-0">
                            {request.userId.email}
                          </td>
                        </tr>
                        <tr>
                          <td class="tdpd text-gray-600 ps-0">Contact No:</td>
                          <td class="tdpd text-dark pe-0">
                            {request.userId.phoneNumber}
                          </td>
                        </tr>
                      </table>
                      <div class="bgi-no-repeat bgi-position-center bgi-size-cover h-300px h-md-auto ">
                        <Image
                          className="image"
                          src={request.photo}
                          alt="photo"
                          fluid
                        />
                      </div>
                      {/*<div className="btn-container">
                              <Button 
                                className="btn" 
                                variant="success" 
                                style={{background: 'green'}}
                                onClick={() => {
                                    handleShow()
                                    showHandler(request._id)
                                }}
                                >Verify</Button>
                                <Button 
                                className="btn" 
                                variant="danger" 
                                style={{background: 'red'}}
                                onClick={() => {
                                    handleShow2()
                                    showHandler2(request._id)
                                }}
                                >Dropped</Button>
                              </div>*/}
                    </div>
                  </div>
                </div>
              </div>
              // <Row>
              //     <Col md={6} style={{padding: '15px'}}>
              //         <Image className="image" src={`https://picxls-testing.herokuapp.com/${request.photo}`} alt="Id Proof" fluid />
              //     </Col>
              //     <Col md={6}>
              //         <Card className="card">
              //         <ListGroup variant="flush" className="list">
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Name:</Col>
              //                 <Col>{request.name}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Username:</Col>
              //                 <Col>{request.username}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Category:</Col>
              //                 <Col>{request.category}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>DOB:</Col>
              //                 <Col>{request.userId.birthday}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Email:</Col>
              //                 <Col>{request.userId.email}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //             <ListGroup.Item className="list-item">
              //             <Row>
              //                 <Col>Contact no:</Col>
              //                 <Col>{request.userId.phoneNumber ? request.userId.phoneNumber: <span>NA</span>}</Col>
              //             </Row>
              //             </ListGroup.Item>
              //         </ListGroup>
              //         </Card>
              //         <div className="btn-container">
              // <Button
              // className="btn"
              // variant="success"
              // style={{background: 'green'}}
              // onClick={() => {
              //     handleShow()
              //     showHandler(request._id)
              // }}
              // >Verify</Button>
              // <Button
              // className="btn"
              // variant="danger"
              // style={{background: 'red'}}
              // onClick={() => {
              //     handleShow2()
              //     showHandler2(request._id)
              // }}
              // >Dropped</Button>
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

export default RequestViewPage;

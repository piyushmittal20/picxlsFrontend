import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, reportList } from "../../actions/postActions";
import Modals from '../../components/Modal';
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import { Container, Row, Col, Card, ListGroup, Image, Badge } from "react-bootstrap";
import $ from 'jquery';
import {Link} from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const PostViewPage = ({ history, match }) => {
  const postId = match.params.id;
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const postDetail = useSelector((state) => state.postDetail);
  const { loading, error, feed } = postDetail;

  const listReport = useSelector((state) => state.listReport)
  const {loading: listLoading, error: listError, reports} = listReport

  const statusUpdate = useSelector((state) => state.statusUpdate)
  const {success: updateSuccess} = statusUpdate

  const handleShow = () => setShow(true)

  const deleteHandler = (id) => {
    localStorage.setItem('reportId', id);
}

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    } else {
      dispatch(getPost(postId));
      dispatch(reportList())
      setTimeout(() => {
        $('#datatable1').DataTable()
      }, 2000)
    }
  }, [adminInfo, dispatch, history]);

  return (
    <>
      {show && <Modals show={show} setShow={setShow} status={status} />}
      <Container>
      <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px', marginTop: '25px'}}>
            <h2 className="head"> <Link to="/postlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link>Post Detail</h2>
      </div>
        {feed && feed[0] && feed.map((f) => (
        <Row className="box">
          <Col md={6}>
            <Image className="image" src={`https://picxls-testing.herokuapp.com/${f.post}`} alt="post" />
          </Col>
          <Col md={6}>
            <Card className="card">
                <ListGroup variant="flush" className="list">
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Name</Col>
                            <Col>{f.user_details.firstname}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Username</Col>
                            <Col>{f.user_details.username}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Date of Birth</Col>
                            <Col>{f.user_details.birthday}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Views</Col>
                            <Col>{f.views.length > 0 ? f.views[0].view_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Comments</Col>
                            <Col>{f.comments.length > 0 ? f.comments[0].comment_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Likes</Col>
                            <Col>{f.likes.length > 0 ? f.likes[0].like_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                        <Row>
                            <Col>Reports</Col>
                            <Col>{f.reports.length > 0 ? f.reports[0].report_count : 0}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
          </Col>
          <Col md={12} style={{padding: '10px', margin: '10px'}}>
          <button type="button" id="kt_layout_builder_export" className="btn btn-light me-2">
						<span class="indicator-label">Remove Post</span>
						<span class="indicator-progress">Please wait... 
						<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
					</button>
          </Col>
          <Col style={{padding: '10px', margin: '10px'}}>
          <h1>Report List</h1>
          <table id="datatable1"  className="table table-row-bordered gy-5">
          <thead>
            <tr className="fw-bold fs-6 text-muted">
                <th>S No.</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Reason</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {reports &&  reports.map((report, index) => (
                <tr key={report._id}>
                    <td>{index+1}.</td>
                    <td>{report.user_details.firstname}</td>
                    <td>{report.user_details.username}</td>
                    <td>{report.user_details.email ? report.user_details.email : <span>NA</span>}</td>
                    <td>{report.description}</td>
                    <td>{report.createdAt.substring(0, 10)}</td>
                    <td>{report.status ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                    <td style={{padding: '10px'}}>
                        <ul className="action-list">
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow()
                                    deleteHandler(report._id)
                                    setStatus(report.status)}}
                                  >{report.status ? <BsToggleOn style={{color: 'green', fontSize: '25px'}} /> : <BsToggleOff style={{color: 'red', fontSize: '25px'}} />}
                            </li>
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
          </Col>
        </Row>
        ))}
      </Container>
    </>
  );
};

export default PostViewPage;

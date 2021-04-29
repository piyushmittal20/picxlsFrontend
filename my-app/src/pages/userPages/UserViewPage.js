import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import {getUserDetails} from '../../actions/userActions';
import ErrorToast from '../../components/ErrorToast';
import DeleteModal from '../../components/DeleteModal';
import Loader from '../../components/Loader';

const UserViewPage = ({history, match}) => {
    const userId = match.params.id;
    
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(!adminInfo) {
            history.push('/admin-login')
        }
        if(successDelete) {
            history.push('/userlist')
        } 
        else {
            dispatch(getUserDetails(userId))
        }
    }, [adminInfo, dispatch, history, userId])

    const handleShow = () => setShow(true)

    const deleteHandler = (id) => {
        localStorage.setItem('delUserId', id);
    }

    return (
        <>
            {show && <DeleteModal show={show} setShow={setShow} />}
            {loading ? <Loader /> : error ? <ErrorToast message={error.message} /> : (
            <Container>
            <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px', marginTop: '25px'}}>
            <h2 className="head"> <Link to="/userlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> User Details</h2>
            </div>
            {user && (
                <Row>
                    <Col md={6} style={{padding: '15px'}}>
                        <Image className="image" src={`https://picxls-testing.herokuapp.com/${user.photo}`} alt="Profile Image" fluid />
                    </Col>
                    <Col md={6}>
                        <Card className="card">
                        <ListGroup variant="flush" className="list">
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Name:</Col>
                                <Col>{user.firstname}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Username:</Col>
                                <Col>{user.username}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Email:</Col>
                                <Col>{user.email}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Date Of Birth:</Col>
                                <Col>{user.birthday}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Contact:</Col>
                                <Col>{user.phoneNumber ? user.phoneNumber : <span>NA</span>}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Bio:</Col>
                                <Col>{user.about ? user.about: <span>NA</span>}</Col>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                        <div className="btn-container">
                        <Link to={`/edituser/${user._id}`}>
                        <Button className="btn" variant="dark" style={{width: '100%'}}>Edit</Button>
                        </Link>
                        <Button className="btn" variant="danger" style={{background: 'red', width: '170px'}}
                            onClick={() => {
                                handleShow()
                                deleteHandler(user._id)
                            }}
                            >Delete</Button>
                        </div>
                    </Col>
                </Row>
            )}
            </Container>
            )}
        </>
    )
}

export default UserViewPage

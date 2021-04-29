import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import {verifyRequestDetail} from '../../actions/userActions';
import VerifyBox from '../../components/VerifyBox';
import DropModal from '../../components/DropModal';

const RequestViewPage = ({history, match}) => {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const requestId = match.params.id;

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const requestDetail = useSelector(state => state.requestDetail)
    const {loading, error, request} = requestDetail;

    const userVerifying = useSelector(state => state.userVerifying)
    const {success: verifySuccess} = userVerifying;

    const handleShow = () => setShow(true)

    const showHandler = (id) => {
        localStorage.setItem('userVerifyId', id)
    }

    const handleShow2 = () => setShow2(true)

    const showHandler2 = (id) => {
        localStorage.setItem('userDropId', id)
    }

    useEffect(() => {
        if(!adminInfo) {
            history.push('/admin-login')
        }
        if(verifySuccess) {
            history.push('/requestlist')
        }
        else {
            dispatch(verifyRequestDetail(requestId))
        }
    }, [adminInfo, history, dispatch, verifySuccess, requestId])

    return (
        <>
            {show2 && <DropModal show={show2} setShow={setShow2} />}
            {show && <VerifyBox show={show} setShow={setShow} />}
            <Container>
            <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px', marginTop: '25px'}}>
            <h2 className="head"> <Link to="/requestlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> Request Detail</h2>
            </div>
            {request && request.userId && (
                <Row>
                    <Col md={6} style={{padding: '15px'}}>
                        <Image className="image" src={`https://picxls-testing.herokuapp.com/${request.photo}`} alt="Id Proof" fluid />
                    </Col>
                    <Col md={6}>
                        <Card className="card">
                        <ListGroup variant="flush" className="list">
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Name:</Col>
                                <Col>{request.name}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Username:</Col>
                                <Col>{request.username}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Category:</Col>
                                <Col>{request.category}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>DOB:</Col>
                                <Col>{request.userId.birthday}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Email:</Col>
                                <Col>{request.userId.email}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Contact no:</Col>
                                <Col>{request.userId.phoneNumber ? request.userId.phoneNumber: <span>NA</span>}</Col>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                        <div className="btn-container">
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
                        </div>
                    </Col>
                </Row>
            )}
            </Container>
        </>
    )
}

export default RequestViewPage

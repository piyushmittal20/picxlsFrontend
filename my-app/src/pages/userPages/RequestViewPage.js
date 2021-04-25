import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import {verifyRequestDetail} from '../../actions/userActions';


const RequestViewPage = ({history, match}) => {
    const requestId = match.params.id;

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const requestDetail = useSelector(state => state.requestDetail)
    const {loading, error, request} = requestDetail;

    useEffect(() => {
        if(!adminInfo) {
            history.push('/admin-login')
        } else {
            dispatch(verifyRequestDetail(requestId))
        }
    }, [adminInfo, history, dispatch])

    console.log(request);

    return (
        <>
            <Container>
            {request && request.userId && (
                <Row>
                    <Col md={6} style={{padding: '15px'}}>
                        <Image style={{width: '500px', height:'500px'}} src={`https://picxls-testing.herokuapp.com/${request.photo}`} alt="Id Proof" fluid />
                    </Col>
                    <Col md={6} style={{padding: '15px', fontSize: '17px'}}>
                        <Card style={{border: '1px solid black'}}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <Row>
                                <Col>Name:</Col>
                                <Col>{request.name}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Username:</Col>
                                <Col>{request.username}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Category:</Col>
                                <Col>{request.category}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>DOB:</Col>
                                <Col>{request.userId.birthday}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Email:</Col>
                                <Col>{request.userId.email}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Contact no:</Col>
                                <Col>{request.userId.phoneNumber ? request.userId.phoneNumber: <span>NA</span>}</Col>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                        <Button className="m-5 px-5 py-3" variant="success">Verify</Button>
                        <Button className="m-5 px-5 py-3" variant="danger">Dropped</Button>
                    </Col>
                </Row>
            )}
            </Container>
        </>
    )
}

export default RequestViewPage

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import {getStartag} from '../../actions/startagActions';
import DeleteModal from '../../components/DeleteModal';
import Loader from '../../components/Loader';
import ErrorToast from '../../components/ErrorToast';

const StartagViewPage = ({history, match}) => {
    const startagId = match.params.id;
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const startagDetail = useSelector(state => state.startagDetail)
    const {loading, error, startag} = startagDetail;

    const startagDelete = useSelector(state => state.startagDelete)
    const {success: successDelete} = startagDelete;

    useEffect(() => {
        if(!adminInfo) {
            history.push('/admin-login')
        } 
        if(successDelete) {
            history.push('/startaglist')
        } 
        else {
            dispatch(getStartag(startagId))
        }
    }, [adminInfo, history, dispatch, successDelete])

    const handleShow = () => setShow(true)

    const deleteHandler = (id) => {
        localStorage.setItem('delStarId', id);
    }

    return (
        <>
            {show && <DeleteModal show={show} setShow={setShow} />}
            {loading ? <Loader /> : error ? <ErrorToast message={error.message} /> : (
            <Container>
            <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px', marginTop: '25px'}}>
            <h2 className="head"> <Link to="/startaglist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> Startag Detail</h2>
            </div>
            {startag && (
                <Row className="box">
                    <Col md={6}>
                        <Image className="image" src={`https://picxls-testing.herokuapp.com/${startag.image}`} alt="photo" fluid  />
                    </Col>
                    <Col md={6}>
                    <Card className="card">
                        <ListGroup variant="flush" className="list">
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Name:</Col>
                                <Col>{startag.name}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Type:</Col>
                                <Col>{startag.type}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Added On:</Col>
                                <Col>{startag.createdAt && startag.createdAt.substring(0, 10)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-item">
                            <Row>
                                <Col>Cost:</Col>
                                <Col>{startag.cost ? startag.cost : "NA"}</Col>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                        <div className="btn-container">
                        <Link to={`/editstartag/${startag._id}`}>
                        <Button className="btn" variant="dark" style={{width: '100%'}}>Edit</Button>
                        </Link>
                        <Button className="btn" variant="danger" style={{background: 'red', width: '170px'}}
                            onClick={() => {
                                handleShow()
                                deleteHandler(startag._id)
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

export default StartagViewPage

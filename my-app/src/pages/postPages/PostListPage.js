import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Badge} from 'react-bootstrap';
import $ from 'jquery';
import {GrPowerReset} from 'react-icons/gr';
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from '../../components/Loader';
import DeleteModal from '../../components/DeleteModal';
import Modals from '../../components/Modal';
import ErrorToast from '../../components/ErrorToast';
import {RiEyeFill} from 'react-icons/ri'
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import {getAllPosts} from '../../actions/postActions';

const PostListPage = ({history}) => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [lastDate, setLastDate] = useState('');
    var   [data, setData] = useState([]);
    const [status2, setStatus2] = useState('every');

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const listPost = useSelector(state => state.listPost)
    const {loading, error, posts} = listPost;

    const postDelete = useSelector(state => state.postDelete)
    const {success: deleteSuccess} = postDelete;

    const postStatus = useSelector(state => state.postStatus)
    const {success: updateSuccess} = postStatus;

    const handleShow = () => setShow(true)

    const handleShow2 = () => setShow2(true)

    const deleteHandler = (id) => {
        localStorage.setItem('delPostId', id);
    }

    const statusHandler = (id) => {
        localStorage.setItem('postId', id);
    }

    useEffect(() => {
        if(adminInfo) {
            dispatch(getAllPosts())
            setTimeout(() => {
                $('#datatable1').DataTable({})
            }, 2000)
        } else {
            history.push('/admin-login')
        }
    }, [dispatch, history, adminInfo, deleteSuccess, updateSuccess])

    console.log(posts)

    var result = [];

    if(!startDate && !lastDate && status2 === 'every') {
        data = posts
    }

    useEffect(() => {
        if(startDate && lastDate) {
            result = posts && posts.filter(post => (
                moment(post.createdAt).isBetween(startDate, lastDate)
            ))
        } if(startDate && !lastDate) {
            result = posts && posts.filter(post  => (
                moment(post.createdAt).isSame(startDate)
            ))
        } if(status2 !== 'every') {
            result = posts && posts.filter(post => (
                post.status.toString() === status2
            ))
        }
        setData(result)
    }, [startDate, lastDate, status2])

    const handleClick1 = (e) => {
        setStartDate(e.target.value)
    }

    const handleClick2 = (e) => {
        setLastDate(e.target.value)
    }

    const resetFilter = () => {
        setLastDate('')
        setStartDate('')
        setStatus2('every')
    }

    return (
        <div className="wrapper">
        {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
        {show && <DeleteModal show={show} setShow={setShow} />}
        {loading ? <Loader /> : error ? <ErrorToast message={error.message} /> : (
        <div className="container-fluid mt-10">
        <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px'}}>
            <h2 className="head"> <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> Posts Listing</h2>
        </div>
        <div className="filter-container">
                <label>Start Date: </label>
                <input type="date" value={startDate} onChange={handleClick1} />
                <label>End Date: </label>
                <input type="date" value={lastDate} onChange={handleClick2} />
                <label>Status:</label>
                <select value={status2} onChange={(e) => setStatus2(e.target.value)}>
                    <option disabled selected value>Select option</option>
                    <option value="every">All</option>
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                </select>
                <div className="reset-icon" onClick={resetFilter}><GrPowerReset /></div>
            </div>
        <table id="datatable1"  className="table table-row-bordered gy-5">
        <thead>
            <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack"><bold>#</bold></th>
                <th className="colorblack">Name</th>
                <th className="colorblack">Username</th>
                <th className="colorblack">Email</th>
                <th className="colorblack">Contact Number</th>
                <th className="colorblack">Post</th>
                <th className="colorblack">Added on</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Action</th>
            </tr>
        </thead>
        <tbody>
            {data && data.map((post, index) => (
                <tr key={post._id}>
                    <td>{index+1}.</td>
                    <td>{post.creator_details.firstname}</td>
                    <td>{post.creator_details.username}</td>
                    <td>{post.creator_details.email ? post.creator_details.email : <span>NA</span>}</td>
                    <td>{post.creator_details.phoneNumber ? post.creator_details.phoneNumber : <span>NA</span>}</td>
                    <td>Feed</td>
                    <td>{post.createdAt.substring(0, 10)}</td>
                    {/* <td>{post.status ? "Active" : "InActive"}</td> */}
                    <td>{post.status ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                    <td style={{padding: '10px'}}>
                        <ul className="action-list">
                            <Link to={`/viewpost/${post._id}`}>
                            <li className="action-list-item"><RiEyeFill style={{color: "darkblue"}} /></li>
                            </Link>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow()
                                    deleteHandler(post._id)
                                }}
                                ><FaTrashAlt style={{color: 'red'}} />
                            </li>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow2()
                                    statusHandler(post._id)
                                    setStatus(post.status)
                                }}>{post.status ? <BsToggleOn style={{color: 'green', fontSize: '25px'}} /> : <BsToggleOff style={{color: 'red', fontSize: '25px'}} />}
                            </li>
                        </ul>
                    </td>
                </tr>
            ))}
        </tbody>
	</table>
    </div>
    )}
    </div>
    )
}

export default PostListPage

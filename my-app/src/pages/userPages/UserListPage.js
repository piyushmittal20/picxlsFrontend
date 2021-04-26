import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Badge} from 'react-bootstrap';
import {listUsers} from '../../actions/userActions';
import DeleteModal from '../../components/DeleteModal';
import Modals from '../../components/Modal';
import {RiEyeFill} from 'react-icons/ri'
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from '../../components/Loader';
import { ADMIN_ADDUSER_RESET, ADMIN_UPDATEUSER_RESET } from '../../constants/adminConstants';
import ErrorToast from '../../components/ErrorToast';

const UserListPage = ({history}) => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [status, setStatus] = useState('');

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList;

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    const userStatus = useSelector(state => state.userStatus)
    const {success: statusSuccess} = userStatus

    const handleShow = () => setShow(true)

    const handleShow2 = () => setShow2(true)

    const deleteHandler = (id) => {
        localStorage.setItem('delUserId', id);
    }

    const statusHandler = (id) => {
        localStorage.setItem('userId', id);
    }

    useEffect(() => {
        if(adminInfo) {
            dispatch({type: ADMIN_ADDUSER_RESET})
            dispatch({type: ADMIN_UPDATEUSER_RESET})
            dispatch(listUsers())
                setTimeout(() => {
                    $('#datatable1').DataTable({
                        initComplete: function () {
                            this.api().columns().every( function () {
                                var column = this;
                                var select = $('<select><option value=""></option></select>')
                                    .appendTo( $(column.footer()).empty() )
                                    .on( 'change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).val()
                                        );
                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();
                                    } );
                                column.data().unique().sort().each( function ( d, j ) {
                                    select.append( '<option value="'+d+'">'+d+'</option>' )
                                } );
                            } );
                        }
                    })
                }, 2000)
        } else {
            history.push('/admin-login')
        }
    }, [adminInfo, dispatch, history, successDelete, statusSuccess])

    return (
        <>
        {show2 && <Modals show={show2} setShow={setShow2} status={status} />}
        {show && <DeleteModal show={show} setShow={setShow} />}
        {loading ? <Loader /> : error ? <ErrorToast message={error.message} /> : (
        <div style={{padding: '15px', margin: '10px 80px'}}>
        <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px'}}>
            <h2 className="head"> <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> Users Listing</h2>
        <Link to="/adduser">
            <Button variant="dark" className="add-btn"><i className="fas fa-plus"></i>Add User</Button>
        </Link>
        </div>
        <table id="datatable1"  className="table table-row-bordered gy-5">
        <thead>
            <tr className="fw-bold fs-6 text-muted">
                <th>S No.</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {users && users.map((user, index) => (
                <tr key={user._id}>
                    <td>{index+1}.</td>
                    <td>{user.firstname}</td>
                    <td>{user.username}</td>
                    <td>{user.email ? user.email : <span>NA</span>}</td>
                    <td>{user.phoneNumber ? user.phoneNumber : <span>NA</span>}</td>
                    <td>{user.createdAt.substring(0, 10)}</td>
                    <td>{user.status ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                    <td style={{padding: '10px'}}>
                        <ul className="action-list">
                            <li className="action-list-item"><RiEyeFill style={{color: "darkblue"}} /></li>
                            <Link to={`/edituser/${user._id}`}>
                            <li className="action-list-item">
                                <FaEdit />
                            </li>
                            </Link>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow()
                                    deleteHandler(user._id)
                                }}
                                ><FaTrashAlt style={{color: 'red'}} />
                            </li>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow2()
                                    statusHandler(user._id)
                                    setStatus(user.status)
                                }}>{user.status ? <BsToggleOn style={{color: 'green', fontSize: '25px'}} /> : <BsToggleOff style={{color: 'red', fontSize: '25px'}} />}
                            </li>
                        </ul>
                    </td>
                </tr>
            ))}
        </tbody>
	</table>
    </div>
    )}
    </>
    )
}

export default UserListPage

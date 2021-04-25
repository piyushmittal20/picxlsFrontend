import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getAllStartag} from '../../actions/startagActions';
import {Link} from 'react-router-dom';
import {Button, Badge} from 'react-bootstrap';
import DeleteModal from '../../components/DeleteModal';
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import Loader from '../../components/Loader';
import {RiEyeFill} from 'react-icons/ri'
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { ADMIN_ADDSTARTAG_RESET, ADMIN_UPDATESTARTAG_RESET } from "../../constants/adminConstants";

const StartagList = ({history}) => {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const startagList = useSelector(state => state.startagList)
    const {loading, error, startags} = startagList

    const startagDelete = useSelector(state => state.startagDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = startagDelete;

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const handleShow = () => setShow(true)

    const deleteHandler = (id) => {
        localStorage.setItem('delStarId', id);
    }

    useEffect(() => {
        if(adminInfo) {
            dispatch({type: ADMIN_ADDSTARTAG_RESET})
            dispatch({type: ADMIN_UPDATESTARTAG_RESET})
            dispatch(getAllStartag())
            setTimeout(() => {
                $('#datatable1').DataTable()
            }, 2000)
        } else {
            history.push('/admin-login')
        }
    }, [dispatch, history, adminInfo, successDelete])

    return(
        <>
        {show && <DeleteModal show={show} setShow={setShow} />}
        {loading ? <Loader /> : (
        <div style={{padding: '15px', margin: '10px 80px'}}>
        <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px'}}>
            <h2 className="head"> <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> Startag Listing</h2>
        <Link to="/addstartag">
        <Button variant="dark" className="add-btn"><i className="fas fa-plus"></i>Add Startag</Button>
        </Link>
        </div>
        <table id="datatable1"  className="table table-row-bordered gy-5">
        <thead>
            <tr className="fw-bold fs-6 text-muted">
                <th>S No.</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {startags && startags.map((startag, index) => (
                <tr key={startag._id}>
                    <td>{index+1}.</td>
                    <td>{startag.name}</td>
                    <td>{startag.createdAt.substring(0, 10)}</td>
                    <td>{startag.isActive ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                    <td style={{padding: '10px'}}>
                        <ul className="action-list">
                        <li className="action-list-item"><RiEyeFill style={{color: "darkblue"}} /></li>
                        <Link to={`/editstartag/${startag._id}`}>
                            <li className="action-list-item"><FaEdit /></li>
                        </Link>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                    handleShow()
                                    deleteHandler(startag._id)
                                }}
                                ><FaTrashAlt style={{color: 'red'}} /></li>
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
};

export default StartagList;

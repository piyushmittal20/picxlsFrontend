import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllPages} from '../../actions/cmsActions';
import {Badge, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import Modals from '../../components/Modal';
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loader from '../../components/Loader';
import ErrorToast from '../../components/ErrorToast';
import Meta from '../../components/Meta';
import moment from 'moment';

const CmsPageList = ({history}) => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');

    const dispatch = useDispatch()

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const pageList = useSelector(state => state.pageList)
    const {loading, error, pages} = pageList;

    const pageStatus = useSelector(state => state.pageStatus)
    const {success: updateSuccess} = pageStatus

    const handleShow = () => setShow(true)

    const deleteHandler = (id) => {
        localStorage.setItem('pageId', id)
    }

    useEffect(() => {
        if(adminInfo) {
            dispatch(getAllPages())
            setTimeout(() => {
                $('#datatable1').DataTable()
            }, 2000)
        } else {
            history.push('/admin-login')
        }
    }, [dispatch, history, adminInfo, updateSuccess])

    return (
    <div className="wapper">
    <Meta title="CMS - Picxls" />
    {show && <Modals show={show} setShow={setShow} status={status} />}
    {error && <ErrorToast message={error.message} />}
    {loading ? <Loader /> : (
    <div className="container-fluid mt-10">
    <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px'}}>
                    <h2> <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> CMS Listing</h2>
    </div>
    <table id="datatable1" className="table table-row-bordered gy-5">
        <thead>
            <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack"><bold>#</bold></th>
                <th className="colorblack">Title</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Status</th>
                <th className="colorblack">Actions</th>
            </tr>
        </thead>
        <tbody>
            {pages && pages.map((page, index) => (
                <tr key={page._id}>
                    <td>{index+1}.</td>
                    <td>{page.title}</td>
                    <td>{moment(page.createdAt.substring(0, 10)).format("MMMM Do YYYY")}</td>
                    <td>{page.status ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                    <td style={{padding: '10px'}}>
                        <ul className="action-list">
                            <Link to={`/editpage/${page._id}`}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                    Edit
                                    </Tooltip>
                                )}>
                            <li className="action-list-item"><FaEdit /></li>
                            </OverlayTrigger>
                            </Link>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                    Change Status
                                    </Tooltip>
                                )}>
                            <li 
                                className="action-list-item" 
                                onClick={() => {
                                handleShow()
                                deleteHandler(page._id)
                                setStatus(page.status)
                                }}>
                                    {page.status ? <BsToggleOn style={{color: 'green', fontSize: '25px'}} /> : <BsToggleOff style={{color: 'red', fontSize: '25px'}} />}
                            </li>
                            </OverlayTrigger>
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

export default CmsPageList

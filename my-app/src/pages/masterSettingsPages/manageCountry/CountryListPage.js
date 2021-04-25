import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries} from '../../../actions/masterSettings';
import {Link} from 'react-router-dom';
import {Button, Badge} from 'react-bootstrap';
import {ADMIN_ADDCOUNTRY_RESET, ADMIN_UPDATECOUNTRY_RESET} from '../../../constants/adminConstants';
import Modals from '../../../components/Modal';
import Loader from '../../../components/Loader';
import {FaEdit} from 'react-icons/fa';
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ErrorToast from '../../../components/ErrorToast';

const CountryListcountry = ({history}) => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');

    const dispatch = useDispatch()

    const countryList = useSelector(state => state.countryList)
    const {loading, error, countries} = countryList

    const countryDelete = useSelector(state => state.countryDelete)
    const {successDelete} = countryDelete

    const countryStatusUpdate = useSelector(state => state.countryStatusUpdate)
    const {success: updateSuccess} = countryStatusUpdate

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const handleShow = () => setShow(true)

    const deleteHandler = (id) => {
        localStorage.setItem('countryId', id)
    }

    useEffect(() => {
        if(adminInfo) {
            dispatch({type: ADMIN_ADDCOUNTRY_RESET})
            dispatch({type: ADMIN_UPDATECOUNTRY_RESET})
            dispatch(getAllCountries())
                setTimeout(() => {
                    $('#datatable1').DataTable()
                }, 2000)
        } else {
            history.push('/admin-login')
        }
    }, [dispatch, successDelete, updateSuccess])

    return (
        <div class="wapper">
            {show && <Modals show={show} setShow={setShow} status={status} />}
            {error && <ErrorToast message={error.message}/>}
            {loading ? <Loader /> : (
            <div style={{padding: '15px', margin: '10px 80px'}}>
                <div className="d-flex align-items-stretch justify-content-between" style={{marginBottom: '20px'}}>
                    <h2 className="head"> <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> Country Listing</h2>
                    <Link to="/addcountry">
                    <Button variant="dark" className="add-btn"><i className="fas fa-plus"></i>Add Country</Button>
                    </Link>
                </div>
                <table id="datatable1"  className="table table-row-bordered gy-5">
                    <thead>
                        <tr className="fw-bold fs-6 text-muted">
                            <th>S No.</th>
                            <th>Title</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {countries && countries.map((country, index) => (
                            <tr key={country._id}>
                                <td>{index+1}.</td>
                                <td>{country.title}</td>
                                <td>{country.createdAt.substring(0, 10)}</td>
                                <td>{country.status ? <Badge pill variant="success" style={{backgroundColor: 'green'}}>Active</Badge> : <Badge pill variant="danger" style={{backgroundColor: 'red', cursor: 'pointer'}}>Inactive</Badge>}</td>
                                <td>
                                    <ul className="action-list">
                                        
                                        <Link to={`/editcountry/${country._id}`}>
                                        <li className="action-list-item"><FaEdit /></li>
                                        </Link>
                                        <li 
                                            className="action-list-item" 
                                            onClick={() => {
                                                handleShow()
                                                deleteHandler(country._id)
                                                setStatus(country.status)
                                            }}
                                            >{country.status ? <BsToggleOn style={{color: 'green', fontSize: '25px'}} /> : <BsToggleOff style={{color: 'red', fontSize: '25px'}} />}</li>
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

export default CountryListcountry

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getUserDetails, userUpdate} from '../../actions/userActions';
import Loader from '../../components/Loader';
import ErrorToast from '../../components/ErrorToast';

const EditUserPage = ({history, match}) => {
    const userId = match.params.id;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;

    const updateUser = useSelector(state => state.updateUser)
    const {loading: updateLoading, error: updateError, success: updateSuccess} = updateUser

    useEffect(() => {
        if(updateSuccess) {
            history.push('/userlist')
        }else {
            if(user) {
                if(!user.firstname || user._id !== userId) {
                    dispatch(getUserDetails(userId))
                } else {
                    setName(user.firstname)
                    setEmail(user.email)
                    setContactNumber(user.phoneNumber)
                }
            }
        }
    }, [dispatch, userId, user, history, updateSuccess])

    const submitForm = (e) => {
        e.preventDefault()

        const newUser = {
            _id: userId,
            firstname: name,
            email: email,
            phoneNumber: contactNumber
        }

        dispatch(userUpdate(newUser));
    }

    return (
        <>
            <Container>
            {updateError && <ErrorToast message={updateError.message} />}
            {error && <ErrorToast message={error.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/userlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> EDIT USER</h1>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Name"/>
            <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Email"/>
            <input 
                type="text" 
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Contact number"/>
            <div className="text-right">
            <Link to="/userlist">
                <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {updateLoading ?
            <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px'}} />
                Updating...
            </Button>
            :
            <Button type="submit" variant="dark">Update</Button>}
            </div>
            </form>
            )}
            </Container>
        </>
    )
}

export default EditUserPage

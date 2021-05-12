import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getUserDetails, userUpdate} from '../../actions/userActions';
import Loader from '../../components/Loader';
import ErrorToast from '../../components/ErrorToast';
import Meta from '../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const EditUserPage = ({history, match}) => {
    const userId = match.params.id;

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [contactNumber, setContactNumber] = useState('')

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;

    const updateUser = useSelector(state => state.updateUser)
    const {loading: updateLoading, error: updateError, success: updateSuccess} = updateUser

    const schema = yup.object().shape({
        firstname: yup.string().required('This Field is Required').max(50).trim(),
        lastname: yup.string().required('This Field is Required').max(50).trim(),
        email: yup.string().email().required('This Field is Required').trim()
    });
    const { register, handleSubmit, formState:{errors}, watch, setValue } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if(updateSuccess) {
            history.push('/userlist')
        }else {
            if(user) {
                if(!user.firstname || user._id !== userId) {
                    dispatch(getUserDetails(userId))
                } else {
                    setValue("firstname", user.firstname)
                    setValue("lastname", user.lastname)
                    setValue("email", user.email)
                    setValue("phoneNumber", user.phoneNumber)
                }
            }
        }
    }, [dispatch, userId, user, history, updateSuccess])

    const submitForm = (data) => {
        dispatch(userUpdate(data, userId));

        console.log(data)
    }

    console.log(errors)

    return (
        <div className="">
            <Meta title="Edit User - Picxls" />
            <div className="container-fluid mt-40">
            <container>
            {updateError && <ErrorToast message={updateError.message} />}
            {error && <ErrorToast message={error.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1> <Link to="/userlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> EDIT USER</h1>
             <div class="form rounded border p-10">
                <div class="row">
                    <div class="col-sm-6">
                        <label>First Name</label>
                        <input 
                type="text" 
                {...register("firstname")}
                className="form-control my-5" 
                placeholder="Enter firstname"/>
            {errors.firstname && <p className="text-danger small p-1">{errors.firstname.message}</p>}
                    </div>
                    <div class="col-sm-6">
                        <label>Last Name</label>
                        <input 
                type="text" 
                {...register("lastname")}
                className="form-control my-5" 
                placeholder="Enter lastname"/>
            {errors.lastname && <p className="text-danger small p-1">{errors.lastname.message}</p>}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <label>Email</label>
                        <input 
                type="text" 
                {...register("email")}
                className="form-control my-5" 
                placeholder="Enter Email"/>
            {errors.email && <p className="text-danger small p-1">{errors.email.message}</p>}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <label>Contact Number</label>
                        <input 
                type="text" 
                {...register("phoneNumber")}
                className="form-control my-5" 
                placeholder="Enter Contact number"/>
            {errors.phoneNumber && <p className="text-danger small p-1">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                
                
                
                
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
            </div>
            
            
            
            
            
            </form>
            )}
            </container>
            </div>
        </div>
    )
}

export default EditUserPage

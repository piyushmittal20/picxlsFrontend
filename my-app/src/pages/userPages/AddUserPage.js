import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Spinner} from 'react-bootstrap';
import {createUser} from '../../actions/userActions';
import ErrorToast from '../../components/ErrorToast';
import Meta from '../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const AddUserPage = ({history}) => {
    const dispatch = useDispatch();

    const userCreate = useSelector(state => state.userCreate)
    const {loading, error, success: createSuccess} = userCreate

    const schema = yup.object().shape({
        firstname: yup.string().required('This Field is Required').max(50).trim(),
        lastname: yup.string().required('This Field is Required').max(50).trim(),
        email: yup.string().email().required('This Field is Required').trim(),
        phoneNumber: yup.number().required('This Field is Required').min(7)
    });
    const { register, handleSubmit, formState:{errors}, watch } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    const submitForm = (data) => {
        dispatch(createUser(data))
    }

    console.log(errors);

    useEffect(() => {
        if(createSuccess) {
            history.push('/userlist')
        }
    }, [createSuccess, history])

    return (
        <div className="wapper">
            <Meta title="Add User - Picxls" />
            <div className="container-fluid mt-40">
            <container>
            {errors.firstname && <ErrorToast message={errors.firstname.message} />}
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1> <Link to="/userlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD USER</h1>
            <input 
                type="text" 
                {...register("firstname")}
                className="form-control my-5" 
                placeholder="Enter firstname"/>
            {errors.firstname && <p className="text-danger small p-1">{errors.firstname.message}</p>}
            <input 
                type="text" 
                {...register("lastname")}
                className="form-control my-5" 
                placeholder="Enter lastname"/>
            {errors.lastname && <p className="text-danger small p-1">{errors.lastname.message}</p>}
            <input 
                type="text" 
                {...register("email")}
                className="form-control my-5" 
                placeholder="Enter Email"/>
            {errors.email && <p className="text-danger small p-1">{errors.email.message}</p>}
            <input 
                type="number" 
                {...register("phoneNumber")}
                className="form-control my-5" 
                placeholder="Enter Contact number"/>
            {errors.phoneNumber && <p className="text-danger small p-1">{errors.phoneNumber.message}</p>}
            <div className="text-right">
            <Link to="/userlist">
                <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {loading ?
            <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px'}} />
                Creating...
            </Button>
            :
            <Button type="submit" variant="dark">Create</Button>}
            </div>
            </form>
            </container>
            </div>
        </div>
    )
}

export default AddUserPage

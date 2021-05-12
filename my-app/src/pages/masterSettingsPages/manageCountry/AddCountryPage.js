import  React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createCountry} from '../../../actions/masterSettings';
import {Button, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ErrorToast from '../../../components/ErrorToast';
import Meta from '../../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const AddCountryPage = ({history}) => {
    const dispatch = useDispatch()

    const countryCreate = useSelector(state => state.countryCreate)
    const {loading, success: createSuccess} = countryCreate

    const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

    const schema = yup.object().shape({
        title: yup
            .string()
            .required('This Field is Required').max(50).trim().lowercase()
    });
    const { register, handleSubmit, formState:{errors}, watch } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if(!adminInfo) {
            history.push('/admin-login')
        }
        if(createSuccess) {
            history.push('/countrylist')
        }
    }, [history, createSuccess, adminInfo])

    const handleS = (data) => {
        dispatch(createCountry(data))
    }

    return (
        <div className="">
            <Meta title="Add Country - Picxls" />
            <div className="container-fluid mt-40">
            <container>
            {errors.title && <ErrorToast message={errors.title.message} />}
            <form onSubmit={handleSubmit(handleS)}>
            <h2 className="head"> <Link to="/countrylist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link>Add Country</h2>
            <div class="form rounded border p-10">
                <div class="row">
                    <div class="col-sm-12">
                        <label>Add Country</label>
                        <div>
                            <input type="text" className="form-control my-5" {...register("title")}></input>
                        </div>
                        {errors.title && <p className="text-danger small p-1">{errors.title.message}</p>}
                        <div className="text-right">
                            <Link to="/countrylist">
                            <Button className="mx-3" variant="secondary">Cancel</Button>
                            </Link>
                            {loading ?
                            <Button  variant="dark" disabled>
                                <Spinner animation="border" size="sm" style={{marginRight: '5px', marginBottom: '3px'}} />
                                Creating...
                            </Button>
                            :
                            <Button type="submit" variant="dark">Create</Button>}
                            
                        </div>
                    </div>
                </div>
            </div>
            </form>
            </container>
            </div>
        </div>
    )
}

export default AddCountryPage

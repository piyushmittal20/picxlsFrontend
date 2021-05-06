import {useState, useEffect} from 'react';
import {Button, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';
import ErrorToast from '../../../components/ErrorToast';
import { detailState, editState } from '../../../service';
import Meta from '../../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const EditStatePage = ({history, match}) => {
    const stateId = match.params.id;

    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateErr, setUpdateErr] = useState('');

    const schema = yup.object().shape({
        title: yup
            .string()
            .required('This Field is Required').max(50).trim()
    });
    const { register, handleSubmit, formState:{errors}, watch, setValue } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    const getDetails = async(id) => {
        setLoading(true)
        try {
            const {data: {state}} = await axios.get(`${detailState}/state/${id}`)

            if(state) {
                setLoading(false)
                setValue('title', state.title)
                setCountry(state.country.title)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getDetails(stateId)
    }, [stateId])

    const submitForm = async(data) => {
        setUpdateLoading(true)
        try {
            const {data: {savedState}} = await axios.put(`${editState}/state/${stateId}`, data)

            if(savedState) {
                setUpdateLoading(false)
                history.push('/statelist')
            }
        } catch (error) {
            setUpdateLoading(false)
            setUpdateErr(error.response.data)
        }
    }


    return (
        <div className="wapper">
            <Meta title="Edit State - Picxls" />
            <div className="container-fluid mt-40">
            <container>
            {updateErr && <ErrorToast message={updateErr.message} />}
            {errors.title && <ErrorToast message={errors.title.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1> <Link to="/statelist"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> EDIT STATE</h1>
            <input 
                type="text" 
                value={country}
                className="form-control my-5" 
                disabled 
                placeholder="Enter Country"/>
            <input 
                type="text" 
                {...register('title')}
                className="form-control my-5" 
                placeholder="Enter State"/>
                {errors.title && <p className="text-danger small p-1">{errors.title.message}</p>}
            <div className="text-right">
            <Link to="/statelist">
            <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {updateLoading ?
                <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px', marginBottom: '3px'}} />
                Updating...
                </Button> : 
                <Button type="submit" variant="dark">Update</Button>
            }
            </div>
            </form>
            )}
            </container>
            </div>
        </div>
    )
}

export default EditStatePage

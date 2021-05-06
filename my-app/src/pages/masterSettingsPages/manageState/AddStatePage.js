import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createState, getAllCountries} from '../../../actions/masterSettings';
import {Button, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Loader from '../../../components/Loader';
import ErrorToast from '../../../components/ErrorToast';
import Meta from '../../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const AddStatePage = ({history}) => {
    const dispatch = useDispatch()

    const countryList = useSelector(state => state.countryList)
    const {loading, countries} = countryList;

    const stateCreate = useSelector(state => state.stateCreate)
    const {loading: createLoading, success: createSuccess} = stateCreate

    const schema = yup.object().shape({
        title: yup.string().required('This Field is Required').max(50).trim(),
        country: yup.string().required('This Field is Required').max(50).trim()
    });
    const { register, handleSubmit, formState:{errors}, watch } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        dispatch(getAllCountries())
        if(createSuccess) {
            history.push('/statelist')
        }
    }, [dispatch, createSuccess, history])

    const submitForm = (data) => {
        dispatch(createState(data))
    }

    return (
        <div class="wapper">
            <Meta title="Add State - Picxls" />
            <div className="container-fluid mt-40">
            {errors.title && <ErrorToast message={errors.title.message} />}
            <container>
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1> <Link to="/statelist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD STATE</h1>
            <select className="form-select my-5" aria-label="Select example" {...register("country")} >
                <option disabled value>Select Country</option>
                {countries && countries.map((country) => (
                    <option value={country._id}>{country.title}</option>
                ))}
            </select>
            <input type="text" className="form-control my-5" placeholder="Enter State" {...register("title")} />
            {errors.title && <p className="text-danger small p-1">{errors.title.message}</p>}
            <div className="text-right">
            <Link to="/statelist">
            <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {createLoading ? 
                <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px', marginBottom: '3px'}} />
                Creating...
                </Button> :
                <Button type="submit" variant="dark">Create</Button>
            }
            </div>
            </form>
            )}
            </container>
            </div>
        </div>
    )
}

export default AddStatePage

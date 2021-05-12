import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createCity, getAllCountries, getAllStates} from '../../../actions/masterSettings';
import {Button, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorToast from '../../../components/ErrorToast';
import Loader from '../../../components/Loader';
import Meta from '../../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
const AddCityPage = ({history}) => {
const dispatch = useDispatch()
const countryList = useSelector(state => state.countryList)
const {loading, countries} = countryList;
const stateList = useSelector(state => state.stateList)
const {states} = stateList;
const cityCreate = useSelector(state => state.cityCreate)
const {loading: createLoading, error: createError, success: createSuccess} = cityCreate
const schema = yup.object().shape({
title: yup.string().required('This Field is Required').max(50).trim(),
country: yup.string().required('This Field is Required').max(50).trim(),
state: yup.string().required('This Field is required').max(50).trim()
});
const { register, handleSubmit, formState:{errors}, watch } = useForm({
mode: 'onTouched',
resolver: yupResolver(schema),
})
const country = watch('country')
useEffect(() => {
dispatch(getAllCountries())
dispatch(getAllStates())
if(createSuccess) {
history.push('/citylist')
}
}, [dispatch, history, createSuccess])
const submitForm = (data) => {
dispatch(createCity(data))
}
console.log(errors);
return (
<div className="">
    <Meta title="Add Country - Picxls" />
    <div className="container-fluid mt-40">
        {errors.title && 
        <ErrorToast message={errors.title.message} />
        }
        <container>
            {createError && 
            <ErrorToast message={createError.message} />
            }
            {loading ? 
            <Loader />
            : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
                <h1 className="py-5">
                    <Link to="/citylist">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                    </Link> ADD CITY
                </h1>
                <div class="form rounded border p-10">
                    <div class="row">
                        <div class="col-sm-12">
                            <label>Country Name</label>
                            <select className="form-select my-5" aria-label="Select example" {...register('country')}>
                            <option disabled value>Select Country</option>
                            {countries && countries.map((country, index) => (
                            <option value={country._id}>{country.title}</option>
                            ))}
                            </select>
                        </div>
                        <div class="col-sm-12">
                            <label>State Name</label>
                            <select className="form-select my-5" aria-label="Select example" {...register('state')}>
                            <option disabled value>Select State</option>
                            {states && states.filter(i => i.country === country).map((state, index) => (
                            <option value={state._id}>{state.title}</option>
                            ))}
                            </select>
                        </div>
                        <div class="col-sm-12">
                            <label>City Name</label>
                            <input 
                            type="text" 
                            {...register('title')}
                            className="form-control my-5" 
                            placeholder="Enter City"/>
                            {errors.title && 
                            <p className="text-danger small p-1">{errors.title.message}</p>
                            }
                        </div>
                        <div className="text-right col-sm-12">
                            <Link to="/citylist">
                            <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
                            </Link>
                            {createLoading ? 
                            <Button type="submit" variant="dark" disabled>
                            <Spinner animation="border" size="sm" style={{marginRight: '5px', marginBottom: '3px'}} />
                            Creating...
                            </Button>
                            :
                            <Button type="submit" variant="dark">Create</Button>
                            }
                        </div>
                    </div>
                </div>
            </form>
            )}
        </container>
    </div>
</div>
)
}
export default AddCityPage
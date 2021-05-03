import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createCity, getAllCountries, getAllStates} from '../../../actions/masterSettings';
import {Button, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorToast from '../../../components/ErrorToast';
import Loader from '../../../components/Loader';

const AddCityPage = ({history}) => {
    const [title, setTitle] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [titleErr, setTitleErr] = useState('')
    const [countryErr, setCountryerr] = useState('')
    const [stateErr, setStateErr] = useState('');

    const validate = () => {
        let titleErr = ''
        let countryErr = ''
        let stateErr = ''

        if(!title){
            titleErr = "Only empty sapce isn't required"
        }
        if(!country){
            countryErr = "Only empty space isn't required"
        }
        if(!state){
            stateErr = "Only empty space isn't required"
        }

        if(titleErr && countryErr && stateErr) {
            setTitleErr(titleErr)
            setCountryerr(countryErr)
            setStateErr(stateErr)
            return false
        }

        return true
    }

    const dispatch = useDispatch()

    const countryList = useSelector(state => state.countryList)
    const {loading, countries} = countryList;

    const stateList = useSelector(state => state.stateList)
    const {states} = stateList;

    const cityCreate = useSelector(state => state.cityCreate)
    const {loading: createLoading, error: createError, success: createSuccess} = cityCreate

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getAllStates())
        if(createSuccess) {
            history.push('/citylist')
        }
    }, [dispatch, history, createSuccess])

    const submitForm = (e) => {
        e.preventDefault()

        const newCity = {
            title: title,
            country: country,
            state: state
        }

        const isValid = validate()
        if(isValid){
            setTitle('')
            setCountry('')
            setState('')
        }

        dispatch(createCity(newCity))
    }

    return (
        <div className="wapper">
            <div className="container-fluid mt-40">
            <container>
            {createError && <ErrorToast message={createError.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/citylist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD CITY</h1>
            <select className="form-select my-5" aria-label="Select example" value={country} onChange={e => setCountry(e.target.value)}>
                <option>Select Country</option>
                {countries && countries.map((country, index) => (
                    <option value={country._id}>{country.title}</option>
                ))}
            </select>
            <span className="error-msg">{countryErr}</span>
            <select className="form-select my-5" aria-label="Select example" value={state} onChange={e => setState(e.target.value)}>
                <option>Select State</option>
                {states && states.filter(i => i.country === country).map((state, index) => (
                    <option value={state._id}>{state.title}</option>
                ))}
            </select>
            <span className="error-msg">{stateErr}</span>
            <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-5" 
            placeholder="Enter City"/>
            <span className="error-msg">{titleErr}</span>
            <div className="text-right">
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
            </form>
            )}
            </container>
            </div>
        </div>
    )
}

export default AddCityPage

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createState, getAllCountries} from '../../../actions/masterSettings';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Loader from '../../../components/Loader';
import ErrorToast from '../../../components/ErrorToast';

const AddStatePage = ({history}) => {
    const [title, setTitle] = useState('')
    const [country, setCountry] = useState('')
    const [titleErr, setTitleErr] = useState('');
    const [countryErr, setCountryErr] = useState('');

    const validate = () => {
        let titleErr = ''
        let countryErr = ''

        if(!title){
            titleErr = "Only empty sapce isn't required"
        }
        if(!country){
            countryErr = "Only empty space isn't required"
        }

        if(titleErr && countryErr) {
            setTitleErr(titleErr)
            setCountryErr(countryErr)
            return false
        }

        return true
    }

    const dispatch = useDispatch()

    const countryList = useSelector(state => state.countryList)
    const {loading, countries} = countryList;

    const stateCreate = useSelector(state => state.stateCreate)
    const {loading: createLoading, error: createError, success: createSuccess} = stateCreate

    useEffect(() => {
        dispatch(getAllCountries())
        if(createSuccess) {
            history.push('/statelist')
        }
    }, [dispatch, createSuccess, history])

    const submitForm = (e) => {
        e.preventDefault()

        const newState = {
            title: title,
            country: country
        }

        const isValid = validate()
        if(isValid) {
            setTitle('')
            setCountry('')
        }

        dispatch(createState(newState))
    }

    return (
        <div class="wapper">
            <Container>
            {createError && <ErrorToast message={createError.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/statelist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD STATE</h1>
            <select className="form-select my-5" aria-label="Select example" value={country} onChange={e => setCountry(e.target.value)}>
                <option>Select Country</option>
                {countries && countries.map((country, index) => (
                    <option value={country._id}>{country.title}</option>
                ))}
            </select>
            <span className="error-msg">{countryErr}</span>
            <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control my-5" 
            placeholder="Enter State"/>
            <span className="error-msg">{titleErr}</span>
            <div className="text-right">
            <Link to="/statelist">
            <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {createLoading ? 
                <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px'}} />
                Creating...
                </Button> :
                <Button type="submit" variant="dark">Create</Button>
            }
            </div>
            </form>
            )}
            </Container>
        </div>
    )
}

export default AddStatePage

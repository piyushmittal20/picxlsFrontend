import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getCountry, updateCountry} from '../../../actions/masterSettings';
import Loader from '../../../components/Loader';
import ErrorToast from '../../../components/ErrorToast';

const EditCountryPage = ({history, match}) => {
    const countryId = match.params.id;

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('')

    const validate = () => {
        let titleError = '';

        if(!title) {
            titleError = "Only empty sapce isn't required"
        }

        if(titleError) {
            setTitleError(titleError)
            return false
        }
        return true;
    }

    const dispatch = useDispatch();

    const countryDetail = useSelector(state => state.countryDetail)
    const {loading, error, country} = countryDetail

    const countryUpdate = useSelector(state => state.countryUpdate)
    const {loading: updateLoading, error: updateError, success: updateSuccess} = countryUpdate

    useEffect(() => {
        if(updateSuccess) {
            history.push('/countrylist')
        } else {
            if(country) {
                if(!country.title || country._id !== countryId) {
                    dispatch(getCountry(countryId))
                } else {
                    setTitle(country.title)
                }
            }
        }
    }, [dispatch, country, countryId, updateSuccess, history])

    const submitHandler = (e) => {
        e.preventDefault()

        const updatedCountry = {
            _id: countryId,
            title: title
        }

        const isValid = validate();
        if(isValid) {
            setTitle('')
        }

        dispatch(updateCountry(updatedCountry))
    }

    return (
        <div class="wapper">
            <Container>
            {updateError && <ErrorToast message={updateError.message} />}
            {error && <ErrorToast message={error.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitHandler}>
            <h1> <Link to="/countrylist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> EDIT COUNTRY</h1>
            <input 
                type="text" 
                className="form-control my-5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Country"/>
            <span className="error-msg">{titleError}</span>
            <div className="text-right">
            <Link to="/countrylist">
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
        </div>
    )
}

export default EditCountryPage

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createCountry} from '../../../actions/masterSettings';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ErrorToast from '../../../components/ErrorToast';

const AddCountryPage = ({history}) => {
    const [title, setTitle] = useState('')
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

    const dispatch = useDispatch()

    const countryCreate = useSelector(state => state.countryCreate)
    const {loading, error, success: createSuccess} = countryCreate

    const submitForm = (e) => {
        e.preventDefault()

        const newCountry = {
            title: title
        }

        const isValid = validate();
        if(isValid) {
            setTitle('')
        }

        dispatch(createCountry(newCountry))
    }

    useEffect(() => {
        if(createSuccess) {
            history.push('/countrylist')
        }
    }, [history, createSuccess])

    return (
        <div class="wapper">
            <Container>
            {error && <ErrorToast message={error.message} />}
            <form className="m-3 p-3 pt-20" onSubmit={submitForm}>
            <h1> <Link to="/countrylist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD COUNTRY</h1>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Country"/>
                <span className="error-msg">{titleError}</span>
                <div className="text-right">
                    <Link to="/countrylist">
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
            </Container>
        </div>
    )
}

export default AddCountryPage

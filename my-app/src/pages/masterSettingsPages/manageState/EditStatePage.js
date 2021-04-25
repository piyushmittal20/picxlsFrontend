import {useState, useEffect} from 'react';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';
import ErrorToast from '../../../components/ErrorToast';
import { detailState, editState } from '../../../service';

const EditStatePage = ({history, match}) => {
    const stateId = match.params.id;

    const [title, setTitle] = useState('')
    const [country, setCountry] = useState('')
    const [titleErr, setTitleErr] = useState('');
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateErr, setUpdateErr] = useState('');

    const validate = () => {
        let titleErr = '';

        if(!title) {
            titleErr = "Only empty sapce isn't required"
        }

        if(titleErr) {
            setTitleErr(titleErr)
            return false
        }
        return true;
    }

    const getDetails = async(id) => {
        setLoading(true)
        try {
            const {data: {state}} = await axios.get(`${detailState}/state/${id}`)

            if(state) {
                setLoading(false)
                setTitle(state.title)
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

    const submitForm = async(e) => {
        e.preventDefault()

        const newState = {
            title: title
        }

        const isValid = validate();
        if(isValid) {
            setTitle('')
        }

        setUpdateLoading(true)
        try {
            const {data: {savedState}} = await axios.put(`${editState}/state/${stateId}`, newState)

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
        <div class="wapper">
            <Container>
            {updateErr && <ErrorToast message={updateErr.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/statelist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter State"/>
            <span className="error-msg">{titleErr}</span>
            <div className="text-right">
            <Link to="/statelist">
            <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
            </Link>
            {updateLoading ?
                <Button type="submit" variant="dark" disabled>
                <Spinner animation="border" size="sm" style={{marginRight: '5px'}} />
                Updating...
                </Button> : 
                <Button type="submit" variant="dark">Update</Button>
            }
            </div>
            </form>
            )}
            </Container>
        </div>
    )
}

export default EditStatePage

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getStartag} from '../../actions/startagActions';
import {Button, Container, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {updateStartag} from '../../actions/startagActions';
import Loader from '../../components/Loader';
import ErrorToast from '../../components/ErrorToast';

const EditStartagPage = ({history, match}) => {
    const startagId = match.params.id;

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [cost, setCost] = useState('')
    const [image, setImage] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [typeErr, setTypeErr] = useState('')
    const [costErr, setCostErr] = useState('')

    const validate = () => {
        let nameErr = '';
        let typeErr = '';
        let costErr = '';

        if(!name) {
            nameErr = "Only empty sapce isn't required"
        }
        if(!type) {
            typeErr = "Only empty sapce isn't required"
        }
        if(!cost) {
            costErr = "Only empty sapce isn't required"
        }

        if(nameErr && typeErr && costErr) {
            setNameErr(nameErr)
            setTypeErr(typeErr)
            setCostErr(costErr)
            return false
        }

        return true
    }

    const dispatch = useDispatch();

    const startagDetail = useSelector(state => state.startagDetail)
    const {loading, error, startag} = startagDetail;

    const startagUpdate = useSelector(state => state.startagUpdate)
    const {loading: updateLoading, error: updateError, success: updateSuccess} = startagUpdate

    useEffect(() => {
        if(updateSuccess) {
            history.push('/startaglist')
        } else {
        if(startag) {
            if(!startag.name || startag._id !== startagId) {
                dispatch(getStartag(startagId))
            } else {
                setName(startag.name)
                setType(startag.type)
                setCost(startag.cost)
                setImage(startag.image)
            }
        }
        }
    }, [dispatch, startagId, startag, history, updateSuccess])

    const submitForm = (e) => {
        e.preventDefault()

        const newStartag = {
            _id: startagId,
            name: name,
            cost: cost,
            type: type,
            image: image
        }

        const isValid =  validate()
        if(isValid) {
            setType('')
            setCost('')
        }

        dispatch(updateStartag(newStartag));
    }

    return (
        <>
            <Container>
            {error && <ErrorToast message={error.message} />}
            {updateError && <ErrorToast message={updateError.message} />}
            {loading ? <Loader /> : (
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/startaglist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> EDIT STARTAG</h1>
            <input 
                type="text" 
                value={name}
                disabled={true}
                onChange={(e) => setName(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Name"/>
            <span className="error-msg">{nameErr}</span>
            <input 
                type="text" 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Type"/>
            <span className="error-msg">{typeErr}</span>
            {type === "Bussiness" ? (
            <div>
                <input 
                type="text" 
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Cost"/>
                <span className="error-msg">{costErr}</span>
            </div>
            ) : "" }
            <input 
                type="file" 
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control my-5" 
                placeholder="Enter Image"/>
            <div className="text-right">
            <Link to="/startaglist">
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
        </>
    )
}

export default EditStartagPage

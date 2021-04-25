import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Spinner} from 'react-bootstrap';
import {createStartag} from '../../actions/startagActions';
import ErrorToast from '../../components/ErrorToast';

const AddStartagPage = ({history}) => {
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

    const dispatch = useDispatch()

    const startagCreate = useSelector(state => state.startagCreate)
    const {loading, error, success: createSuccess} = startagCreate;

    const submitForm = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('cost', cost)
        formData.append('type', type)
        formData.append('image', image);

        const isValid = validate()
        if(isValid) {
            setName('')
            setType('')
            setCost('')
        }

        dispatch(createStartag(formData))
    }

    useEffect(() => {
        if(createSuccess) {
            history.push('/startaglist')
        }
    }, [history, createSuccess])

    return (
        <>
            <Container>
            {error && <ErrorToast message={error.message} />}
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/startaglist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD STARTAG</h1>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Name"/>
            <span className="error-msg">{nameErr}</span>
            <select className="form-select my-5" aria-label="Select example" value={type} onChange={e => setType(e.target.value)}>
                <option>Select Role</option>
                <option value="General">General</option>
                <option value="Bussiness">Bussiness</option>
            </select>
            <span className="error-msg">{typeErr}</span>
            {type === 'Bussiness' ? (
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
        </>
    )
}

export default AddStartagPage

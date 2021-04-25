import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Spinner} from 'react-bootstrap';
import {createUser} from '../../actions/userActions';
import ErrorToast from '../../components/ErrorToast';

const AddUserPage = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [contactNumberErr, setContactNumberErr] = useState('')

    const validate = () => {
        let nameErr = ''
        let emailErr = ''
        let contactNumberErr = ''

        if(!name){
            nameErr = "Only empty sapce isn't required"
        }
        if(!email){
            emailErr = "Only empty space isn't required"
        }
        if(!contactNumber){
            contactNumberErr = "Only empty space isn't required"
        }

        if(nameErr && emailErr && contactNumberErr) {
            setEmailErr(emailErr)
            setNameErr(nameErr)
            setContactNumberErr(contactNumberErr)
            return false
        }

        return true
    }

    const dispatch = useDispatch();

    const userCreate = useSelector(state => state.userCreate)
    const {loading, error, success: createSuccess} = userCreate

    const submitForm = (e) => {
        e.preventDefault()

        const newUser = {
            firstname: name,
            email: email,
            phoneNumber: contactNumber
        }

        const isValid = validate()
        if(isValid) {
            setName('')
            setEmail('')
            setContactNumber('')
        }

        dispatch(createUser(newUser))
    }

    useEffect(() => {
        if(createSuccess) {
            history.push('/userlist')
        }
    }, [createSuccess, history])

    return (
        <>
            <Container>
            {error && <ErrorToast message={error.message} />}
            <form className="m-3 p-2" onSubmit={submitForm}>
            <h1> <Link to="/userlist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg></Link> ADD USER</h1>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Name"/>
            <span className="error-msg">{nameErr}</span>
            <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Email"/>
            <span className="error-msg">{emailErr}</span>
            <input 
                type="text" 
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="form-control my-5" 
                placeholder="Enter Contact number"/>
            <span className="error-msg">{contactNumberErr}</span>
            <div className="text-right">
            <Link to="/userlist">
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

export default AddUserPage

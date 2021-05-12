import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Spinner} from 'react-bootstrap';
import {createStartag} from '../../actions/startagActions';
import ErrorToast from '../../components/ErrorToast';
import Meta from '../../components/Meta';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const AddStartagPage = ({history}) => {
    // const [name, setName] = useState('')
    // const [type, setType] = useState('')
    // const [cost, setCost] = useState('')
    // const [image, setImage] = useState('')
    // const [nameErr, setNameErr] = useState('')
    // const [typeErr, setTypeErr] = useState('')
    // const [costErr, setCostErr] = useState('')

    // const validate = () => {
    //     let nameErr = '';
    //     let typeErr = '';
    //     let costErr = '';

    //     if(!name) {
    //         nameErr = "Only empty sapce isn't required"
    //     }
    //     if(!type) {
    //         typeErr = "Only empty sapce isn't required"
    //     }
    //     if(!cost) {
    //         costErr = "Only empty sapce isn't required"
    //     }

    //     if(nameErr && typeErr && costErr) {
    //         setNameErr(nameErr)
    //         setTypeErr(typeErr)
    //         setCostErr(costErr)
    //         return false
    //     }

    //     return true
    // }

    const dispatch = useDispatch()

    const startagCreate = useSelector(state => state.startagCreate)
    const {loading, error, success: createSuccess} = startagCreate;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('This Field is Required').max(50).trim().lowercase(),
        type: yup
            .string()
            .required('This Field is Required').max(50).trim().lowercase(),
        image: yup.string().required('This Field is Required')
    });
    const { register, handleSubmit, formState:{errors}, watch } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    })

    const submitForm = (data) => {
        // e.preventDefault()

        console.log(data)

        // const formData = new FormData()
        // formData.append('name', name)
        // formData.append('cost', cost)
        // formData.append('type', type)
        // formData.append('image', image);

        // const isValid = validate()
        // if(isValid) {
        //     setName('')
        //     setType('')
        //     setCost('')
        // }
        const image = data.image.map(val => console.log(val))

        console.log(image);

        // dispatch(createStartag(formData))
    }

    const type = watch('type');
    const image = watch('image');

    console.log(image)

    console.log(errors)

    useEffect(() => {
        if(createSuccess) {
            history.push('/startaglist')
        }
    }, [history, createSuccess])

    return (
        <div className="">
            <Meta title="Add Startag - Picxls" />
            <div className="container-fluid mt-40">
            <container>
            {error && <ErrorToast message={error.message} />}
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1> <Link to="/startaglist"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09204e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg></Link> Add Startag</h1>
            <div class="form rounded border p-10">
                <div class="row">
                    <div class="col-sm-12">
                        <label>Startag Name</label>
                        <input 
                            type="text" 
                            {...register('name')}
                            className="form-control my-5" 
                            placeholder="Enter Name"/>
                    </div>
                    <div class="col-sm-12">
                        <label>Startag Type</label>
                        <select className="form-select my-5" aria-label="Select example" {...register('type')} >
                            <option value="" >Select Role</option>
                            <option value="General">General</option>
                            <option value="Bussiness">Bussiness</option>
                        </select>
                        {type === 'Bussiness' ? (
                        <div>
                        <label>Startag Cost</label>
                            <input 
                            type="text" 
                            {...register('cost')}
                            className="form-control my-5" 
                            placeholder="Enter Cost"/>
                        </div>
                        ) : "" }
                    </div>
                    <div class="col-sm-12">
                        <label>Select Image</label>
                        <input 
                            type="file" 
                            {...register('image')}
                            className="form-control my-5" 
                            placeholder="Enter Image"/>
                    </div>
                    <div className="text-right col-sm-12">
                        <Link to="/startaglist">
                        <Button type="submit" className="mx-3" variant="secondary">Cancel</Button>
                        </Link>
                        {loading ?
                        <Button type="submit" variant="dark" disabled>
                            <Spinner animation="border" size="sm" style={{marginRight: '5px', marginBottom: '3px'}} />
                            Creating...
                        </Button>
                        :
                        <Button type="submit" variant="dark">Create</Button>}
                    </div>
                </div>
            </div>
            </form>
            </container>
            </div>
        </div>
    )
}

export default AddStartagPage

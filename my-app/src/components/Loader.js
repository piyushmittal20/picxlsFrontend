import { Spinner } from 'react-bootstrap';
const Loader = () => {
    return (
        <Spinner 
            animation='border' 
            role='status' 
            style={{ 
                width: '50px', 
                height: '50px', 
                margin: '250px auto', 
                display: 'block', 
                borderWidth: 'thick' 
            }}>
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}
export default Loader
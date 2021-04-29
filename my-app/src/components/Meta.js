import {Helmet} from 'react-helmet';

const Meta = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Picxls | Admin',
    description: 'Picxls connect people over globe..',
}

export default Meta

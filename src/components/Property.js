import React from 'react';

import '../styles/components/property.scss';

const Property = ({ property, value, onClick }) => {
    return (
        <li onClick={onClick} className="card__property">{property}<span>{value}</span></li>
    );
}
export default Property;
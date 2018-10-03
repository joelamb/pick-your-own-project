import React from 'react';

const Property = ({ property, value }) => {
    return (
        <li className="card__property">{property}<span>{value}</span></li>
    );
}
export default Property;
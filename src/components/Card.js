import React from 'react';
import Property from './Property';

const Card = ({ title, properties }) => {
    return (
        <div className="card">
            <h2 className="card__title">{title}</h2>
            <img src="https://via.placeholder.com/350x150" alt="" />
            <ul className="properties">
                {Object.keys(properties).map((key, i) => {
                    return <Property key={i} property={key} value={properties[key]} />
                })}
            </ul>
        </div>
    )
}

export default Card;
import React from 'react';
import Property from './Property';

import '../styles/components/card.scss';

const Card = ({ title, properties, handleCardClick }) => {
    return (
        <div className="card">
            <h2 className="card__title">{title}</h2>
            <img className="card__image" src="https://via.placeholder.com/350x150" alt="" />
            <ul className="card__properties">
                {Object.keys(properties).map((key, i) => {
                    return <Property
                        key={i}
                        property={key}
                        value={properties[key]}
                        onClick={e => handleCardClick(properties[key], key)} />
                })}
            </ul>
        </div>
    )
}

export default Card;
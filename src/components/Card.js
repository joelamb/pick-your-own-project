import React from 'react';
import Property from './Property';

import '../styles/components/card.scss';

const Card = ({ title, properties, handleClick }) => {
    return (
        <div className="card">
            <h2 className="card__title">{title}</h2>
            <img className="card__image" src="https://via.placeholder.com/350x150" alt="" />
            <ul onClick={e => handleClick(e.target.lastChild.firstChild.data)} className="card__properties">
                {Object.keys(properties).map((key, i) => {
                    return <Property key={i} property={key} value={properties[key]} />
                })}
            </ul>
        </div>
    )
}

export default Card;
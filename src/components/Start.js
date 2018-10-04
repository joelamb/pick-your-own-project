import React from 'react';

import '../styles/components/start.scss';

class Start extends React.Component {
    constructor() {
        super();
        this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {

    }
    render() {
        return (
            <div className='start'>
                <h1 className='start__title'>Star Trumps</h1>
                <p className='start__instructions'>Chose the property of the vehicle that you think will be better than the computer. Faster, Bigger, More is better.</p>
                <button className='btn btn__start' onClick={e => this.props.startGame(this.props.allCards, this.props.numCards)}>Start</button>
            </div>

        );
    }
}

export default Start;
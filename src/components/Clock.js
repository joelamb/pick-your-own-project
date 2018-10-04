import React from 'react';
import Timer from 'timer-machine';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0
        }
    }

    componentDidMount() {
        setInterval(this.setState({
            time: require('timer-machine').get('game').time()
        }), 2000);
    }






    render() {






        return (
            <p className="scoreboard__clock">{this.state.time}</p>
        )
    }

}

export default Clock;
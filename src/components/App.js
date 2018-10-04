import React from 'react';
import Card from './Card';

import '../styles/components/app.scss';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://swapi.co/api/vehicles/?page=1",
            allCards: [],
            numCards: 2,
            playerCards: [],
            computerCards: [],
            round: 1,
            roundResult: '',
            score: {
                player: 0,
                computer: 0
            },
            winner: ''
        }
        this.handleCardClick = this.handleCardClick.bind(this);
        this.roundAdvance = this.roundAdvance.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    componentDidMount() {
        this.getData(this.state.url);
    }

    getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCards: this.state.allCards.concat(data.results)
                }, () => {
                    !!data.next ? this.getData(data.next) : this.dealCards(this.state.allCards, this.state.numCards);
                });
            });
    };

    dealCards(array, num) {
        const deck = this.shuffleCards(this.cleanData([...array]));
        this.setState({
            playerCards: deck.filter((card, i) => {
                return i < num;
            }),
            computerCards: deck.filter((card, i) => {
                return i >= num && i < (num * 2);
            })
        });
    };

    shuffleCards(array) {
        let currentIndex = array.length;
        let temporaryValue = 0;
        let randomIndex = 0;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };


    cleanData(array) {
        return array.map(card => {
            return Object.assign({}, {
                name: card.name,
                properties: {
                    'crew': this.stringToNumber(card.crew),
                    'maximum speed': this.stringToNumber(card.max_atmosphering_speed),
                    'passengers': this.stringToNumber(card.passengers),
                    'cargo capacity': this.stringToNumber(card.cargo_capacity),
                    'length': this.stringToNumber(card.length),
                    'cost (in credits)': this.stringToNumber(card.cost_in_credits)
                }
            })
        });
    };

    stringToNumber(string) {
        return !parseInt(string, 10) ? 'No data' : parseInt(string, 10);
    }

    handleCardClick(value, key) {
        (value === 'No data') ? console.log("Please choose a different property") : this.findRoundWinner(value, this.state.computerCards[0].properties[key]);
    };

    findRoundWinner(playerValue, computerValue) {
        if (playerValue > computerValue) {
            this.setState({
                roundResult: 'win'
            });
            if (this.state.computerCards.length === 1) {
                this.setState({
                    winner: 'player'
                })
            }
        } else {
            this.setState({
                roundResult: 'lose'
            });
            if (this.state.playerCards.length === 1) {
                this.setState({
                    winner: 'computer'
                })
            }
        }

    }

    //  Next Round button resets roundResult to "" and performs card collection

    roundAdvance(result) {
        if (result === 'win') {
            this.setState({
                playerCards: this.state.playerCards.concat(this.state.computerCards[0])
                    .map((card, i, array) => {
                        if (i + 1 === array.length) { return array[0] } else { return array[i + 1] }
                    }),
                computerCards: this.state.computerCards.filter((card, i) => i > 0),
                roundResult: '',
                round: this.state.round + 1,
                score: { player: this.state.score.player + 1, computer: this.state.score.computer }
            })
        } else if (result === 'lose') {
            this.setState({
                computerCards: this.state.computerCards.concat(this.state.playerCards[0])
                    .map((card, i, array) => {
                        if (i + 1 === array.length) { return array[0] } else { return array[i + 1] }
                    }),
                playerCards: this.state.playerCards.filter((card, i) => i > 0),
                roundResult: '',
                round: this.state.round + 1,
                score: { player: this.state.score.player, computer: this.state.score.computer + 1 }
            })
        }
    }

    playAgain(array, num) {
        this.setState({
            winner: '',
            roundResult: ''
        }, () => this.dealCards(array, num));
    }


    render() {

        const hasNoWinner = (this.state.winner === '');

        return (
            <div className="app">
                {hasNoWinner && this.state.playerCards
                    .filter((card, i) => i === 0)
                    .map((card, i) => {
                        return <Card
                            key={i}
                            title={card.name}
                            properties={card.properties}
                            handleCardClick={this.handleCardClick}
                        />
                    })}
                {console.log(!!this.state.roundResult)}
                {hasNoWinner && !!this.state.roundResult &&
                    <React.Fragment>
                        {this.state.computerCards
                            .filter((card, i) => i === 0)
                            .map((card, i) => {
                                return <Card
                                    key={i}
                                    title={card.name}
                                    properties={card.properties}
                                    handleCardClick={this.handleCardClick}
                                />
                            })}
                        <button
                            className="btn btn__advance"
                            onClick={e => this.roundAdvance(this.state.roundResult)}>Next Round
                        </button>
                    </React.Fragment>
                }

                {this.state.winner === 'player' &&
                    <React.Fragment>
                        <h2>The winner you are!</h2>
                        <h3>The Force is strong in you</h3>
                        <button className='btn btn__again' onClick={e => this.playAgain(this.state.allCards, this.state.numCards)}>Play Again</button>
                    </React.Fragment>

                }
                {this.state.winner === 'computer' &&
                    <React.Fragment>
                        <h2>Lost you have young Jedi.</h2>
                        <h3>Trust in the Force you must.</h3>
                        <button
                            className='btn btn__again'
                            onClick={e => this.playAgain(this.state.allCards, this.state.numCards)}> Play Again
                        </button>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default App;

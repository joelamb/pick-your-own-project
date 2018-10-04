import React from 'react';
import Start from './Start';
import Card from './Card';
import EndScreen from './EndScreen';

import '../styles/components/app.scss';
import Scoreboard from './Scoreboard';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://swapi.co/api/vehicles/?page=1",
            allCards: [],
            numCards: 2,
            playerCards: [],
            computerCards: [],
            inGame: false,
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
        this.startGame = this.startGame.bind(this);
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
                    !!data.next ? this.getData(data.next) : this.setState({ allCards: this.cleanData(this.state.allCards) })
                });
            });
    };

    startGame(array, num) {
        this.setState({
            inGame: true,
            winner: '',
            roundResult: '',
            round: 1,
            score: { player: 0, computer: 0 }
        }, () => this.dealCards(array, num));
    }

    dealCards(array, num) {
        const deck = this.shuffleCards([...array]);
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
        (value === 'No data') ? console.log("Please choose a different property") : this.findWinner(value, this.state.computerCards[0].properties[key]);
    };

    // calculate the round and overall winner

    findWinner(playerValue, computerValue) {
        if (playerValue > computerValue) {
            this.setState({
                roundResult: 'win',
                score: Object.assign(this.state.score, { player: this.state.score.player + 1 })
            });
            if (this.state.computerCards.length === 1) {
                this.setState({
                    inGame: false,
                    winner: 'player'
                })
            }
        } else {
            this.setState({
                roundResult: 'lose',
                score: Object.assign(this.state.score, { computer: this.state.score.computer + 1 })
            });
            if (this.state.playerCards.length === 1) {
                this.setState({
                    inGame: false,
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
                round: this.state.round + 1
            })
        } else if (result === 'lose') {
            this.setState({
                computerCards: this.state.computerCards.concat(this.state.playerCards[0])
                    .map((card, i, array) => {
                        if (i + 1 === array.length) { return array[0] } else { return array[i + 1] }
                    }),
                playerCards: this.state.playerCards.filter((card, i) => i > 0),
                roundResult: '',
                round: this.state.round + 1
            })
        }
    }



    render() {

        const hasNoWinner = (this.state.winner === '');

        return (
            <div className="app">

                {!this.state.inGame && hasNoWinner &&

                    < Start timer={this.gameTimer} startGame={this.startGame} allCards={this.state.allCards} numCards={this.state.numCards} />
                }

                {this.state.inGame &&
                    <Scoreboard
                        playerScore={this.state.score.player}
                        computerScore={this.state.score.computer}
                        round={this.state.round}
                    />
                }

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

                {hasNoWinner && !!this.state.roundResult &&
                    <React.Fragment>
                        <div className='round-result'>
                            <h3>You {this.state.roundResult}</h3>
                            <button
                                className="btn btn__advance"
                                onClick={e => this.roundAdvance(this.state.roundResult)}>Next Round
                            </button>
                            <p>scroll down to see computer’s card</p>
                        </div>
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
                    </React.Fragment>
                }

                <EndScreen
                    winner={this.state.winner}
                    startGame={this.startGame}
                    allCards={this.state.allCards}
                    numCards={this.state.numCards}
                />
            </div>
        )
    }
}

export default App;

import React from 'react';
import Card from './Card';

import '../styles/components/app.scss';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://swapi.co/api/vehicles/?page=1",
            allCards: [],
            numCards: 5,
            playerCards: [],
            computerCards: [],
            round: 1,
            roundResult: '',
            score: {
                player: 0,
                computer: 0
            }
        }
        this.handleCardClick = this.handleCardClick.bind(this);
        this.roundAdvance = this.roundAdvance.bind(this);
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
                    'crew': !+card.crew ? "No data" : +card.crew,
                    'maximum speed': !+card.max_atmosphering_speed ? "No data" : card.max_atmosphering_speed,
                    'passengers': !+card.passengers ? "No data" : card.passengers,
                    'cargo capacity': !+card.cargo_capacity ? "No data" : +card.cargo_capacity,
                    // 'consumable': card.consumables,
                    'length': !+card.length ? "No data" : +card.length,
                    'cost (in credits)': !+card.cost_in_credits ? "No data" : +card.cost_in_credits
                }
            })
        });
    };

    handleCardClick(value, key) {
        (value === 'No data') ? console.log("Please choose a different property") : this.findRoundWinner(value, this.state.computerCards[0].properties[key]);
    };

    findRoundWinner(playerValue, computerValue) {
        if (playerValue > computerValue) {
            this.setState({
                roundResult: 'win'
            });
        } else {
            this.setState({
                roundResult: 'lose'
            });
        }
    }

    // click Next Round button to reset roundResult to "" and do card collection


    roundAdvance(result) {
        if (result === 'win') {
            this.setState({
                playerCards: this.state.playerCards.concat(this.state.computerCards[0]),
                computerCards: this.state.computerCards.filter((card, i) => i > 0),
                roundResult: '',
                round: this.state.round + 1,
                score: { player: this.state.score.player + 1, computer: this.state.score.computer }
            })
        } else if (result === 'lose') {
            this.setState({
                computerCards: this.state.computerCards.concat(this.state.playerCards[0]),
                playerCards: this.state.playerCards.filter((card, i) => i > 0),
                roundResult: '',
                round: this.state.round + 1,
                score: { player: this.state.score.player, computer: this.state.score.computer + 1 }
            })
        }
    }

    render() {
        return (
            <div className="app">
                {this.state.playerCards
                    .filter((card, i) => i === 0)
                    .map((card, i) => {
                        return <Card
                            key={i}
                            title={card.name}
                            properties={card.properties}
                            handleCardClick={this.handleCardClick} />
                    })}
                {console.log(!!this.state.roundResult)}
                {!!this.state.roundResult &&
                    this.state.computerCards
                        .filter((card, i) => i === 0)
                        .map((card, i) => {
                            return <Card
                                key={i}
                                title={card.name}
                                properties={card.properties}
                                handleCardClick={this.handleCardClick} />
                        })}
                {!!this.state.roundResult && <button
                    className="btn__advance"
                    onClick={e => this.roundAdvance(this.state.roundResult)}>Next Round</button>
                }
            </div>
        )
    }
}


export default App;

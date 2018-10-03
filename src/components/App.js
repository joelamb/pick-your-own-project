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
            computerCards: []
        }
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
                    !data.next ? this.getData(data.next) : this.dealCards(this.state.allCards, this.state.numCards);
                });
            });
    }

    dealCards(array, num) {
        const deck = this.shuffleCards([...array])
            .map(card => {
                return Object.assign({}, {
                    name: card.name,
                    properties: {
                        'crew': card.crew,
                        'maximum speed': card.max_atmosphering_speed,
                        'passengers': card.passengers,
                        'cargo capacity': card.cargo_capacity,
                        'consumable': card.consumables,
                        'length': card.length,
                        'cost (in credits)': card.cost_in_credits
                    }
                })
            });
        this.setState({
            playerCards: deck.filter((card, i) => {
                return i < num;
            })
        });
        this.setState({
            computerCards: deck.filter((card, i) => {
                return i >= num && i < (num * 2);
            })
        });
    }

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
    }

    render() {
        return (
            <div className="app">
                {this.state.playerCards.map((card, i) => {
                    return <Card key={i} title={card.name} properties={card.properties} />
                })}
            </div>
        )
    }
}


export default App;

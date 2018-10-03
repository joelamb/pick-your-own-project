import React from 'react';

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
                    if (data.next) {
                        this.getData(data.next)
                    } else {

                        this.dealCards(this.state.allCards, this.state.numCards);
                    }
                });
            });
    }

    dealCards(array, num) {
        const deck = [...array];
        this.shuffleCards(deck);
        console.log(this.state.allCards);
        console.log(deck);
        this.setState({
            playerCards: deck.filter((card, i) => {
                return i < num;
            })
        }, () => console.log(this.state.playerCards));
        this.setState({
            computerCards: deck.filter((card, i) => {
                return i >= num && i < (num * 2);
            })
        }, () => console.log(this.state.computerCards))

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

            </div>
        )
    }
}


export default App;

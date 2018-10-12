import React from 'react';
import Timer from 'timer-machine';
import Start from './Start';
import Card from './Card';
import Bid from './Bid';
import RoundResult from './RoundResult';
import EndScreen from './EndScreen';

import '../styles/components/app.scss';
import Scoreboard from './Scoreboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=52',
      allCards: [],
      numCards: 3,
      playerCards: [],
      computerCards: [],
      inGame: false,
      round: 1,
      roundResult: '',
      score: {
        player: 0,
        computer: 0
      },
      winner: '',
      hiScore: 0,
      leaderboard: []
    };
    this.handleBidClick = this.handleBidClick.bind(this);
    this.roundAdvance = this.roundAdvance.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  // fire the API call on page load
  componentDidMount() {
    this.getData(this.state.url);
  }

  // retrieve a shuffled deck of cards from the API and pass to cleanData processing function
  getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            allCards: this.state.allCards.concat(data.cards)
          },
          () => {
            this.setState(
              { allCards: this.cleanData(this.state.allCards) },
              this.cardsReady(true)
            );
          }
        );
      });
  }

  // simplify the API data returned and convert string values to numbers
  cleanData(array) {
    return array.map(card => {
      return Object.assign(
        {},
        {
          img: card.image,
          value: this.stringToNumber(card.value)
        }
      );
    });
  }

  // convert API data values from strings to numbers and set Ace's high
  stringToNumber(string) {
    switch (string) {
      case 'ACE':
        return 14;
        break;
      case 'KING':
        return 13;
        break;
      case 'QUEEN':
        return 12;
        break;
      case 'JACK':
        return 11;
        break;
      default:
        return parseInt(string, 10);
    }
  }

  // set data ready state for conditional rendering of 'start' button
  cardsReady(value) {
    this.setState({
      ready: value
    });
  }

  // initialise game conditions and start game timer
  startGame(array, num) {
    this.setState({
      inGame: true, // for conditional rendering of game play elements
      winner: '', // for conditional rendering of endframe
      roundResult: '', // for conditional rendering of round result
      round: 1, // track game progress
      score: { player: num, computer: num }
    });
    const shuffledCards = this.shuffleCards(array);
    this.dealCards(shuffledCards, num);
    Timer.get('game').start(); // start game timer
  }

  dealCards(array, num) {
    const deck = [...array];
    this.setState({
      playerCards: deck.filter((card, i) => {
        return i < num;
      }),
      computerCards: deck.filter((card, i) => {
        return i >= num && i < num * 2;
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

      // and swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // pass the player's bid and card value along with the computer's card value to the findWinner function
  handleBidClick(value, bid) {
    this.findWinner(bid, value, this.state.computerCards[0].value);
  }

  // calculate the round winner and overall winner
  findWinner(bid, playerValue, computerValue) {
    const outcome = playerValue - computerValue;
    if (
      (bid === 'higher' && outcome < 0) ||
      (bid === 'lower' && outcome > 0) ||
      (bid === 'same' && outcome === 0)
    ) {
      this.setState({
        roundResult: 'win',
        score: Object.assign(this.state.score, {
          player: this.state.score.player + 1,
          computer: this.state.score.computer - 1
        })
      });
      if (this.state.computerCards.length === 1) {
        // stop the game timer
        const gameTime = Timer.get('game').time() / 1000;
        // caluclate the score based on the number of cards and the time taken to win the game
        const gameScore = Math.floor(this.state.numCards / gameTime * 999);
        this.setState({
          inGame: false,
          winner: 'player',
          hiScore: gameScore,
          leaderboard: this.state.leaderboard.concat(gameScore)
        });
        Timer.destroy('game'); // remove the timer
      }
    } else {
      this.setState({
        roundResult: 'lose',
        score: Object.assign(this.state.score, {
          player: this.state.score.player - 1,
          computer: this.state.score.computer + 1
        })
      });
      if (this.state.playerCards.length === 1) {
        this.setState({
          inGame: false,
          winner: 'computer'
        });
        Timer.destroy('game'); // remove the timer
      }
    }
  }

  //  reset roundResult and perform card collection on round advance
  roundAdvance(result) {
    if (result === 'draw') {
      this.setState({
        //move played card to end of cards array
        playerCards: this.cardToEnd(this.state.playerCards),
        computerCards: this.cardToEnd(this.state.computerCards),
        roundResult: '', // reset round result
        round: this.state.round + 1 // advance round count
      });
    } else if (result === 'win') {
      // move palyed card to end of playerCards array
      const updatedPlayerCards = this.cardToEnd(this.state.playerCards);
      this.setState({
        // add computer's card to the playerCards array
        playerCards: updatedPlayerCards.concat(this.state.computerCards[0]),
        // remove computer's card from computerCards array
        computerCards: this.state.computerCards.filter((card, i) => i > 0),
        roundResult: '',
        round: this.state.round + 1
      });
    } else if (result === 'lose') {
      const updatedComputerCards = this.cardToEnd(this.state.computerCards);
      this.setState({
        computerCards: updatedComputerCards.concat(this.state.playerCards[0]),
        playerCards: this.state.playerCards.filter((card, i) => i > 0),
        roundResult: '',
        round: this.state.round + 1
      });
    }
  }

  // move first card to end of cards array
  cardToEnd(array) {
    return array.map((card, i, array) => {
      if (i + 1 === array.length) {
        return array[0];
      } else {
        return array[i + 1];
      }
    });
  }

  render() {
    const hasNoWinner = this.state.winner === '';
    return (
      <div className="app">
        {/* show start screen on app load */}
        {!this.state.inGame &&
          hasNoWinner && (
            <Start
              startGame={this.startGame}
              allCards={this.state.allCards}
              numCards={this.state.numCards}
              ready={this.state.ready}
            />
          )}
        {/* show scoreboard and player's card on game start */}
        {this.state.inGame && (
          <Scoreboard
            playerCards={this.state.score.player}
            computerCards={this.state.score.computer}
            round={this.state.round}
          />
        )}
        {hasNoWinner &&
          this.state.playerCards.filter((card, i) => i === 0).map((card, i) => {
            return (
              <Card key={i} img={card.img}>
                {/* pass bid options as props.children */}
                <Bid value={card.value} handleBidClick={this.handleBidClick} />
              </Card>
            );
          })}
        {/* show computer's card and round result message on bid select */}
        {hasNoWinner &&
          !!this.state.roundResult && (
            <React.Fragment>
              <RoundResult
                result={this.state.roundResult}
                roundAdvance={this.roundAdvance}
              />
              {this.state.computerCards
                .filter((card, i) => i === 0)
                .map((card, i) => {
                  return (
                    // computer's card is passed no props.children
                    <Card
                      key={i}
                      img={card.img}
                      value={card.value}
                      handleCardClick={null}
                    />
                  );
                })}
            </React.Fragment>
          )}
        {/* show the win or lose game screen  */}
        <EndScreen
          winner={this.state.winner}
          startGame={this.startGame}
          allCards={this.state.allCards}
          numCards={this.state.numCards}
          hiScore={this.state.hiScore}
        />
      </div>
    );
  }
}

export default App;

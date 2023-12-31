import { useEffect, useState } from "react";
import "./App.css";
import jackOfClubs from "./img/jack-of-clubs.jpeg";
import queenOfClubs from "./img/queen-of-clubs.jpeg";
import kingOfClubs from "./img/king-of-clubs.jpeg";
import jackOfSpades from "./img/jack-of-spades.jpeg";
import queenOfSpades from "./img/queen-of-spades.jpeg";
import kingOfSpades from "./img/king-of-spades.jpeg";
import Card from "./components/Card.js";

const cardImages = [
  { src: jackOfClubs, matched: false },
  { src: queenOfClubs, matched: false },
  { src: kingOfClubs, matched: false },
  { src: jackOfSpades, matched: false },
  { src: queenOfSpades, matched: false },
  { src: kingOfSpades, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null); // when a user clicks on first card, we will store the card here
  const [choiceTwo, setChoiceTwo] = useState(null); // when a user clicks on second card, we will store the card here
  const [disabled, setDisabled] = useState(false);

  //creating an array with 12 shuffled images where each card has an id as well
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  // reset choices & increase a turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //check if the two cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // disable all cards while we are checking if the two cards match

      if (choiceOne.src === choiceTwo.src) {
        // if the two cards match, we will set the matched property to true for both cards in the cards array using map method
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        // choiceOne.matched = true;
        // choiceTwo.matched = true;
        resetTurn();
      } else {
        // if the two cards don't match, we will reset the two choices after 1 second
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //Start a new game
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Memory Card</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} // three scenarios in which a card should be flipped
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

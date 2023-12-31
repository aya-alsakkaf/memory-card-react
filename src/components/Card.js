import "./Card.css";
import cardCover from "../img/cover-img.png";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={cardCover}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

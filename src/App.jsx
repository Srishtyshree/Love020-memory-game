import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Love020. characters data
  const characters = [
    { id: 1, name: "Xiao Nai", image: "https://i.pinimg.com/736x/2b/45/65/2b4565b7e18a4da51e9b79fa15806a0c.jpg" },
    { id: 2, name: "Bei Weiwei", image: "https://i.pinimg.com/736x/52/9c/d3/529cd32a1512ed1a422d8712a1cf3c59.jpg" },
    { id: 3, name: "KO", image: "https://i.pinimg.com/736x/3a/19/9f/3a199f55273c779d52cbf6f1e5bca6f7.jpg" },
    { id: 4, name: "Hao Mei", image: "https://i.pinimg.com/736x/d0/3c/81/d03c816de4380f3a47b43901d1770057.jpg" },
    { id: 5, name: "Er Xi", image: "https://i.pinimg.com/736x/e4/93/ea/e493ea455f8888381c230d80743b9c51.jpg" },
    { id: 6, name: "bai lu", image: "https://i.pinimg.com/736x/2b/45/65/2b4565b7e18a4da51e9b79fa15806a0c.jpg" },
    {
      id: 7,
      name: "Zhen Shaoxiang",
      image: "https://i.pinimg.com/736x/3a/19/9f/3a199f55273c779d52cbf6f1e5bca6f7.jpg",
    },
    { id: 8, name: "lin yi", image: "https://i.pinimg.com/736x/bf/6d/27/bf6d270b8b958fbe1784dee36a1a21f5.jpg" },
  ];

  // Initialize the game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const cards = [...characters, ...characters]
      .map((card, index) => ({ ...card, uniqueId: index }))
      .sort(() => Math.random() - 0.5);

    setCards(cards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (id, uniqueId) => {
    // Don't allow flipping if already flipped or solved
    if (
      flipped.length === 2 ||
      flipped.includes(uniqueId) ||
      solved.includes(id)
    ) {
      return;
    }

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((card) => card.uniqueId === firstId);
      const secondCard = cards.find((card) => card.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        setSolved((prev) => [...prev, firstCard.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (solved.length === characters.length) {
      setGameComplete(true);
    }
  }, [solved]);

  return (
    <div className="game-container">
      <h1>Love020 Memory Game</h1>
      <div className="game-info">
        <p>Moves: {moves}</p>
        <p>
          Pairs found: {solved.length}/{characters.length}
        </p>
        <button onClick={initializeGame}>Restart Game</button>
      </div>

      {gameComplete && (
        <div className="game-complete">
          <h2>Congratulations!</h2>
          <p>You completed the game in {moves} moves!</p>
        </div>
      )}

      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`card ${
              flipped.includes(card.uniqueId) || solved.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card.id, card.uniqueId)}
          >
            <div className="card-front">
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
            <div className="card-back">
              <div className="logo">Love020</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

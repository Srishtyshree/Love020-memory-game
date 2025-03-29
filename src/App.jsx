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
    { id: 1, name: "Xiao Nai", image: "src/characters/xiao-nai.jpeg" },
    { id: 2, name: "Bei Weiwei", image: "src/characters/bei-weiwei.jpeg" },
    { id: 3, name: "KO", image: "src/characters/ko.jpeg" },
    { id: 4, name: "Hao Mei", image: "src/characters/hao-mei.jpeg" },
    { id: 5, name: "Er Xi", image: "src/characters/er-xi.jpeg" },
    { id: 6, name: "Cao Guang", image: "src/characters/cao-guang.jpeg" },
    {
      id: 7,
      name: "Zhen Shaoxiang",
      image: "src/characters/zhen-shaoxiang.jpeg",
    },
    { id: 8, name: "Yu Banshan", image: "src/characters/yu-banshan.jpeg" },
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

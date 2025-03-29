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
    { id: 1, name: "Xiao Nai", image: "https://i.pinimg.com/736x/8b/22/e5/8b22e56e3049121d987c95e899500b11.jpg" },
    { id: 2, name: "Bei Weiwei", image: "https://i.pinimg.com/736x/6a/17/8d/6a178d9a74ac2716bd72d5d012f20c83.jpg" },
    { id: 3, name: "KO", image: "https://i.pinimg.com/736x/a2/36/c3/a236c36bf7c8f2b8b1b642574f6cb138.jpg" },
    { id: 4, name: "Hao Mei", image: "https://i.pinimg.com/736x/24/45/19/2445198ce994085a44b93d9c2832f260.jpg" },
    { id: 5, name: "Er Xi", image: "https://i.pinimg.com/736x/52/9c/d3/529cd32a1512ed1a422d8712a1cf3c59.jpg" },
    { id: 6, name: "bai lu", image: "https://i.pinimg.com/736x/93/36/85/933685575d787d767dfa94efa5d18490.jpg" },
    {
      id: 7,
      name: "Zhen Shaoxiang",
      image: "https://i.pinimg.com/736x/8b/22/e5/8b22e56e3049121d987c95e899500b11.jpg",
    },
    { id: 8, name: "lin yi", image: "https://i.pinimg.com/736x/b4/94/b7/b494b7b6d0f33376317f8ab183feaa74.jpg" },
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

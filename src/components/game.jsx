import { useState, useEffect } from 'react';

import Card from './card';

const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
];

const Game = () => {

	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	}

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	}

	useEffect(() => {
		if (!choiceOne || !choiceTwo) return;

		setDisabled(true);

		if (choiceOne.src === choiceTwo.src) {
			console.log('Thats a match');
			setCards((prevCards) => {
				return prevCards.map((card) => {
					if (card.src !== choiceOne.src) return card;
					return {...card, matched: true};
				})
			})
			resetTurn();
		} else {
			setTimeout(() => resetTurn(), 1000);
		}
	}, [choiceOne, choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	}

	useEffect(() => {
		shuffleCards();
	}, [])

	return (
		<div id='game-container'>
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className='card-grid'>
				{
					cards.map((card) => (
						<Card 
							key={card.id} 
							card={card} 
							flipped={card === choiceOne || card === choiceTwo || card.matched} 
							handleChoice={handleChoice} 
							disabled={disabled}
						/>
					))
				}
			</div>
			<p>Turn: { turns }</p>
		</div>
	)
}

export default Game;
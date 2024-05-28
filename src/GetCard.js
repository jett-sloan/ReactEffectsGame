import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

function GetCard() {
  const [card, setCard] = useState(null);
  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
    const fetchNewDeck = async () => {
      try {
        const deckResponse = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
        const newDeckId = deckResponse.data.deck_id;
        setDeckId(newDeckId);
      } catch (error) {
        console.error('Error fetching new deck:', error);
      }
    };

    fetchNewDeck();
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (deckId) {
          const cardResponse = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
          setCard(cardResponse.data.cards[0]);
        }
      } catch (error) {
        console.error('Error fetching card:', error);
      }
    };

    fetchCard();
  }, [deckId]);

  const handleClick = async () => {
    try {
      const cardResponse = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
      setCard(cardResponse.data.cards[0]);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Get Card</button>
      {card && (
        <div>
          <h2>{card.value} of {card.suit}</h2>
          <img src={card.image} alt={`${card.value} of ${card.suit}`} />
        </div>
      )}
    </div>
  );
}

export default GetCard;

    

    
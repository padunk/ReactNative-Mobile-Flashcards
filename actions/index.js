import { ADD_CARD, ADD_DECK, RECEIVE_DECKS, LOAD_DECK } from './types';

export const addCard = (title, card) => ({
	type: ADD_CARD,
	title,
	card
});

export const addDeck = (title) => ({
	type: ADD_DECK,
	title
});

export const receiveDecks = (decks) => ({
	type: RECEIVE_DECKS,
	decks
});

export const loadDeck = (deck) => ({
	type: LOAD_DECK,
	deck
});
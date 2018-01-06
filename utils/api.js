import { AsyncStorage } from 'react-native';
import { CARDS_STORAGE_KEY, setInitialCards } from './cards';

export function fetchDecks() {
	return AsyncStorage.getItem(CARDS_STORAGE_KEY)
	.then(data => data === null ? setInitialCards : [])
}

export function submitDeck (title) {
	return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}));
}

export function submitCard ({ title, card }) {
	return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: [card]
		}
	}));
}
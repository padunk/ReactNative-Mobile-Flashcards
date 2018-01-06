import { AsyncStorage } from 'react-native';

export const CARDS_STORAGE_KEY = 'MobileFlashCards:cards';

export function setInitialCards () {
	const initialCards = {
	  React: {
	    title: 'React',
	    questions: [
	      {
	        question: 'What is React?',
	        answer: 'A library for managing user interfaces'
	      },
	      {
	        question: 'Where do you make Ajax requests in React?',
	        answer: 'The componentDidMount lifecycle event'
	      }
	    ]
	  },
	  JavaScript: {
	    title: 'JavaScript',
	    questions: [
	      {
	        question: 'What is a closure?',
	        answer: 'The combination of a function and the lexical environment within which that function was declared.'
	      }
	    ]
	  },
	  ReactNative: {
	    title: 'ReactNative',
	    questions: [
	      {
	        question: 'How Tab Navigator work?',
	        answer: 'Navigate to different screens by pressing Tabs.'
	      },
	      {
	        question: 'How Stack Navigator work?',
	        answer: 'Navigate to different screens by pressing button.'
	      },
	      {
	        question: 'How Drawer Navigator work?',
	        answer: 'Navigate to different screens using drawer-like menus.'
	      }	      	      
	    ]
	  }	  
	};

	AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(initialCards))

	return initialCards;
}
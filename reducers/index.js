import { 
	ADD_DECK, 
	ADD_CARD,
	RECEIVE_DECKS
} from '../actions/types';

const reducers = (state = {}, action ) => {
	switch(action.type) {
		case ADD_CARD:
			return {
				...state,
				[action.title]: {
					...state[action.title],
					questions: [
						...state[action.title].questions.concat(action.card)
					]
				}				
			}

		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_DECK:
			return {
				...state,
				...action.title
			};
		default:
			return state;
	}
};

export default reducers;
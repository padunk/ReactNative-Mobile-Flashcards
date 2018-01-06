import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	ScrollView,
} from 'react-native';
import { fetchDecks } from '../utils/api';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import DeckBar from './DeckBar';

class DeckList extends Component {

	state = {
		ready: false,
	}

	componentDidMount() {
		const { dispatch } = this.props;

		fetchDecks()
		.then(response => dispatch(receiveDecks(response)))
		.then(() => this.setState({ ready: true }))
	}

	render() {
		const { ready } = this.state;
		const { decks } = this.props;

		if(ready === false) {
			return <AppLoading />
		}
		return (
			<ScrollView>
				<View style={css.container}>
				{Object.keys(decks).map((title, idx) => {
					const count = decks[title].questions.length;

					return(
						<DeckBar 
							key={idx}
							title={title}
							deckCount={count}
							colorIdx={idx}
							navigation={this.props.navigation}
						/>
					);
				})}
				</View>
			</ScrollView>
		)
	}
}

const css = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
})

const mapStateToProps = (decks) => ({
	decks
});

DeckList = connect(mapStateToProps)(DeckList);

export default DeckList;
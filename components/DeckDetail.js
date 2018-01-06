import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { black, white, orange } from '../utils/colors';
import { connect } from 'react-redux';

class DeckDetail extends Component {

	static navigationOptions = ({
		title: 'Deck Detail'
	});

	render(){
		const title = this.props.navigation.state.params.deckTitle;
		const questions = this.props.questions.length;

		return (
			<View style={css.container}>
				<Text style={css.header}>{title}</Text>
				<Text style={css.text}>Number of cards: {questions}</Text>
				<View style={css.btn}>
					<TouchableOpacity 
						style={Platform.OS === 'ios' ? css.iosAddBtn : css.androidAddBtn}
						onPress={() => this.props.navigation.navigate('AddNewCard', { title })}
					>
						<Text style={css.textBtn}>Add Card</Text>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={Platform.OS === 'ios' ? css.iosStartBtn : css.androidStartBtn}
						onPress={() => questions === 0 
							? alert('You have no card in this deck')
							: this.props.navigation.navigate('Quiz', { title })}
					>
						<Text style={css.textBtn}>Start Quiz</Text>
					</TouchableOpacity>
				</View>	
			</View>
		)
	}
};

const css = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: black,
	},
	header: {
		fontSize: 20,
		textAlign: 'center',
		color: white,
		margin: 5
	},
	text: {
		color: white,
		textAlign: 'center',
		margin: 5
	},
	iosAddBtn: {
		backgroundColor: orange,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		margin: 5
	},
	androidAddBtn: {
		backgroundColor: orange,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},
	iosStartBtn: {
		backgroundColor: white,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		margin: 5
	},
	androidStartBtn: {
		backgroundColor: white,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},	
	buttonText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
		padding: 3
	}
});

const mapStateToProps = (deck, { navigation }) => {
	const title = navigation.state.params.deckTitle;

	return deck[title];
};

DeckDetail = connect(mapStateToProps)(DeckDetail);

export default DeckDetail;
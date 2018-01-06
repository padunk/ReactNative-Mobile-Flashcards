import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	TextInput, 
	StyleSheet,
	KeyboardAvoidingView
} from 'react-native';
import SubmitButton from './SubmitButton';
import { submitDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { black } from '../utils/colors';

class AddNewDeck extends Component {

	state = {
		title: ''
	}

	submit = () => {
		const title = this.state.title.trim();

		this.props.dispatch(addDeck({
			[title]: {
				title,
				questions: []
			}
		}));
		submitDeck(title);
		this.setState({ title: '' });
		this.toDeckDetail(title, questions = [] );
	}

	toDeckDetail = (title, questions) => { 
		this.props.navigation.navigate(
		'DeckDetail', 
		{ 
			deckTitle: title,
			deckQuestions: questions.length,
		 }
	)}

	render() {
		const { title } = this.state;

		return (
			<KeyboardAvoidingView style={css.container} behavior='position'>
				<Text style={css.header}>Your New Deck Title: </Text>
				<View style={{alignItems: 'center'}}>
					<TextInput
						placeholder = {'Deck Title'}
						onChangeText = {(title) => this.setState({ title })}
						value = {title}
						maxLength = {20}
						autoCapitalize = {'sentences'}
						style = {css.input}
					 />
				</View>
				<View>
					<SubmitButton onPress={this.submit} />
				</View>
			</KeyboardAvoidingView>
		);
	}
};

const css = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	header: {
		fontFamily: 'oswaldRegular',
		fontSize: 40,
		margin: 5,
		textAlign: 'center'
	},
	input: {
		padding: 10,
		margin: 20,
		fontSize: 15,
		width: 200,
		height: 50,
	}
});

AddNewDeck = connect()(AddNewDeck);

export default AddNewDeck;
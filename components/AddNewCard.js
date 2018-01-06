import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	TextInput, 
	StyleSheet,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import SubmitButton from './SubmitButton';
import { submitCard } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class AddNewCard extends Component {

	static navigationOptions = ({
		title: 'Add New Card'
	});

	state = {
		question: '',
		answer: '',
	}

	addNewCard = () => {
		const { title } = this.props;
		const card = this.state;

		this.props.dispatch(addCard(title, card))

		submitCard({ title, card });

		this.setState(() => ({
			question: '',
			answer: '',
		}))
		this.toDetail()
	}

	toDetail = () => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'DeckDetail',
			params: {
				deckTitle: this.props.title,
				deckQuestions: 1
			}
		}))		
	}

	render() {
		return (
			<KeyboardAvoidingView style={css.container} behavior='position'>
				<View>
					<TextInput
						placeholder = {'Type question here'}
						onChangeText = {(question) => this.setState({ question })}
						value = {this.state.question}
						maxLength = {140}
						autoCapitalize = {'sentences'}
						style={Platform === 'ios' ? css.inputIosQuestion : css.inputAndroidQuestion}
					 />
				</View>
				<View>
					<TextInput
						placeholder = {'Type answer here'}
						multiline = {true}
     					numberOfLines = {4}
						onChangeText = {(answer) => this.setState({ answer })}
						value = {this.state.answer}
						maxLength = {300}
						autoCapitalize = {'sentences'}
						style={Platform === 'ios' ? css.inputIosAnswer : css.inputAndroidAnswer}
					 />
				</View>
				<View>
					<SubmitButton
						onPress={this.addNewCard}
					/>
				</View>
			</KeyboardAvoidingView>
		)
	}
};

const css = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	inputAndroidQuestion: {
		marginTop: 20,
		marginBottom: 40,
		padding: 5,
		width: 200
	},
	inputAndroidAnswer: {
		marginTop: 20,
		marginBottom: 40,
		padding: 5,
		width: 200
	},
	inputIosQuestion: {
		marginTop: 20,
		marginBottom: 20,
		padding: 5,
		width: 200
	},
	inputIosAnswer: {
		marginTop: 5,
		padding: 5,
		width: 200
	}	
});

const mapStateToProps = (state, { navigation }) => {
	const { title } = navigation.state.params;
	return {
		title
	}
};

AddNewCard = connect(mapStateToProps)(AddNewCard);

export default AddNewCard;
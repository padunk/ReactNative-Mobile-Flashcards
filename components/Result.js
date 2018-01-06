import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { orange, white, black } from '../utils/colors';

const Result = (props) => {
	const { result, title } = props.navigation.state.params;

	return(
		<View style={css.container}>
			<Text style={css.header}>Your score is:</Text>
		 	<Text style={css.result}>{`${result}%`}</Text>
		 	<TouchableOpacity onPress={() => props.navigation.goBack()}>
		 		<Text style={css.restart}>Restart</Text>
		 	</TouchableOpacity>
		 	<TouchableOpacity onPress={() => props.navigation.navigate('DeckDetail',{deckTitle: title})}>
		 		<Text style={css.restart}>Back to Deck</Text>
		 	</TouchableOpacity>
	 	</View>
	);
};

const css = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: black,
	},
	header: {
		fontSize: 20,
		fontFamily: 'oswaldRegular',
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		color: white,
	},
	result: {
		fontSize: 40,
		fontFamily: 'oswaldBold',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 20,
		padding: 5,
		color: orange,
	},
	restart: {
		fontSize: 15,
		fontFamily: 'oswaldRegular',
		textAlign: 'center',
		color: white,
		marginTop: 10,
	}
});

export default Result;
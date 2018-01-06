import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	Animated, 
	StyleSheet, 
	Dimensions, 
	Easing 
} from 'react-native';
import { brown, amber } from '../utils/colors';

const { width } = Dimensions.get('window');

class DeckBar extends Component {
	constructor () {
		super ()

		this.animatedValue = new Animated.Value(0);
	}

	componentWillUnmount() {
		clearTimeout(this.delayNavigation);
	}

	animate () {
		this.animatedValue.setValue(0);
		Animated.timing(
			this.animatedValue, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear
			}
		).start();
	}

	navigateToDetail = (title) => {
		this.props.navigation.navigate(
			'DeckDetail', 
			{ 
				deckTitle: title,
			 }
		);
	}

	toNavigate = () => {
		const { title } = this.props;

		this.animate();

		this.delayNavigation = setTimeout(this.navigateToDetail, 1000, title)
	}

	get movingMargin() {
		return this.animatedValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 600, 0]
		});
	}

	render () {
		const { title, deckCount, colorIdx } = this.props;
		const animatedStyle = {
			marginLeft: this.movingMargin
		}

		return (
			<Animated.View 
				style={[ 
					styles.deckStyle,
					animatedStyle,
					{backgroundColor: colorIdx % 2 === 0 ? brown : amber}
				]}
			>
				<TouchableOpacity 
					onPress={this.toNavigate}
				>
					<Text style={styles.header}>
						{title}
					</Text>
					<Text style={styles.cardcount}>
						Number of cards: {deckCount}
					</Text>
				</TouchableOpacity>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	deckStyle: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginTop: 10,
		width: width
	},
	header: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'oswaldRegular'
	},
	cardcount: {
		fontSize: 15,
		textAlign: 'center'
	}
});

export default DeckBar;
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { orange, white } from '../utils/colors';

const SubmitButton = ({ onPress }) => {
	return(
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
			onPress={onPress}
		>
			<Text style={styles.buttonText} >SUBMIT</Text>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	iosBtn: {
		backgroundColor: orange,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidBtn: {
		backgroundColor: orange,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: white,
		fontSize: 17,
		textAlign: 'center'
	}
});

export default SubmitButton;